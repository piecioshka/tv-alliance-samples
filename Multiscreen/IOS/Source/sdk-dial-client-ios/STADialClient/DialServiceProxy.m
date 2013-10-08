//
//  DialServiceProxy.m
//  DialApp
//
//  Copyright (c) 2013 SmartTV Alliance <http://www.smarttv-alliance.org/>
//

#import "DialServiceProxy.h"
#include <libxml/parser.h>
#include <libxml/tree.h>

#define XML_NODE_NAME_IS(node,str) (strcmp((char *)node->name, str) == 0)

const char*
dial_request_type_get_name(DialRequestType dial)
{
    switch (dial) {
        case DIAL_REQUEST_START:
            return "start";
        case DIAL_REQUEST_STOP:
            return "stop";
        case DIAL_REQUEST_QUERY:
            return "query";
        default:
            return "";
    }
}

bool str_starts_with(const char *str, const char *prefix)
{
    size_t len_str = strlen(str);
    size_t len_prefix = strlen(prefix);
    
    return len_str < len_prefix ? false : strncmp(prefix, str, len_prefix) == 0;
}

/*
 * Responsible for sending DIAL requests to server and parsing the responses.
 *
 * The requests are sent by calling startApplication:withArguments, stopApplication and queryApplication
 * To get notified of the results of the calls, register an observer using addDialServiceProxyObserver.
 *
 * When a request is made, no further requests should be made until the first one is finished.
 *
 */
@implementation DialServiceProxy {
    NSURLConnection *currentConnection;
    DialRequestType currentRequest;
    NSString *currentRequestApplication;
    
    NSMutableArray *observers;
    NSMutableDictionary *runningApps;
    
    NSMutableData *receivedData;
    
    NSLock *requestLock;
}

@synthesize name;
@synthesize location;
@synthesize applicationUrl;

-(id) initWithDevice:(SSDPDBDevice_ObjC*) device
{
    if (self = [super init]) {
        self.name = device.usn;
        self.location = device.location;
        self->currentConnection = nil;
        self->currentRequest = DIAL_REQUEST_NONE;
        self->observers = [[NSMutableArray alloc] init];
        self->requestLock = [[NSLock alloc] init];
        self->runningApps = [[NSMutableDictionary alloc] init];
        self->receivedData = [[NSMutableData alloc] init];
    }
    return self;
}

-(void) addDialServiceProxyObserver:(id<DialServiceProxyObserver>)observer
{
    [observers addObject:observer];
}

-(void) removeDialServiceProxyObserver:(id<DialServiceProxyObserver>)observer
{
    [observers removeObject:observer];
}

-(void) setCurrentRequestApplication:(NSString *)appName withConnection:(NSURLConnection *)connection withType:(DialRequestType)reqType
{
    self->currentRequestApplication = appName;
    self->currentConnection = connection;
    self->currentRequest = reqType;
}

-(NSURL*) getApplicationURL:(NSString*) applicationName
{
    return [NSURL URLWithString:[NSString stringWithFormat:@"%@%@",
                                 applicationUrl, [applicationName stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding]]];
}

-(void) sendMessageToObservers:(NSString*)msg
{
    NSLog(@"Request message: %@", msg);
    NSString *formattedMsg = [NSString stringWithFormat:@"*** %@", msg];
    for (id<DialServiceProxyObserver> obs in observers) {
        [obs requestMessage:formattedMsg];
    }
}

-(void) sendFinishedMessageToObservers
{
    NSLog(@"Request finished");
    for (id<DialServiceProxyObserver> obs in observers) {
        [obs requestFinished];
    }
}

-(void) sendStartedMessageToObservers
{
    NSLog(@"Request started %d", self->currentRequest);
    for (id<DialServiceProxyObserver> obs in observers) {
        [obs requestStarted:self->currentRequest];
    }
}

-(BOOL) checkRequestStart:(DialRequestType)requestType
{
    if (self->currentRequest != DIAL_REQUEST_NONE) {
        NSString *reqname = [NSString stringWithUTF8String: dial_request_type_get_name(requestType)];
        [self sendMessageToObservers:[NSString stringWithFormat:@"Ignoring application %@, another request is pending", reqname]];
        return NO;
    }
    // erase all previous data before starting a new request
    self->receivedData = [[NSMutableData alloc] init];
    return YES;
}

