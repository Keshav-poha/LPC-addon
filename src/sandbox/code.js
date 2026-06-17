import addOnSandboxSdk from "add-on-sdk-document-sandbox";
import { editor } from "express-document-sdk";

// Get the document sandbox runtime.
const { runtime } = addOnSandboxSdk.instance;

function start() {
    // We don't need extensive sandbox APIs because `addAnimatedImage` 
    // is called from the UI sdk context.
    const sandboxApi = {
        ping: () => {
            console.log("Sandbox pinged");
            return true;
        },
        addCreditsText: (textStr) => {
            if (!textStr) return;
            const textNode = editor.createText(textStr);
            
            // Set font size to be small
            textNode.fullContent.applyCharacterStyles(
                { fontSize: 12 },
                { start: 0, length: textStr.length }
            );

            // Position at the bottom of the page if possible
            const page = editor.context.currentPage;
            if (page) {
                // Position 20px from the left, and 40px from the bottom
                textNode.setPositionInParent(
                    { x: 20, y: page.height - 40 },
                    { x: 0, y: 0 }
                );
            }

            editor.context.insertionParent.children.append(textNode);
            return true;
        }
    };

    // Expose `sandboxApi` to the UI runtime.
    runtime.exposeApi(sandboxApi);
}

start();
