//
//  main.m
//  DialApp
//
//  Copyright (C) 2013 SmartTV Alliance <http://www.smarttv-alliance.org/>
//

#import <UIKit/UIKit.h>
#include <libxml/parser.h>

#import "AppDelegate.h"

int main(int argc, char *argv[])
{
    @autoreleasepool {
        int ret = UIApplicationMain(argc, argv, nil, NSStringFromClass([AppDelegate class]));
        xmlCleanupParser();
        return ret;
    }
}
