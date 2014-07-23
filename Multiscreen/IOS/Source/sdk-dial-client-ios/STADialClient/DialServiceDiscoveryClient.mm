//
//  DialClient.m
//  DialApp
//
//  Copyright (C) 2013 SmartTV Alliance <http://www.smarttv-alliance.org/>
//

#import "DialServiceDiscoveryClient.h"
#import "UPnPManager.h"

#include "upnp.h"
#include "ssdp.h"
#include "ssdpdb.h"

/*
 * Class that provides an API to query and list DIAL Services
 *
 * Use the 'search' method to start a new search and 'getDevices' to
 * list the currently known UPnP Devices. To retrieve only the DIAL services use
 * 'getDialServices'.
 *
 * To get notified when the devices list changed, register an observer
 * with addSSDPObserver.
 */
@implementation DialServiceDiscoveryClient {
    UPnPManager *manager;
}

- (id)init
{
    self = [super init];
    if (self) {
        manager = [UPnPManager GetInstance];
        [[manager SSDP] startSSDP];
    }
    return self;
}

-(void)addSSDPObserver:(SSDPDB_ObjC_Observer*)observer
{
    [[manager SSDP] addObserver:(SSDPDB_ObjC_Observer*)observer];
}

-(void)search
{
    UPNP::GetInstance()->GetSSDP()->GetDB()->Lock();
    UPNP::GetInstance()->GetSSDP()->GetDB()->DeleteAllDevices();
    UPNP::GetInstance()->GetSSDP()->GetDB()->Unlock();
    [[manager SSDP] searchSSDPWithType:DIAL_SERVICE_URN];
}

-(NSArray*)getDevices
{
    return [[manager SSDP] SSDPObjCDevices];
}

-(NSArray*)getDialServices
{
    UPNP::GetInstance()->GetSSDP()->GetDB()->Lock();
    NSArray* devices = [self getDevices];
    NSMutableArray *services = [[NSMutableArray alloc] init];
    for (SSDPDBDevice_ObjC *dev in devices) {
        if (dev.isservice && [dev.urn isEqualToString:DIAL_SERVICE_URN] && (dev.location != nil)) {
            [services addObject:dev];
        }
    }
    UPNP::GetInstance()->GetSSDP()->GetDB()->Unlock();
    return services;
}

/*
 * Does a synchronous HTTP GET to a URL and checks if it returns an Application-URL in the headers
 *
 * The DIAL spec states that the reply to a HTTP GET call to the DIAL service UPnP description should
 * include an Application-URL header.
 */
-(NSString*) getDialApplicationURL:(NSURL *)url
{
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url
                                                        cachePolicy:NSURLRequestReloadIgnoringLocalAndRemoteCacheData
                                                       timeoutInterval:10];
    
    [request setHTTPMethod: @"GET"];
    
    NSError *requestError;
    NSURLResponse *urlResponse = nil;
    [NSURLConnection sendSynchronousRequest:request returningResponse:&urlResponse
                                      error:&requestError];
    NSHTTPURLResponse *httpResponse = (NSHTTPURLResponse*) urlResponse;
    NSString *appurl = [[httpResponse allHeaderFields] objectForKey:@"Application-URL"];
    
    if (![appurl hasSuffix:@"/"]) {
        appurl = [NSString stringWithFormat:@"%@/", appurl];
    }
    
    return appurl;
}

@end
