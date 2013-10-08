/*
 *  Copyright (C) 2013 Smart TV Alliance <http://www.smarttv-alliance.org/>
 */

package org.smarttvalliance.dial.client.core;

import java.io.IOException;
import java.io.InputStreamReader;
import java.net.ConnectException;
import java.net.MalformedURLException;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.StatusLine;
import org.apache.http.client.methods.HttpDelete;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.conn.ConnectTimeoutException;
import org.apache.http.entity.StringEntity;
import org.apache.http.protocol.HTTP;
import org.teleal.cling.model.meta.RemoteDevice;
import org.w3c.dom.Document;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import android.net.http.AndroidHttpClient;
import android.os.AsyncTask;
import android.util.Log;

/*
 * A singleton class that serves as an accessor to the current DIAL Service and Device, 
 * it's created as a singleton so that we don't have any danger of
 * accessing multiple objects created by accident.
 * 
 * We also hold a Set of URLs, to make sure we don't try to stop an ApplicationInstanceURL,
 * for a DIAL application we didn't start from this Android app. 
 */
public class DialServiceProxy {
	private static DialServiceProxy singleton = new DialServiceProxy();

	public static final String DIALSERVICETAG = "DIALSERVICE";
	
	/*
	 * Keep current DIAL Service and Device here, for use in the Detail Activity
	 */
	public DialDeviceInfo currentService;
	public RemoteDevice currentDevice;
	private Map<String, URL> applicationInstanceURLs = new HashMap<String, URL>();
	
	private Set<DialServiceProxyObserver> observers = new HashSet<DialServiceProxyObserver>();

	/*
	 * A private Constructor prevents any other class from instantiating.
	 */
	private DialServiceProxy() {
	}

	/*
	 * Static 'instance' method
	 */
	public static DialServiceProxy getInstance() {
		return singleton;
	}

	/*
	 * Add a new Observer class to the ServiceProxy
	 */
	public void addObserver(DialServiceProxyObserver observer) {
		observers.add(observer);
	}
	
	/*
	 * Remove the given Observer
	 */
	public void removeObserver(DialServiceProxyObserver observer) {
		observers.remove(observer);
	}
	
	/*
	 * Log given message to every attached observer
	 */
	public void log(String msg) {
		for (DialServiceProxyObserver o: observers){
			o.log(msg);
		}
	}
	
	/*
	 * Notify all observers that currently running task (start/stop/query) is finished
	 */
	public void onTaskFinished() {
		for (DialServiceProxyObserver o: observers){
			o.onTaskFinished();
		}
	}
	
	/*
	 * typically to be called from an Activity, this just starts an AsyncTask
	 * to get the ApplicationURL from the DIAL service 
	 */
	public void getApplicationURL() {
		// Get the Application URL, use HTTP GET on
		// rdevice.getIdentity().getDescriptorURL()
		GetApplicationURLTask client = new GetApplicationURLTask();
		client.execute(currentDevice.getIdentity().getDescriptorURL());
	}
	
	/*
	 * again to be called from an Activity, starts an AsyncTask
	 * to send the START command to the DIAL server 
	 */
	public void startApplicationTask(String appName, String args) {		
		// Create an HTTP Client to pass the START action with given arguments
		StartApplicationInstanceTask client = new StartApplicationInstanceTask();
		client.execute(appName, args);
	}
	
	/*
	 * similar to startApplicationTask(), starts an AsyncTask
	 * to send the STOP command to the DIAL server, to stop an already
	 * running application 
	 */
	public void stopApplicationTask(String appName) {		
		// Create an HTTP Client to pass the STOP action
		StopApplicationInstanceTask client = new StopApplicationInstanceTask();
		client.execute(appName);
	}
	
	/*
	 * similar to startApplicationTask() and stopApplicationTask() above, 
	 * just starts an AsyncTask to send the QUERY command to the DIAL server,
	 * to query about an application 
	 */
	public void queryApplicationTask(String appName) {
		// Create an HTTP Client to pass the QUERY action 
		QueryApplicationTask client = new QueryApplicationTask();
		client.execute(appName);
	}
	
