//
//  ServerSelectionViewController.m
//  DialApp
//
//  Copyright (C) 2013 SmartTV Alliance <http://www.smarttv-alliance.org/>
//

#import "ServerSelectionViewController.h"
#import "DialServiceDiscoveryClient.h"
#import "ServiceCommandsViewController.h"
#import "DialServiceProxy.h"

#include "BasicDeviceParser.h"

@interface ServerSelectionViewController () {
    DialServiceDiscoveryClient *client;
    NSMutableArray *services;
}

@end

@implementation ServerSelectionViewController

- (id)initWithStyle:(UITableViewStyle)style
{
    self = [super initWithStyle:style];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];

    // Uncomment the following line to preserve selection between presentations.
    // self.clearsSelectionOnViewWillAppear = NO;
 
    // Uncomment the following line to display an Edit button in the navigation bar for this view controller.
    // self.navigationItem.rightBarButtonItem = self.editButtonItem;
    services = [[NSMutableArray alloc] init];
    client = [[DialServiceDiscoveryClient alloc] init];
    [client addSSDPObserver:(SSDPDB_ObjC_Observer*)self];
    
    [client search];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

#pragma mark - Table view data source
// These methods are related to displaying the DIAL services that were discovered in the table view

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView
{
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    @synchronized(services) {
        return [services count];
    }
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    @synchronized(services) {
        static NSString *CellIdentifier = @"Cell";
        SSDPDBDevice_ObjC *device = [services objectAtIndex:indexPath.row];
        UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:CellIdentifier forIndexPath:indexPath];
    
        // Configure the cell...
        cell.textLabel.text = device.usn;
        cell.detailTextLabel.text = device.location;
    
        // Launch a background thread to get the friendly name of the device to display
        // meanwhile the usn is displayed
        dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^(void) {
            BasicUPnPDevice *dev = [[BasicUPnPDevice alloc] initWithSSDPDevice:device];
            [dev loadDeviceDescriptionFromXML];
            if(dev.friendlyName != nil) {
                [cell.textLabel performSelectorOnMainThread:@selector(setText:) withObject:dev.friendlyName waitUntilDone:NO];
            }
        });
    
        return cell;
    }
}

#pragma mark - Table view delegate

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
}

// Sets up the next controllers that will be running on the next screens
-(void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender{
    @synchronized(services) {
        if([segue.identifier isEqualToString:@"showCommandsSegue"]){
            NSIndexPath *selectedRowIndex = [self.tableView indexPathForSelectedRow];
            UITableViewCell *cell = [self.tableView cellForRowAtIndexPath:selectedRowIndex];
            ServiceCommandsViewController *controller = (ServiceCommandsViewController *)segue.destinationViewController;
        
            SSDPDBDevice_ObjC *device = [services objectAtIndex:selectedRowIndex.row];
            if (device) {
                controller.proxy = [[DialServiceProxy alloc] initWithDevice:device];
                controller.proxy.applicationUrl = [client getDialApplicationURL:[NSURL URLWithString:device.location]];
                controller.title = cell.textLabel.text;
            }
        }
    }
}

-(IBAction)refreshButtonPressed:(id)sender
{
    // Start a new services search
    [self->client search];
}

-(void)SSDPDBWillUpdate:(SSDPDB_ObjC*)sender{
    @synchronized(services) {
        // Erase all current services before the DB is updated.
        [services removeAllObjects];
    }
    [self.tableView performSelectorOnMainThread:@selector(reloadData) withObject:nil waitUntilDone:YES];
}

-(void)SSDPDBUpdated:(SSDPDB_ObjC*)sender{
    @synchronized(services) {
        // Get new services list
        [services removeAllObjects];
        [services addObjectsFromArray:[client getDialServices]];
    }
    [self.tableView performSelectorOnMainThread:@selector(reloadData) withObject:nil waitUntilDone:YES];
}

@end
