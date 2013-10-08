//
//  DialServiceProxy.h
//  DialApp
//
//  Copyright (c) 2013 SmartTV Alliance <http://www.smarttv-alliance.org/>
//

#import <Foundation/Foundation.h>
#import "UPnPDB.h"

typedef enum {
    DIAL_REQUEST_NONE,
    DIAL_REQUEST_START,
    DIAL_REQUEST_STOP,
    DIAL_REQUEST_QUERY
} DialRequestType;

@protocol DialServiceProxyObserver

-(void)requestStarted:(DialRequestType)requestType;
-(void)requestFinished;

@optional
-(void)requestMessage:(NSString*)msg;
    
@end

@interface DialServiceProxy : NSObject <NSURLConnectionDelegate>

@property (retain,nonatomic) NSString* name;
@property (retain,nonatomic) NSString* location;
@property (retain,nonatomic) NSString* applicationUrl;

-(id) initWithDevice:(SSDPDBDevice_ObjC*) device;
-(void) addDialServiceProxyObserver:(id)observer;
-(void) removeDialServiceProxyObserver:(id)observer;

-(void) startApplication:(NSString*)applicationName withArguments:(NSString*)arguments;
-(void) stopApplication:(NSString*)applicationName;
-(void) queryApplication:(NSString*)applicationName;

@end