	/*
	 * Create an AsyncTask (which is in essence a Thread) as we can't do Network
	 * operations in the UI thread in Android anymore.
	 * on start, doInBackground() is called, which calls getApplicationURL()
	 * This one just gets the Application-URL header from the first HTTP GET on
	 * the DIAL Service Descriptor URL, should be called before all the others
	 */
	public class GetApplicationURLTask extends AsyncTask<URL, Void, Void> {

		public void getApplicationURL(URL url) {
			AndroidHttpClient client = AndroidHttpClient.newInstance(null);
			try {
				// Create and execute the HTTP GET request to the given url
				HttpGet request = new HttpGet(url.toURI());
				HttpResponse response = client.execute(request);

				// Check if server response is valid
				StatusLine status = response.getStatusLine();
				client.close();
				if (status.getStatusCode() != 200) {
					log("Invalid response " + status.getReasonPhrase());
					return;
				}

				// Headers *SHOULD* include Application-URL
				// set applicationBaseURL accordingly
				Header h = response.getFirstHeader("Application-URL");
				if (h != null) {
					currentService.applicationBaseURL = new URL(h.getValue());
					Log.d(DialServiceProxy.DIALSERVICETAG, "ApplicationURL: " + currentService.applicationBaseURL.toString());
				} else {
					Log.d(DialServiceProxy.DIALSERVICETAG, "No Application-URL Header found in " + url);
				}
			} catch (URISyntaxException e) {
				log("Not a valid URI!!" + url);
				e.printStackTrace();
			} catch (MalformedURLException e) {
				log("Malformed URL!!");
				e.printStackTrace();
			} catch (ConnectException e) {
				log("Connection refused");
			} catch (ConnectTimeoutException e) {
				log("The request timed out");
			} catch (IOException e) {
				e.printStackTrace();
			}
			if (client != null)
				client.close();
		}

		/*
		 * call getApplicationURL(), with the device DescriptorURL passed as an argument 
		 */
		@Override
		protected Void doInBackground(URL... params) {
			getApplicationURL(params[0]);
			return null;
		}
	}
	
	/*
	 * another AsyncTask that on start doInBackground() calls startApplicationInstanceURL()
	 * This checks if the Application X exists given an applicationInstanceURL using an
	 * HTTP GET and then sends a HTTP POST message to start the application on the server.
	 * Depending on the response code, log the respective message
	 */
	public class StartApplicationInstanceTask extends AsyncTask<String, Void, Void> {

		public void startApplicationInstanceURL(String applicationName, String args) {
			AndroidHttpClient client = AndroidHttpClient.newInstance(null);
			URL applicationURL = null;
			try {
				log("Starting application " + applicationName + " with "
						+ (args.isEmpty() == true ? "no arguments" : ("arguments " + args)));

				// Send the arguments directly in the POST body, as UTF-8 text/plain
				applicationURL = currentService.getApplicationURL(applicationName);
				HttpPost command = new HttpPost(applicationURL.toURI());
				StringEntity se = new StringEntity(args);
				command.setEntity(se);
				se.setContentEncoding(HTTP.UTF_8);
				se.setContentType("text/plain");

				HttpResponse response = client.execute(command);
				StatusLine status = response.getStatusLine();
				client.close();
				log("Request got response " + status.getStatusCode());
				switch (status.getStatusCode()) {
				case 201:
					Header h = response.getFirstHeader("LOCATION");

					if (h != null) {
						URL applicationInstanceURL = new URL(h.getValue());
						// Insert (applicationName, applicationInstanceURL) key,value pair if not in the map
						// already, update otherwise
						if (applicationInstanceURLs.containsKey(applicationName))
							applicationInstanceURLs.remove(applicationName);
						applicationInstanceURLs.put(applicationName, applicationInstanceURL);
						log("Application started successfully, instance: " + applicationInstanceURL);
					} else {
						log("Missing LOCATION header on response, app " + applicationName + " cannot be started");
					}
					break;
				case 400:
					log("Bad request");
					break;
				case 404:
					log("Application not found");
					break;
				case 411:
					log("Request message was missing content length");
					break;
				case 413:
					log("Request message was too large for server to handle");
					break;
				case 503:
					log("Application failed to start");
					break;
				default:
					log("Unexpected response code: " + status.getStatusCode() + ": " + status.getReasonPhrase());
					break;
				}
			} catch (URISyntaxException e) {
				Log.i(DialServiceProxy.DIALSERVICETAG, "Not a valid URI applicationURL: " + applicationURL);
				e.printStackTrace();
			} catch (MalformedURLException e) {
				Log.i(DialServiceProxy.DIALSERVICETAG, "Not a valid URL!!");
				e.printStackTrace();
			} catch (ConnectException e) {
				log("Connection refused");
			} catch (ConnectTimeoutException e) {
				log("The request timed out");
			} catch (IOException e) {
				e.printStackTrace();
			}
			if (client != null)
				client.close();
		}

