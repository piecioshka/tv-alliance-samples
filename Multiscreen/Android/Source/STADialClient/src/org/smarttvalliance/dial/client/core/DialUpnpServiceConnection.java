/*
 *  Copyright (C) 2013 SOmart TV Alliance <http://www.smarttv-alliance.org/>
 */

package org.smarttvalliance.dial.client.core;

import org.teleal.cling.android.AndroidUpnpService;
import org.teleal.cling.binding.annotations.UpnpService;

import android.content.ComponentName;
import android.content.ServiceConnection;
import android.os.IBinder;
import android.util.Log;

/*
 * Actual implementation of the UPnP discovery as an Android ServiceConnection
 * object. This assures that discovery will run in the background and at specified
 * intervals the DIAL service list in the main activity will update itself with
 * the modifications (new or removed services). 
 */
public class DialUpnpServiceConnection implements ServiceConnection {
	DialServiceDiscoveryClient dialServiceDiscoveryClient;
	
	/*
	 * Keep the DialServiceDiscoveryClient instance as we need to set upnpService
	 * and add the Registry Listener from here.
	 */
	public DialUpnpServiceConnection(DialServiceDiscoveryClient client) {
		super();
		dialServiceDiscoveryClient = client;
	}
	
	/*
	 * This is run when the Android Service is 
	 */
	@Override
	public void onServiceConnected(ComponentName name, IBinder service) {
		
		dialServiceDiscoveryClient.upnpService = (AndroidUpnpService) service;
		Log.d(DialServiceProxy.DIALSERVICETAG, "DialUpnpServiceConnection.onServiceConnected: upnpService started");

		// Connect the RegistryListener object to the UPnP Service
		dialServiceDiscoveryClient.upnpService.getRegistry().addListener(dialServiceDiscoveryClient.registryListener);
		Log.d(DialServiceProxy.DIALSERVICETAG, "DialUpnpServiceConnection.onServiceConnected: added Listener");

		// Search asynchronously for all devices
		dialServiceDiscoveryClient.upnpService.getControlPoint().search(DialServiceDiscoveryClient.dialSTHeader);
		Log.d(DialServiceProxy.DIALSERVICETAG,
				"DialUpnpServiceConnection.onServiceConnected: initiate asynchronous search");
	}

	@Override
	public void onServiceDisconnected(ComponentName name) {
		dialServiceDiscoveryClient.upnpService = null;
	}
}
