package org.smarttvalliance.dial.client.ui;

import org.smarttvalliance.dial.client.R;
import org.smarttvalliance.dial.client.core.DialDeviceInfo;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

public class DialServiceListActivityAdapter extends ArrayAdapter<DialDeviceInfo> {

	Context context;

	DialServiceListActivityAdapter(Context context, int resourceId) {
		super(context, resourceId);
		this.context = context;
	}

	/*private view holder class*/
	private class ViewHolder {
		TextView nameView;
		TextView locationView;
	}

	public View getView(int position, View convertView, ViewGroup parent) {
		ViewHolder holder = null;
		View v = convertView;
		if (v == null) {
			LayoutInflater vi = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
			v = vi.inflate(R.layout.activity_dialservices_list_item, null);
			holder = new ViewHolder();
			holder.nameView = (TextView) v.findViewById(R.id.name);
			holder.locationView = (TextView) v.findViewById(R.id.location);
			v.setTag(holder);
		} else {
			holder = (ViewHolder) v.getTag();
		}

		DialDeviceInfo device = getItem(position);
		holder.nameView.setText(device.toString());
		holder.locationView.setText(device.locationURL.toString());

		return v;
	}
}