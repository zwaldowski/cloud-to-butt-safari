//
//  AppDelegate.m
//  CloudToButt
//
//  Created by Zachary Waldowski on 12/2/16.
//  Copyright © 2016 Zachary Waldowski. All rights reserved.
//

@import Cocoa;

@interface AppDelegate: NSObject <NSApplicationDelegate>
@end

@implementation AppDelegate
    
- (void)applicationDidFinishLaunching:(NSNotification *)notification {
    [NSApp orderFrontStandardAboutPanel:self];
}
    
- (BOOL)applicationShouldTerminateAfterLastWindowClosed:(NSApplication *)sender {
    return YES;
}
    
@end

int main(int argc, const char * argv[]) {
    return NSApplicationMain(argc, argv);
}
