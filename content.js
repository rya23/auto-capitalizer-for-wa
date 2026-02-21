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
            setTimeout(() => {
                try {
                    const selection = window.getSelection();
                    if (!selection.rangeCount) return;

                    const range = selection.getRangeAt(0);
                    const node = range.startContainer;

                    if (!node || node.nodeType !== Node.TEXT_NODE) return;

                    let text = node.textContent;

                    // 1️⃣ Double space → convert to ". "
                    if (text.endsWith("  ")) {
                        text = text.slice(0, -2) + ". ";
                    }

                    // 2️⃣ Capitalize start of message
                    text = text.replace(/^\w/, (c) => c.toUpperCase());

                    // 3️⃣ Capitalize after punctuation
                    text = text.replace(/([.!?]\s+)(\w)/g, (match, p1, p2) => {
                        return p1 + p2.toUpperCase();
                    });

                    node.textContent = text;

                    // Restore cursor to end
                    range.setStart(node, text.length);
                    range.collapse(true);
                    selection.removeAllRanges();
                    selection.addRange(range);
                } catch (err) {
                    console.error("[WA-AutoCaps] Space format error:", err);
                }
            }, 0);
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
