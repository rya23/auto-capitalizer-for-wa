# WhatsApp Web Auto-Capitalization Extension

A Chrome extension that automatically capitalizes your messages and adds punctuation on WhatsApp Web.

## What It Does

This extension helps you write messages with proper capitalization and punctuation on WhatsApp Web automatically. It:

- **Capitalizes the first letter** of your message
- **Capitalizes the first letter after punctuation** (after periods, exclamation marks, or question marks)
- **Adds a period** at the end of your message if it's missing punctuation

## Features

**Real-time Auto-Capitalization** - Automatically capitalizes as you type
**Smart Punctuation** - Adds periods to incomplete messages
**Sentence-Aware** - Recognizes sentence boundaries and capitalizes appropriately
**Non-Intrusive** - Works seamlessly without interfering with your typing

## Installation

1. Clone or download this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" (toggle in the top right)
4. Click "Load unpacked" and select the extension folder
5. The extension is now active and ready to use on WhatsApp Web!

## Usage

Simply open [WhatsApp Web](https://web.whatsapp.com/) and start typing messages normally. The extension will automatically:

- Capitalize the first word
- Add periods where needed
- Capitalize words at the start of new sentences

No configuration needed—it works out of the box.

## How It Works

The extension uses a `MutationObserver` to monitor the WhatsApp Web DOM and detects your message input. When you press space or send a message, it applies intelligent text transformations to capitalize appropriately and add any missing punctuation.

## Files

- `manifest.json` - Chrome extension configuration (Manifest v3)
- `content.js` - Main script containing the auto-capitalization and punctuation logic
- `readme.md` - This file

## Requirements

- Chrome or Chromium-based browser (Edge, Brave, etc.)
- Active WhatsApp Web session

## Version

1.0