-(void) startApplication:(NSString*)applicationName withArguments:(NSString*)arguments
{
    [requestLock lock];
    
    // Check if there is a pending request still running
    if ([self checkRequestStart:DIAL_REQUEST_START] == NO) {
        [requestLock unlock];
        return;
    }
    if (applicationName == nil || [applicationName length] == 0) {
        [self sendMessageToObservers:@"Please provide an application name"];
        [requestLock unlock];
        return;
    }
    
    NSURL *url = [self getApplicationURL:applicationName];
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url];
    [request setHTTPMethod:@"POST"];
    
    // Set arguments, if we have any
    if (arguments && [arguments length] > 0) {
        NSData *postdata = [arguments dataUsingEncoding:NSUTF8StringEncoding];
        [request setHTTPBody:postdata];
        [request setValue:[NSString stringWithFormat:@"%d", [postdata length]]
                    forHTTPHeaderField:@"Content-Length"];
        [request setValue:@"text/plain;charset=UTF-8;" forHTTPHeaderField: @"Content-Type"];
        
    } else {
        [request setValue:@"0" forHTTPHeaderField:@"Content-Length"];
    }
    
    // Use an async request to avoid blocking the main thread
    NSURLConnection *connection = [[NSURLConnection alloc] initWithRequest:request delegate:self startImmediately:NO];
    [self setCurrentRequestApplication:applicationName withConnection:connection withType:DIAL_REQUEST_START];
    [self sendStartedMessageToObservers];
    if (arguments && [arguments length] > 0) {
        [self sendMessageToObservers:[NSString stringWithFormat:@"Starting application %@ with arguments %@", applicationName, arguments]];
    } else {
        [self sendMessageToObservers:[NSString stringWithFormat:@"Starting application %@ with no arguments", applicationName]];
    }
    [connection start];
    [requestLock unlock];
}

-(void) stopApplication:(NSString*)applicationName
{
    [requestLock lock];
    // Check for pending requests
    if ([self checkRequestStart:DIAL_REQUEST_STOP] == NO) {
        [requestLock unlock];
        return;
    }
    if (applicationName == nil || [applicationName length] == 0) {
        [self sendMessageToObservers:@"Please provide an application name"];
        [requestLock unlock];
        return;
    }

    [self sendStartedMessageToObservers];
    [self sendMessageToObservers:[NSString stringWithFormat:@"Stopping application %@", applicationName]];
    NSString *appInstance = [runningApps objectForKey:applicationName];
    if (appInstance == nil) {
        [self sendMessageToObservers:[NSString stringWithFormat:@"Unable to stop application %@. You need to start the  application from this client first.", applicationName]];
        [self sendFinishedMessageToObservers];
        [requestLock unlock];
        return;
    } else {
        [self sendMessageToObservers:[NSString stringWithFormat:@"Found application instance %@", appInstance]];
    }
    
    NSURL *url = [NSURL URLWithString:appInstance];
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url];
    [request setHTTPMethod:@"DELETE"];
    
    // Use an async request to avoid blocking the main thread
    NSURLConnection *connection = [[NSURLConnection alloc] initWithRequest:request delegate:self startImmediately:NO];
    [self setCurrentRequestApplication:applicationName withConnection:connection withType:DIAL_REQUEST_STOP];
    [connection start];
    
    [requestLock unlock];
}

-(void) queryApplication:(NSString*)applicationName
{
    [requestLock lock];
    
    // Check for pending requests
    if ([self checkRequestStart:DIAL_REQUEST_QUERY] == NO) {
        [requestLock unlock];
        return;
    }
    if (applicationName == nil || [applicationName length] == 0) {
        [self sendMessageToObservers:@"Please provide an application name"];
        [requestLock unlock];
        return;
    }
    
    [self sendStartedMessageToObservers];
    [self sendMessageToObservers:[NSString stringWithFormat:@"Querying application %@", applicationName]];

    NSURL *url = [self getApplicationURL:applicationName];
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url];
    [request setHTTPMethod:@"GET"];
    
    // Use an async request to avoid blocking the main thread
    NSURLConnection *connection = [[NSURLConnection alloc] initWithRequest:request delegate:self startImmediately:NO];
    [self setCurrentRequestApplication:applicationName withConnection:connection withType:DIAL_REQUEST_QUERY];
    [connection start];
    
    [requestLock unlock];
}


