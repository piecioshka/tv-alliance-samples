/*
 *  Copyright (C) 2013 Smart TV Alliance <http://www.smarttv-alliance.org/>
 */

package org.smarttvalliance.dial.client.core;

import java.net.MalformedURLException;
import java.net.URL;

import org.teleal.cling.model.meta.RemoteDevice;

/*
 * The class that describes the UPnP device. This is what is returned from UPnP discovery
 * and holds the UPnP Service information.
 */
public class DialDeviceInfo {
	private RemoteDevice device;
	
	public URL locationURL;
	/*
	 * Each service holds a Base URL to which we append applicationName to get the ApplicationURL.
	 */
	public URL applicationBaseURL;

	public DialDeviceInfo(RemoteDevice device) {
		this.device = device;
		this.locationURL = this.device.getIdentity().getDescriptorURL();
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		DialDeviceInfo that = (DialDeviceInfo) o;
		return device.equals(that.device) && locationURL.equals(that.locationURL);
	}

	public RemoteDevice getDevice() {
		return device;
	}

	@Override
	public int hashCode() {
		return 1013 * (device.hashCode()) ^ 1009 * (locationURL.hashCode());
	}

	@Override
	public String toString() {
		if (device.getDetails() != null && device.getDetails().getFriendlyName() != null)
			return device.getDetails().getFriendlyName();
		else
			return device.getDisplayString();
	}
	
	/*
	 * Get the ApplicationURL by appending the given applicationName to BaseURL 
	 */
	public URL getApplicationURL(String applicationName) throws MalformedURLException {
		if (applicationBaseURL.toString().endsWith("/"))
			return new URL(applicationBaseURL + applicationName);
		else
			return new URL(applicationBaseURL + "/" + applicationName);
	}
}
