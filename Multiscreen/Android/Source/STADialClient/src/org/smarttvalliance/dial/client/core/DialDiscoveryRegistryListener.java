/*
 *  Copyright (C) 2013 Smart TV Alliance <http://www.smarttv-alliance.org/>
 */

package org.smarttvalliance.dial.client.core;

import org.teleal.cling.model.meta.LocalDevice;
import org.teleal.cling.model.meta.RemoteDevice;
import org.teleal.cling.registry.DefaultRegistryListener;
import org.teleal.cling.registry.Registry;

import android.util.Log;

/*
 * We extend a DefaultRegistryListener and override its methods.
 * That way, we can check only for remote devices (we ignore local ones, as they
 * don't have a URL).
 * We also handle automatic addition and removal of devices/services in the activity
 * list, of which we hold a local reference for convenience
 */
public class DialDiscoveryRegistryListener extends DefaultRegistryListener {

	DialServiceDiscoveryClient dialServiceDiscoveryClient = DialServiceDiscoveryClient.getInstance();

	@Override
	public void remoteDeviceDiscoveryStarted(Registry registry, RemoteDevice device) {
		Log.d(DialServiceProxy.DIALSERVICETAG, "remoteDeviceDiscoveryStarted");
		deviceAdded(device);
	}

	@Override
	public void remoteDeviceDiscoveryFailed(Registry registry, final RemoteDevice device, final Exception ex) {
		Log.d(DialServiceProxy.DIALSERVICETAG, "DialDiscoveryRegistryListener.remoteDeviceDiscoveryFailed");
		message("Discovery failed of '" + device.getDisplayString() + "': "
				+ (ex != null ? ex.toString() : "Couldn't retrieve device/service descriptors"), true);
		deviceRemoved(device);
	}

	@Override
	public void remoteDeviceAdded(Registry registry, RemoteDevice device) {
		Log.d(DialServiceProxy.DIALSERVICETAG, "DialDiscoveryRegistryListener.remoteDeviceAdded");
		deviceAdded(device);
	}

	@Override
	public void remoteDeviceRemoved(Registry registry, RemoteDevice device) {
		Log.d(DialServiceProxy.DIALSERVICETAG, "DialDiscoveryRegistryListener.remoteDeviceRemoved");
		deviceRemoved(device);
	}

	@Override
	public void localDeviceAdded(Registry registry, LocalDevice device) {
		Log.d(DialServiceProxy.DIALSERVICETAG, "DialDiscoveryRegistryListener.localDeviceAdded, ignore");
		// We will not deal with local devices as they do not provide a LOCATION
		// URL, which is mandatory
	}

	@Override
	public void localDeviceRemoved(Registry registry, LocalDevice device) {
		Log.d(DialServiceProxy.DIALSERVICETAG, "DialDiscoveryRegistryListener.localDeviceRemoved, ignore");
		// We will not deal with local devices as they do not provide a LOCATION
		// URL, which is mandatory
	}

	/*
	 * This is addition method. It ignores the device if it's not Remote and it
	 * adds it to the listAdapter object (taken from the DialServiceProxy which
	 * acts as a container for often accessed classes. It doesn't actually add
	 * the device anywhere, it just calls the hook deviceAdded() from the
	 * DiscoveryClient -which in turn calls all deviceAdded() hooks in every
	 * Observer (incl. the List Activity).
	 */
	public void deviceAdded(final RemoteDevice device) {
		Thread thread = new Thread() {
			@Override
			public void run() {
				dialServiceDiscoveryClient.onDeviceAdded(new DialDeviceInfo(device));
			}
		};
		thread.start();
	}

	/*
	 * The removal method, similar to the addition method. Again it doesn't
	 * actually do any removal, it just calls the hook deviceRemoved() from the
	 * DiscoveryClient -which in turn calls all deviceRemoved() hooks in every
	 * Observer (incl. the List Activity).
	 */
	public void deviceRemoved(final RemoteDevice device) {
		// Don't do the actual removal from listAdaptor here, instead call the
		// Observer hook
		Thread thread = new Thread() {
			@Override
			public void run() {
				dialServiceDiscoveryClient.onDeviceRemoved(new DialDeviceInfo(device));
			}
		};
		thread.start();
	}

	/*
	 * Logging is done also using a hook to List Activity
	 */
	protected void message(final String msg, final boolean longLength) {
		Thread thread = new Thread() {
			@Override
			public void run() {
				dialServiceDiscoveryClient.message(msg, longLength);
			}
		};
	}
}