/*
 * Parses a query response xml using libxml DOM parser
 */
-(void)parseQueryResponse
{
    xmlDocPtr doc;
    xmlNodePtr root;
    BOOL has_name = NO, has_state = NO, has_link = NO;
    BOOL running = NO;
    
    doc = xmlReadMemory([receivedData bytes], [receivedData length], "noname.xml", NULL, 0);
    if (doc == NULL) {
        return;
    }
    
    root = xmlDocGetRootElement(doc);
    if(strcmp((char *) root->name, "service") == 0) {
        xmlNode *cur_node = NULL;

        for (cur_node = root->children; cur_node; cur_node = cur_node->next) {
            if (cur_node->type == XML_ELEMENT_NODE) {
                if (XML_NODE_NAME_IS (cur_node, "name")) {
                    char* content = (char*) xmlNodeListGetString(doc, cur_node->children, 1);
                    has_name = YES;
                    if (content) {
                        [self sendMessageToObservers:[NSString stringWithFormat:@"Application name: %s", content]];
                        xmlFree ((xmlChar*) content);
                    }
                    
                } else if (XML_NODE_NAME_IS(cur_node, "options")) {
                    xmlChar *prop = xmlGetProp(cur_node, (const xmlChar *)"allowStop");
                    
                    if (prop) {
                        if (strcasecmp((char *)prop, "true") == 0) {
                            [self sendMessageToObservers:@"Application supports stop requests"];
                        } else {
                            [self sendMessageToObservers:@"Application doesn't support stop requests"];
                        }
                        xmlFree(prop);
                    } else {
                        [self sendMessageToObservers:@"Application doesn't support stop requests"];
                    }
                    
                } else if (XML_NODE_NAME_IS(cur_node, "state")) {
                    char* content = (char*) xmlNodeListGetString(doc, cur_node->children, 1);
                    has_state = YES;
                    
                    if (content != NULL) {
                        if (strcmp(content, "running") == 0) {
                            [self sendMessageToObservers:@"Application is currently running"];
                            running = YES;
                            
                        } else if (strcmp(content, "stopped") == 0) {
                            [self sendMessageToObservers:@"Application is not running"];
                            
                        } else if (str_starts_with(content, "installable=")) {
                            [self sendMessageToObservers:[NSString stringWithFormat:@"Application is not installed, but is available from %s", (content + strlen("installable="))]];
                            
                        } else {
                            [self sendMessageToObservers:[NSString stringWithFormat:@"Unexpected application state %s", content]];
                        }
                        xmlFree ((xmlChar*) content);
                    }
                    
                } else if (XML_NODE_NAME_IS(cur_node, "link")) {
                    xmlChar *rel = xmlGetProp(cur_node, (const xmlChar *)"rel");
                    xmlChar *href = xmlGetProp(cur_node, (const xmlChar *)"href");
                    has_link = YES;
                    
                    if (rel) {
                        [self sendMessageToObservers:[NSString stringWithFormat:@"Application 'rel' link: %s", (char *) rel]];
                        xmlFree(rel);
                    }
                    if (href) {
                        [self sendMessageToObservers:[NSString stringWithFormat:@"Application 'href' link: %s", (char *) href]];
                        xmlFree(href);
                    }
                } else {
                    [self sendMessageToObservers:[NSString stringWithFormat:@"Unexpected xml node %s", (char *)cur_node->name]];
                }
            }
        }
    } else {
        [self sendMessageToObservers:[NSString stringWithFormat:@"Unexpected XML root node %s", root->name]];
    }

    xmlFreeDoc(doc);
    
    if (!has_name) {
        [self sendMessageToObservers:@"Missing <name> element in query xml"];
    }
    if (!has_state) {
        [self sendMessageToObservers:@"Missing <state> element in query xml"];
    }
    if (!has_link && running) {
        [self sendMessageToObservers:@"Missing <link> element in query xml"];
    }
}

// NSURLConnectionDelegate protocol
- (NSCachedURLResponse *)connection:(NSURLConnection *)connection willCacheResponse:(NSCachedURLResponse *)cachedResponse
{
    return cachedResponse;
}

/*
 * Handles the responses from the HTTP requests.
 *
 * Here it is checked the status code for the request and optional results that are sent
 * in the headers.
 */
