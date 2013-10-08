/*
 *  Copyright (C) 2013 Smart TV Alliance <http://www.smarttv-alliance.org/>
 */

package org.smarttvalliance.dial.client.core;

/*
 * Interface that declares hooks for the Service Proxy Observers
 * It's basically has only two use-cases right now, logging (via
 * log() hook) and onTaskFinished() which is used by the Detail
 * Activity to make sure actions by the DialServiceProxy don't run
 * in parallel. 
 */
public interface DialServiceProxyObserver {
	/* 
	 * Just log the given message somewhere
	 */
	abstract void log(String msg);
	/*
	 * This should just enable running of another Action again
	 */
	abstract void onTaskFinished();
}
