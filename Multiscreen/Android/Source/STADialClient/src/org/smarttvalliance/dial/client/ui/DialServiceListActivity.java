/*
 *  Copyright (C) 2013 Smart TV Alliance <http://www.smarttv-alliance.org/>
 */

package org.smarttvalliance.dial.client.ui;

import org.smarttvalliance.dial.client.R;
import org.smarttvalliance.dial.client.core.DialDeviceInfo;
import org.smarttvalliance.dial.client.core.DialServiceDiscoveryClient;
import org.smarttvalliance.dial.client.core.DialServiceDiscoveryObserver;
import org.smarttvalliance.dial.client.core.DialServiceProxy;
import org.smarttvalliance.dial.client.core.DialUpnpServiceImpl;

import android.app.ListActivity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;
import android.widget.Toast;

/*
 * Main Activity for the application
 * Initiates the UPnP discovery service and lists all DIAL Services detected
 * On item selection, user is shown the DialServiceDetailActivity. 
 */
public class DialServiceListActivity extends ListActivity implements DialServiceDiscoveryObserver {

	public ArrayAdapter<DialDeviceInfo> listAdapter;

	// Create the DialServiceProxy singleton and bind the DialUpnpServiceImpl
	// class and the serviceConnection to this activity.
	DialServiceProxy dialServiceProxy;
	DialServiceDiscoveryClient dialServiceDiscoveryClient;

	/*
	 * onCreate gets called when the Android application is started, or when 
	 * the View needs to be created again. This typically happens when the app
	 * is put to foreground when it was again in the list Activity before put
	 * to the background, or getting back from the detail view.
	 * 
	 *  
	 */
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_dialservices_list);
		
		// Set title to "Select DIAL server"
		setTitle(R.string.listview_title);

		Log.d(DialServiceProxy.DIALSERVICETAG, "DialServiceListActivity.onCreate()");

		// Get instances for discovery client and proxy
		dialServiceDiscoveryClient = DialServiceDiscoveryClient.getInstance();
		dialServiceProxy = DialServiceProxy.getInstance();

		// Add this activity to the client's Observers
		dialServiceDiscoveryClient.addObserver(this);

		// Setup the actual UPnP discovery
		dialServiceDiscoveryClient.initiateDiscovery();

		// Bind serviceConnection to the Activity
		getApplicationContext().bindService(new Intent(this, DialUpnpServiceImpl.class),
				dialServiceDiscoveryClient.serviceConnection, Context.BIND_AUTO_CREATE);
		Log.d(DialServiceProxy.DIALSERVICETAG,
				"DialServiceListActivity.onCreate(): bound serviceConnection to application");

		// Create list adaptor
		listAdapter = new DialServiceListActivityAdapter(this, R.layout.activity_dialservices_list_item);
		Log.d(DialServiceProxy.DIALSERVICETAG, "DialServiceListActivity.onCreate(): created listadapter");
		
		// Bind the ListAdapter to this Activity
		setListAdapter(listAdapter);
		Log.d(DialServiceProxy.DIALSERVICETAG, "DialServiceListActivity.onCreate(): setListAdapter");

		// Start the search
		dialServiceDiscoveryClient.newSearch();

		// Configure an OnItemClickListener for the ListView which will start
		// the DialServiceDetailActivity for the selected item.
		final ListView listview = (ListView) findViewById(android.R.id.list);
		if (listview != null) {
			listview.setOnItemClickListener(new AdapterView.OnItemClickListener() {
				@Override
				public void onItemClick(AdapterView<?> parent, final View view, int position, long id) {
					Log.d(DialServiceProxy.DIALSERVICETAG, "OnItemClickListener.onItemClick(): position = " + position
							+ ", id = " + id);
					Intent detailIntent = new Intent(parent.getContext(), DialServiceDetailActivity.class);
					dialServiceProxy.currentService = listAdapter.getItem(position);
					startActivity(detailIntent);
				}
			});
		}
		Log.d(DialServiceProxy.DIALSERVICETAG, "DialServiceListActivity.onCreate(): setOnItemClickListener()");

		// Set a button listener for the Refresh button that will initiate a new
		// search
		Button refreshButton = (Button) findViewById(R.id.refresh_button);
		if (refreshButton != null) {
			refreshButton.setOnClickListener(new OnClickListener() {
				@Override
				public void onClick(View v) {
					listAdapter.clear();
					dialServiceDiscoveryClient.newSearch();
				}
			});
		}
		Log.d(DialServiceProxy.DIALSERVICETAG, "DialServiceListActivity.onCreate(): setOnClickListener()");
	}

	@Override
	protected void onDestroy() {
		super.onDestroy();
		if (dialServiceDiscoveryClient.upnpService != null) {
			dialServiceDiscoveryClient.upnpService.getRegistry().removeListener(
					dialServiceDiscoveryClient.registryListener);
		}
		getApplicationContext().unbindService(dialServiceDiscoveryClient.serviceConnection);
	}

	/*
	 * This is the actual hook that will add the given device to the listadaptor.
	 * It has to be called inside the UI thread explicitly as the method is not actually
	 * called from the Activity but from the Service thread and this generally fails.
	 */
	@Override
	public void deviceAdded(final DialDeviceInfo device) {
		Log.d(DialServiceProxy.DIALSERVICETAG,
				"DialServiceListActivity.deviceAdded: listAdapter size = " + listAdapter.getCount());

		Log.d(DialServiceProxy.DIALSERVICETAG, "DialServiceListActivity.deviceAdded: hashCode: " + device.hashCode());
		runOnUiThread(new Runnable() {
			@Override
			public void run() {
				final int position = listAdapter.getPosition(device);
				if (position >= 0) {
					// Device already in the list, re-set new value at same
					// position
					listAdapter.remove(device);
					listAdapter.insert(device, position);
				} else {
					listAdapter.add(device);
				}

				listAdapter.notifyDataSetChanged();
			}
		});
		Log.d(DialServiceProxy.DIALSERVICETAG,
				"DialServiceListActivity.deviceAdded: listAdapter size = " + listAdapter.getCount());
	}

	/*
	 * This is the actual hook that will remove the passed device from the listadaptor.
	 * It also has to be called inside the UI thread explicitly.
	 */
	@Override
	public void deviceRemoved(final DialDeviceInfo device) {
		runOnUiThread(new Runnable() {
			@Override
			public void run() {
				listAdapter.remove(device);
			}
		});
	}

	/*
	 * Message to produce an error message, typically only called on error
	 * from inside the Registry Listener 
	 */
	@Override
	public void message(final String msg, final boolean longLength) {
		Toast.makeText(this, msg, longLength ? Toast.LENGTH_LONG : Toast.LENGTH_SHORT).show();
	}
}