		/*
		 * call startApplicationInstanceURL(), notice we call onTaskFinished() when done 
		 */
		@Override
		protected Void doInBackground(String... params) {
			startApplicationInstanceURL(params[0], params[1]);
			onTaskFinished();
			return null;
		}
	}
	
	/*
	 * AsyncTask that sends a HTTP DELETE command to the Application Instance URL,
	 * which is set only if the Application has been started successfully on the
	 * server, otherwise the command is ignored.
	 * 
	 */
	public class StopApplicationInstanceTask extends AsyncTask<String, Void, Void> {

		public void stopApplicationInstanceURL(String applicationName) {
			URL applicationInstanceURL = null;
			AndroidHttpClient client = AndroidHttpClient.newInstance(null);
			try {
				applicationInstanceURL = applicationInstanceURLs.get(applicationName);
				if (applicationInstanceURL == null) {
					log("Unable to stop application " + applicationName
							+ ". You need to start the application from this client first.");
					return;
				} else {
					log("Found application instance " + applicationInstanceURL);
				}

				HttpDelete command = new HttpDelete(applicationInstanceURL.toURI());
				HttpResponse response = client.execute(command);

				StatusLine status = response.getStatusLine();
				client.close();
				log("Request got response " + status.getStatusCode());
				switch (status.getStatusCode()) {
				case 200:
					log("Application stopped successfully");
					applicationInstanceURLs.remove(applicationName);
					break;
				case 400:
					log("Bad request");
					break;
				case 404:
					log("Application instance not found");
					break;
				case 501:
					log("Server doesn't support stop requests");
					break;
				default:
					log("Unexpected response code: " + status.getStatusCode() + ": " + status.getReasonPhrase());
					break;
				}
			} catch (URISyntaxException e) {
				Log.i(DialServiceProxy.DIALSERVICETAG, "Not a valid URI, applicationInstanceURL: " + applicationInstanceURL);
				e.printStackTrace();
			} catch (MalformedURLException e) {
				Log.i(DialServiceProxy.DIALSERVICETAG, "Not a valid URL!!");
				e.printStackTrace();
			} catch (ConnectException e) {
				log("Connection refused");
			} catch (ConnectTimeoutException e) {
				log("The request timed out");
			} catch (IOException e) {
				e.printStackTrace();
			}
			if (client != null)
				client.close();
		}

		/*
		 * call stopApplicationInstanceURL(), again we call onTaskFinished() when done 
		 */
		@Override
		protected Void doInBackground(String... params) {
			stopApplicationInstanceURL(params[0]);
			onTaskFinished();
			return null;
		}
	}
	
	/*
	 * When doing an HTTP GET on the Application URL, the Body of the response is
	 * an XML object that holds information about the application.
	 * This AsyncTask does that and parses the XML message, but actual parsing is done
	 * in parseQueryResponse().
	 */
	public class QueryApplicationTask extends AsyncTask<String, Void, Void> {

