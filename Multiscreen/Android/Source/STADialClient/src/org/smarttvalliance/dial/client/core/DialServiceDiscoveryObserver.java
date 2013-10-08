/*
 *  Copyright (C) 2013 Smart TV Alliance <http://www.smarttv-alliance.org/>
 */

package org.smarttvalliance.dial.client.core;

/*
 * Interface that declares hooks for the Discovery Client Observers
 * The class that implements this interface will typically want to
 * add/remove a given DialDeviceInfo object (a DIAL service basically)
 * to a list, be it a ListView or a cmd line list. 
 * 
 * These methods have to be implemented by any class that wants to
 * act as an Observer for the client (in this particular case
 * the DialServiceListActivity). 
 */

public interface DialServiceDiscoveryObserver {
	/*
	 * Method to actually add the device to some list 
	 */
	abstract void deviceAdded(DialDeviceInfo device);
	
	/*
	 * Actually perform the removal from the list
	 */
	abstract void deviceRemoved(DialDeviceInfo device);
	
	/*
	 * Log a given message
	 */
	abstract void message(String msg, boolean longLength);
}
