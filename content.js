const DEBUG = true;

function capitalizeAndPunctuate(text) {
    text = text.trim();

    // Capitalize sentence starts
    text = text.replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());

    // Add period if missing
    if (text.length > 0 && !/[.!?]$/.test(text)) {
        text += ".";
    }

    return text;
}

function getMessageBox() {
    const box = document.querySelector('[contenteditable="true"][data-lexical-editor="true"][data-tab="10"]');

    return box;
}

function replaceTextSafely(element, newText) {
    try {
        element.focus();

        const range = document.createRange();
        range.selectNodeContents(element);

        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);

        document.execCommand("insertText", false, newText);
    } catch (err) {
        console.error("[WA-AutoCaps] Replace error:", err);
    }
}

function attachListener() {
    const box = getMessageBox();

    if (!box) {
        return;
    }

    if (box.dataset.listenerAttached) {
        return;
    }

    box.dataset.listenerAttached = "true";

    box.addEventListener("keydown", function (e) {
        if (e.key === " " || e.code === "Space") {
            // Let WhatsApp insert the space first
            setTimeout(() => {
                try {
                    const selection = window.getSelection();
                    if (!selection.rangeCount) return;

                    const range = selection.getRangeAt(0);
                    const node = range.startContainer;

                    if (!node || node.nodeType !== Node.TEXT_NODE) return;

                    let text = node.textContent;

                    // Capitalize first letter of entire message
                    if (text.length === 1) {
                        node.textContent = text.toUpperCase();
                        return;
                    }

                    // Capitalize word after punctuation
                    const updated = text.replace(/(^\w|[.!?]\s+\w)/g, (c) => c.toUpperCase());

                    if (text !== updated) {
                        node.textContent = updated;

                        // Restore cursor to end
                        range.setStart(node, updated.length);
                        range.collapse(true);
                        selection.removeAllRanges();
                        selection.addRange(range);
                    }
                } catch (err) {
                    console.error("[WA-AutoCaps] Space format error:", err);
                }
            }, 0);
        }

        if (e.key === "Enter" && !e.shiftKey) {
            // Process synchronously before the message is sent
            try {
                const selection = window.getSelection();
                if (!selection.rangeCount) return;

                const range = selection.getRangeAt(0);
                const node = range.startContainer;

                if (!node || node.nodeType !== Node.TEXT_NODE) return;

                let text = node.textContent;

                // Capitalize first word and any word following sentence-ending punctuation
                const updated = text.replace(/(^\w|[.!?]\s+\w)/g, (c) => c.toUpperCase());

                if (text !== updated) {
                    node.textContent = updated;

                    // Restore cursor to end
                    range.setStart(node, updated.length);
                    range.collapse(true);
                    selection.removeAllRanges();
                    selection.addRange(range);
                }
            } catch (err) {
                console.error("[WA-AutoCaps] Enter format error:", err);
            }
        }
    });
}

// Observe dynamic DOM changes
const observer = new MutationObserver(() => {
    attachListener();
});

observer.observe(document.body, {
    childList: true,
    subtree: true,
});
