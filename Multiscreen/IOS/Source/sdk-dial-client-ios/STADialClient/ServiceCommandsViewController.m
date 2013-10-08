//
//  ServiceCommandsViewController.m
//  DialApp
//
//  Copyright (C) 2013 SmartTV Alliance <http://www.smarttv-alliance.org/>
//

#import "ServiceCommandsViewController.h"

@interface ServiceCommandsViewController ()

@end

@implementation ServiceCommandsViewController

@synthesize applicationField;
@synthesize argumentsField;
@synthesize resultsView;
@synthesize proxy;

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
	// Do any additional setup after loading the view.
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

-(void)setProxy:(DialServiceProxy *)aProxy
{
    if (self.proxy) {
        [self.proxy removeDialServiceProxyObserver:self];
    }
    self->proxy = aProxy;
    if (self.proxy) {
        [self.proxy addDialServiceProxyObserver:self];
    }    
}

-(IBAction) startButtonPressed:(id)sender
{
    NSString *application = self.applicationField.text;
    NSString *arguments = self.argumentsField.text;
    
    [proxy startApplication:application withArguments:arguments];
}

-(IBAction) stopButtonPressed:(id)sender
{
    NSString *application = self.applicationField.text;
    
    [proxy stopApplication:application];
}

-(IBAction) queryButtonPressed:(id)sender
{
    NSString *application = self.applicationField.text;
    
    [proxy queryApplication:application];
}

-(void)requestStarted:(DialRequestType)requestType
{
    self.resultsView.text = @"";
}

-(void)requestFinished
{
}

-(void)requestMessage:(NSString*)msg
{
    self.resultsView.text = [NSString stringWithFormat:@"%@\n%@", self.resultsView.text, msg];
}

@end
