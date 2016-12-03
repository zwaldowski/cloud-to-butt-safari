//
//  SafariExtensionHandler.m
//  CloudToButt
//
//  Created by Zachary Waldowski on 12/2/16.
//  Copyright © 2016 Zachary Waldowski. All rights reserved.
//

@import SafariServices;

@interface SafariExtensionHandler : SFSafariExtensionHandler
@end

@implementation SafariExtensionHandler
    
- (void)messageReceivedWithName:(NSString *)messageName fromPage:(SFSafariPage *)page userInfo:(NSDictionary<NSString *,id> *)userInfo {
    if ([messageName isEqual:@"ReadyForReplacements"]) {
        [page dispatchMessageToScriptWithName:@"PerformReplacements" userInfo: @{
            @"\\bThe Cloud\\b": @"My Butt",
            @"\\bThe cloud\\b": @"My butt",
            @"\\bthe Cloud\\b": @"my Butt",
            @"\\bthe cloud\\b": @"my butt",
            @"\\bmillenial\\b": @"snake person",
            @"\\bMillenial\\b": @"Snake Person",
            @"\\bmillenials\\b": @"snake people",
            @"\\bMillenials\\b": @"Snake People",
        }];
    }
}

@end