		public void queryApplicationURL(String applicationName) {
			AndroidHttpClient client = AndroidHttpClient.newInstance(null);
			URL applicationURL = null;
			try {
				log("Querying application " + applicationName);

				applicationURL = currentService.getApplicationURL(applicationName);
				HttpGet command = new HttpGet(applicationURL.toURI());
				HttpResponse response = client.execute(command);
				
				StatusLine status = response.getStatusLine();
				log("Request got response " + status.getStatusCode());
				switch (status.getStatusCode()) {
				case 200:
					log("Application query finished, parsing response XML");
					parseQueryResponse(response.getEntity());
					break;
				case 404:
					log("Application instance not found");
					break;
				default:
					log("Unexpected response code: " + status.getStatusCode() + ": " + status.getReasonPhrase());
					break;
				}
				client.close();
			} catch (URISyntaxException e) {
				Log.i(DialServiceProxy.DIALSERVICETAG, "Not a valid URI applicationURL: " + applicationURL);
				e.printStackTrace();
			} catch (MalformedURLException e) {
				Log.i(DialServiceProxy.DIALSERVICETAG, "Not a valid URL!!");
				e.printStackTrace();
			} catch (ConnectException e) {
				log("Connection refused");
			} catch (ConnectTimeoutException e) {
				log("The request timed out");
			} catch (IOException e) {
				e.printStackTrace();
			}
			if (client != null)
				client.close();
		}

		/*
		 * DOM XML parsing on the given HTTP body
		 */
		protected void parseQueryResponse(HttpEntity entity) {
			String name = null;
			boolean allowStop = false;
			String state = null;
			String rel = null;
			String href = null;
			
			try {
				InputStreamReader input = new InputStreamReader(entity.getContent());

				DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
				DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
				Document doc = dBuilder.parse(new InputSource(input));
				
				doc.getDocumentElement().normalize();
				
				NodeList nodes = doc.getElementsByTagName("service");
				
				if (nodes == null) {
					log("There is no service node in the response, aborting parsing");
					return;
				}
				if (nodes.getLength() != 1) {
					log("Multiple service nodes found, parsing only the first");
				} else {
					Node serviceNode = nodes.item(0);
					
					if (serviceNode.hasChildNodes() == true) {
						nodes = serviceNode.getChildNodes();
						
						for (int i = 0; i < nodes.getLength(); i++) {
							Node node = nodes.item(i);

							if (node.getNodeType() == Node.ELEMENT_NODE) {
								if (node.getNodeName().equals("name"))
									name = new String(node.getTextContent());
								if (node.getNodeName().equals("options")) {
									NamedNodeMap attributes = node.getAttributes();
									if (attributes != null) {
										for (int j = 0; j < attributes.getLength(); j++) {
											Node attr = attributes.item(j);
											
											if (attr.getNodeName().equals("allowStop")) {
												allowStop = Boolean.parseBoolean(attr.getNodeValue());
											}
										}
									}
								}
								if (node.getNodeName().equals("state"))
									state = new String(node.getTextContent());
								if (node.getNodeName().equals("link")) {
									NamedNodeMap attributes = node.getAttributes();
									if (attributes != null) {
										for (int j = 0; j < attributes.getLength(); j++) {
											Node attr = attributes.item(j);
											
											if (attr.getNodeName().equals("rel")) {
												rel = new String(attr.getTextContent());
											}
											if (attr.getNodeName().equals("href")) {
												href = new String(attr.getTextContent());
											}
										}
									}
								}
							}
						}
					}
				}
			} catch (IllegalStateException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			} catch (ParserConfigurationException e) {
				e.printStackTrace();
			} catch (SAXException e) {
				e.printStackTrace();
			}
			
			// Complain if any elements are missing
			if (name != null) {
				log("Application name: " + name);
			} else {
				log("Application name not set!");
			}
			if (allowStop == true) {
				log("Application supports stop requests");
			} else {
				log("Application doesn't support stop requests");
			}
			if (state != null) {
				if (state.equals("running"))
					log("Application is currently running");
				if (state.equals("stopped"))
					log("Application is not running");
				if (state.equals("installable"))
					log("Application is not installed, but is available from " + state.substring("installable".length()));
			} else {
				log("State is not set");
			}
			if (rel != null) {
				log("Application 'rel' link: " + rel);
			} else {
				log("Application 'rel' not set");
			}
			if (href != null) {
				log("Application 'href' link: " + href);
			} else {
				log("Application 'href' not set");
			}
		}

		/*
		 * call queryApplicationURL(), again we call onTaskFinished() when done 
		 */
		@Override
		protected Void doInBackground(String... params) {
			queryApplicationURL(params[0]);
			onTaskFinished();
			return null;
		}
	}
}
