//
//  DialClient.h
//  DialApp
//
//  Copyright (C) 2013 SmartTV Alliance <http://www.smarttv-alliance.org/>
//

#import <Foundation/Foundation.h>
#import "UPnPDB.h"

#define DIAL_SERVICE_URN @"urn:dial-multiscreen-org:service:dial:1"

@interface DialServiceDiscoveryClient : NSObject

-(void)addSSDPObserver:(SSDPDB_ObjC_Observer*)observer;
-(void)search;
-(NSArray*)getDevices;
-(NSArray*)getDialServices;
-(NSString*) getDialApplicationURL:(NSURL *)url;

@end
