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
            const textNode = editor.createText();
            textNode.text = textStr;
            
            // Set font size to be small
            const textContent = textNode.fullContent;
            textContent.characterStyles.forEach(style => {
                style.fontSize = 12;
            });
            textNode.fullContent = textContent;

            // Position at the bottom of the page if possible
            const page = editor.context.currentPage;
            if (page) {
                // approximate bottom of the page
                textNode.translation = { x: 20, y: page.height - 40 };
            }

            editor.context.insertionParent.children.append(textNode);
            return true;
        }
    };

    // Expose `sandboxApi` to the UI runtime.
    runtime.exposeApi(sandboxApi);
}

start();
