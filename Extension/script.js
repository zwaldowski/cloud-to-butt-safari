// Wait for the DOM to load before dispatching a message to the app extension's Swift code.
document.addEventListener("DOMContentLoaded", function(event) {
                          safari.extension.dispatchMessage("ReadyForReplacements");
                          });

// Listens for messages sent from the app extension's Swift code.
safari.self.addEventListener("message", messageHandler);

function messageHandler(event)
{
    if (event.name === "PerformReplacements") {
        // The userInfo of the call to -[SFSafariPage dispatchMessageToScriptWithName:userInfo:].
        var replacementMap = event.message;
        var replacementFunctions = [];
        
        for (var patternToReplace in replacementMap) {
            // Generate a regular expression object to perform the replacement.
            var expressionForReplacing = new RegExp(patternToReplace, "g");
            var replacement = replacementMap[patternToReplace];
            var replacementFunction = function(nodeValue){
                return nodeValue.replace(expressionForReplacing, replacement);
            };
            
            replacementFunctions.push(replacementFunction);
        }
        
        replace(document.body, replacementFunctions);
    }
}

function replace(node, replacements) {
    switch (node.nodeType)
    {
        case Node.ELEMENT_NODE:
            // We don't want to replace text in an input field or textarea.
            if (node.tagName.toLowerCase() === "input" || node.tagName.toLowerCase() === "textarea") {
                return;
            }
            
            // For other types of element nodes, we explicitly fall through to iterate over their children.
        case Node.DOCUMENT_NODE:
        case Node.DOCUMENT_FRAGMENT_NODE:
            // If the node is a container node, iterate over all the children and recurse into them.
            var child = node.firstChild;
            var next = undefined;
            while (child) {
                next = child.nextSibling;
                replace(child, replacements);
                child = next;
            }
            break;
        case Node.TEXT_NODE:
            // If the node is a text node, perform the text replacement.
            replaceTextInTextNode(node, replacements);
            break;
    }
}

function replaceTextInTextNode(textNode, replacements) {
    // Skip over nodes that aren't text nodes.
    if (textNode.nodeType !== Node.TEXT_NODE)
        return;
    
    // And text nodes that don't have any text.
    if (!textNode.nodeValue.length)
        return;
    
    var nodeValue = textNode.nodeValue;
    var newNodeValue = nodeValue;
    for (index in replacements) {
        newNodeValue = replacements[index](newNodeValue);
    }
    
    // Perform the replacement in the DOM if the regular expression had any effect.
    if (nodeValue !== newNodeValue) {
        textNode.nodeValue = newNodeValue;
    }
}
