//
//  ServerSelectionViewController.h
//  DialApp
//
//  Copyright (C) 2013 SmartTV Alliance <http://www.smarttv-alliance.org/>
//

#import <UIKit/UIKit.h>
#import "UPnPDB.h"

@interface ServerSelectionViewController : UITableViewController <SSDPDB_ObjC_Observer>

-(IBAction)refreshButtonPressed:(id)sender;

@end
