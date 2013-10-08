/*
 *  Copyright (C) 2013 Smart TV Alliance <http://www.smarttv-alliance.org/>
 */

package org.smarttvalliance.dial.client.core;

import java.util.HashSet;
import java.util.Set;

import org.teleal.cling.android.AndroidUpnpService;
import org.teleal.cling.model.message.header.ServiceTypeHeader;
import org.teleal.cling.model.meta.RemoteDevice;
import org.teleal.cling.model.meta.Service;
import org.teleal.cling.model.types.ServiceType;

import android.util.Log;

public class DialServiceDiscoveryClient {
	private static DialServiceDiscoveryClient singleton = new DialServiceDiscoveryClient();
	
	public AndroidUpnpService upnpService;
	public DialUpnpServiceConnection serviceConnection;
	public DialDiscoveryRegistryListener registryListener;
	
	private Set<DialServiceDiscoveryObserver> observers = new HashSet<DialServiceDiscoveryObserver>();

	public static final ServiceType dialServiceType = new ServiceType("dial-multiscreen-org", "dial");
	public static final ServiceTypeHeader dialSTHeader = new ServiceTypeHeader(dialServiceType);
	
	/*
	 * A private Constructor prevents any other class from instantiating.
	 */
	private DialServiceDiscoveryClient() {
	}

	/*
	 * Static 'instance' method
	 */
	public static DialServiceDiscoveryClient getInstance() {
		return singleton;
	}
	
	/*
	 * Initialize the Registry Listeners and Service Connection objects
	 * This is the core of the UPnP discovery operation, must be run!
	 */
	public void initiateDiscovery() {
		registryListener = new DialDiscoveryRegistryListener();
		Log.d(DialServiceProxy.DIALSERVICETAG, "DialServiceProxy.initiateDiscovery: created registry listener");
		
		serviceConnection = new DialUpnpServiceConnection(this);
	}
	
	/*
	 * If the upnpService is actually initialized, initiate a new discovery
	 */
	public void newSearch() {
		if (upnpService != null) {
			upnpService.getRegistry().removeAllRemoteDevices();
			upnpService.getControlPoint().search(dialSTHeader);
		}
	}
	
	/*
	 * Add a new Observer class to the DiscoveryClient
	 */
	public void addObserver(DialServiceDiscoveryObserver observer) {
		observers.add(observer);
	}
	
	/*
	 * Remove the given Observer 
	 */
	public void removeObserver(DialServiceDiscoveryObserver observer) {
		observers.remove(observer);
	}
	
	/*
	 * Call deviceAdded() method from all attached Observers
	 */
	public void onDeviceAdded(DialDeviceInfo device) {
		StringBuffer services = new StringBuffer();
		RemoteDevice d = device.getDevice();
		for (Service s : d.getServices()) {
			ServiceType st = s.getServiceType();
			services.append(" |Id: " + s.getServiceId().getNamespace() + ", " + s.getServiceId().getId() + "| " + st.getNamespace() + ", " + st.getType() + ", "
					+ st.getVersion() + " | ");
		}
		Log.d(DialServiceProxy.DIALSERVICETAG, "DialServiceDiscoveryClient. remote services discovered: "
					+ d.getDisplayString() + ", " + d.getDetails().getFriendlyName() + " : " + services
					+ ", URL: " + d.getIdentity().getDescriptorURL());

		// Don't do the actual addition to listAdaptor here, instead call the Observer hook
		for(DialServiceDiscoveryObserver o: observers) {
			o.deviceAdded(device);
		}
	}
	
	/*
	 * Call deviceRemoved() method from all attached Observers
	 */
	public void onDeviceRemoved(DialDeviceInfo device) {
		Log.d(DialServiceProxy.DIALSERVICETAG, "DialServiceDiscoveryClient.deviceRemoved");
		for(DialServiceDiscoveryObserver o: observers) {
			o.deviceRemoved(device);
		}
	}
	
	/*
	 * Call message() method from all attached Observers
	 * That should be the equivalent of logging the string msg
	 * to every given Observer that acts as a logger
	 */
	public void message(String msg, boolean longLength) {
		for(DialServiceDiscoveryObserver o: observers) {
			o.message(msg, longLength);
		}
	}
}
