/*
 *  Copyright (C) 2013 Smart TV Alliance <http://www.smarttv-alliance.org/>
 */

package org.smarttvalliance.dial.client.ui;

import org.smarttvalliance.dial.client.R;
import org.smarttvalliance.dial.client.core.DialServiceProxy;
import org.smarttvalliance.dial.client.core.DialServiceProxyObserver;
import org.teleal.cling.model.meta.RemoteDevice;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.ScrollView;
import android.widget.TextView;

/*
 * Activity that shows details for the selected DIAL service and allows 
 * some actions to be operated on the service. Namely the actions allowed
 * are:
 * - START the service
 * - STOP the service (if it's running)
 * - QUERY the service and report any relevant information 
 */
public class DialServiceDetailActivity extends Activity implements DialServiceProxyObserver {
	public static final String ARG_ITEM_ID = "item_id";

	private DialServiceProxy dialServiceProxy;
	private TextView statusMessage;
	private ScrollView statusScroller;
	private Button startButton;
	private Button stopButton;
	private Button queryButton;

	private boolean taskRunning = false;

	/*
	 * onCreate gets the selected item from the Intent Bundle and sets
	 * currentService to the selected DialDeviceInfo object
	 */
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_dialservice_detail);

		// Show the Up button in the action bar.
		getActionBar().setDisplayHomeAsUpEnabled(true);

		// Get the instance from the proxy
		dialServiceProxy = DialServiceProxy.getInstance();
		
		// Add this activity to the proxy's Observers
		dialServiceProxy.addObserver(this);			
					
		if (dialServiceProxy.currentService != null) {
			// Show the DIAL Service name as the activity title
			this.setTitle(dialServiceProxy.currentService.toString());

			// Get RemoteDevice from the service
			dialServiceProxy.currentDevice = (RemoteDevice) dialServiceProxy.currentService.getDevice();

			// Start a bg task to get the Application URL from the device
			dialServiceProxy.getApplicationURL();
		}

		// Holder object for the status TextView and the holding statusScroller
		statusMessage = (TextView) findViewById(R.id.status_message);
		statusScroller = (ScrollView) findViewById(R.id.status_scroller);

		// Set up onClickListeners for the START/STOP/QUERY buttons
		startButton = (Button) findViewById(R.id.start_button);
		stopButton = (Button) findViewById(R.id.stop_button);
		queryButton = (Button) findViewById(R.id.query_button);
		startButton.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				// Do nothing if stop task is already running
				if (taskRunning == true) {
					log("Ignoring application start, another request is pending");
					return;
				}
				taskRunning = true;
				// Clear the Results TextView
				statusMessage.setText("");
				if (getApplicationName().isEmpty()) {
					log("Please provide an application name");
					taskRunning = false;
					return;
				}
				dialServiceProxy.startApplicationTask(getApplicationName(), getApplicationParameters());
			}
		});
		stopButton.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				// Do nothing if stop task is already running
				if (taskRunning == true) {
					log("Ignoring application stop, another request is pending");
					return;
				}
				taskRunning = true;
				// Clear the Results TextView
				statusMessage.setText("");
				if (getApplicationName().isEmpty()) {
					log("Please provide an application name");
					taskRunning = false;
					return;
				}
				log("Stopping application " + getApplicationName());
				dialServiceProxy.stopApplicationTask(getApplicationName());
			}
		});
		queryButton.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				// Do nothing if query task is already running
				if (taskRunning == true) {
					log("Ignoring application query, another request is pending");
					return;
				}
				taskRunning = true;
				// Clear the Results TextView
				statusMessage.setText("");
				if (getApplicationName().isEmpty()) {
					log("Please provide an application name");
					taskRunning = false;
					return;
				}
				dialServiceProxy.queryApplicationTask(getApplicationName());
			}
		});
	}

	/*
	 * Helper method to get current value of the Application Name field
	 */
	public String getApplicationName() {
		TextView applicationNameView = (TextView) findViewById(R.id.application_name);
		return applicationNameView.getText().toString();
	}

	/*
	 * Helper method to get current value of the Parameters field
	 */
	public String getApplicationParameters() {
		TextView parameters = (TextView) findViewById(R.id.parameters_field);

		return parameters.getText().toString();
	}

	/*
	 * Logging method that calls Log.x() but also appends the message to the
	 * Results TextView.
	 */
	@Override
	public void log(final String msg) {
		Log.d(DialServiceProxy.DIALSERVICETAG, msg);
		if (statusMessage != null) {			
			runOnUiThread(new Runnable() {
				@Override
				public void run() {
					statusMessage.append("*** " + msg + "\n");
					statusScroller.scrollTo(0, statusMessage.getBottom());
				}
			});
		}
	}

	/*
	 * Implementation of the hook declared in the Proxy Observer.
	 * Only supposed to be run when the running task has finished and return
	 * (successfully or not, doesn't matter). Just sets taskRunning to false.
	 */
	public void onTaskFinished() {
		taskRunning = false;
	}
}