- (void)connection:(NSURLConnection *)connection didReceiveResponse:(NSURLResponse *)response
{
    NSHTTPURLResponse *httpresponse = (NSHTTPURLResponse *)response;
    NSInteger statusCode = [httpresponse statusCode];
    
    [requestLock lock];
    [self sendMessageToObservers:[NSString stringWithFormat:@"Request got response %d", statusCode]];
    NSString *message = nil;
    
    if (self->currentRequest == DIAL_REQUEST_START) {
        if (statusCode == 201) {
            NSString *instanceLocation = [[httpresponse allHeaderFields] objectForKey:@"LOCATION"];

            message = [NSString stringWithFormat:@"Application started successfully, instance: %@", instanceLocation];
            [self->runningApps setObject:instanceLocation forKey:self->currentRequestApplication];
        } else if (statusCode == 503) {
            message = @"Application failed to start";
        } else if (statusCode == 404) {
            message = @"Application not found";
        } else if (statusCode == 413) {
            message = @"Request message was too large for the server to handle";
        } else if (statusCode == 400) {
            message = @"Server replied with '400 Bad Request'";
        } else {
            message = [NSString stringWithFormat:@"Unexpected response code %d", statusCode];
        }
    } else if (self->currentRequest == DIAL_REQUEST_STOP) {
        if (statusCode == 200) {
            message = @"Application stopped successfully";
            [runningApps removeObjectForKey:self->currentRequestApplication];
        } else if (statusCode == 501) {
            message = @"Server doesn't support stop requests";
        } else if (statusCode == 404) {
            message = @"Application instance not found";
        } else if (statusCode == 400) {
            message = @"Server replied with '400 Bad Request'";
        } else {
            message = [NSString stringWithFormat:@"Unexpected response code %d", statusCode];
        }
    
    } else if (self->currentRequest == DIAL_REQUEST_QUERY) {
        if (statusCode == 200) {
            NSString *mime = [[[[httpresponse allHeaderFields]objectForKey:@"Content-Type"] stringByReplacingOccurrencesOfString:@" " withString:@""] lowercaseString];
            
            if ([mime isEqualToString:@"text/xml;charset=utf-8"]) {
                [self sendMessageToObservers:[NSString stringWithFormat:@"Unexpected response content-type: %@", mime]];
            }
            [self sendMessageToObservers:@"Application query finished, parsing response XML"];
            
            
        } else if (statusCode == 404) {
            message = @"Application not found";
        } else if (statusCode == 400) {
            message = @"Server replied with '400 Bad Request'";
        } else {
            message = [NSString stringWithFormat:@"Unexpected response code %d", statusCode];
        }

    } else {
        message = [NSString stringWithFormat:@"object is in unexpected request state: %d", self->currentRequest];
    }
    if(message != nil)
        [self sendMessageToObservers:message];
    [requestLock unlock];
}

- (void)connection:(NSURLConnection *)connection didReceiveData:(NSData *)data
{
    [requestLock lock];
    // store data to be parsed later
    [receivedData appendData:data];
    [requestLock unlock];
}

- (NSURLRequest *)connection:(NSURLConnection *)connection willSendRequest:(NSURLRequest *)request redirectResponse:(NSURLResponse *)redirectResponse
{
    return request;
}

- (void)connectionDidFinishLoading:(NSURLConnection *)connection
{
    [requestLock lock];
    if (self->currentRequest == DIAL_REQUEST_QUERY) {
        [self parseQueryResponse];
    }
    [self setCurrentRequestApplication:nil withConnection:nil withType:DIAL_REQUEST_NONE];
    [self sendFinishedMessageToObservers];
    [requestLock unlock];
}

- (void)connection:(NSURLConnection *)connection didSendBodyData:(NSInteger)bytesWritten totalBytesWritten:(NSInteger)totalBytesWritten totalBytesExpectedToWrite:(NSInteger)totalBytesExpectedToWrite
{
    //NOP
}

- (void)connection:(NSURLConnection *)connection didFailWithError:(NSError *)error
{
    [requestLock lock];
    [self sendMessageToObservers:[NSString stringWithFormat:@"Application %s failed: %@", dial_request_type_get_name(self->currentRequest), error.localizedDescription]];
    [self setCurrentRequestApplication:nil withConnection:nil withType:DIAL_REQUEST_NONE];
    [self sendFinishedMessageToObservers];
    [requestLock unlock];
}

@end
