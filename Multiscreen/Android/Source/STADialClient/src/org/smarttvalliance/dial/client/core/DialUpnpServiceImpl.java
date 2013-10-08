/*
 *  Copyright (C) 2013 Smart TV Alliance <http://www.smarttv-alliance.org/>
 */

package org.smarttvalliance.dial.client.core;

import org.teleal.cling.android.AndroidUpnpServiceConfiguration;
import org.teleal.cling.android.AndroidUpnpServiceImpl;
import org.teleal.cling.model.types.ServiceType;

import android.net.wifi.WifiManager;

/*
 * Cling uses an AndroidUpnpServiceImpl class to do the actual discovery, we extend this class
 * in order to configure timeout intervals and set the DIAL ServiceType for detection only, so
 * that we don't get any other UPnP service during discovery.
 */
public class DialUpnpServiceImpl extends AndroidUpnpServiceImpl {
	@Override
	protected AndroidUpnpServiceConfiguration createConfiguration(WifiManager wifiManager) {
		return new AndroidUpnpServiceConfiguration(wifiManager) {

			/*
			 * Search interval in milliseconds (defaults to 5 seconds)
			 */
			@Override
			public int getRegistryMaintenanceIntervalMillis() {
				return 5000;
			}

			/*
			 * Must be defined to ServiceType("dial-multiscreen-org", "dial") so that
			 * UPnP discovery actually returns DIAL services!
			 */
			@Override
			public ServiceType[] getExclusiveServiceTypes() {
				return new ServiceType[] { DialServiceDiscoveryClient.dialServiceType };
			}
		};
	}

}
