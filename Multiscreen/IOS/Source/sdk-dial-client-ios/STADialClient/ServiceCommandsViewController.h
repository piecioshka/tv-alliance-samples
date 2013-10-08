//
//  ServiceCommandsViewController.h
//  DialApp
//
//  Copyright (C) 2013 SmartTV Alliance <http://www.smarttv-alliance.org/>
//

#import <UIKit/UIKit.h>
#import "DialServiceProxy.h"

@interface ServiceCommandsViewController : UIViewController <DialServiceProxyObserver> {
}

-(IBAction) startButtonPressed:(id)sender;
-(IBAction) stopButtonPressed:(id)sender;
-(IBAction) queryButtonPressed:(id)sender;

@property (retain,nonatomic) IBOutlet UITextField* applicationField;
@property (retain,nonatomic) IBOutlet UITextField* argumentsField;
@property (retain,nonatomic) IBOutlet UITextView* resultsView;

@property (retain,nonatomic) DialServiceProxy* proxy;

-(void)requestFinished;
-(void)requestMessage:(NSString*)msg;

@end
