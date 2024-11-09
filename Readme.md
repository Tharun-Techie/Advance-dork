# AdvanceDork

**AdvanceDork** is a Chrome extension designed for advanced Google Dorking. This tool simplifies Google Dork queries, allowing users to select and apply different search parameters to refine and enhance their search results on Google.

## Features

- **Quick Access to Google Dorks**: Choose from a variety of common Google Dork operators.
- **User-Friendly UI**: Intuitive interface with dropdown selections for various query options.
- **Integrated Search**: Combines your search query with selected dorks and opens the Google results directly.

## Installation

1. Clone this repository or download it as a ZIP file and extract it.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** (toggle in the upper right corner).
4. Click on **Load unpacked** and select the `AdvanceDork` folder you just downloaded or cloned.
5. The extension should now appear in your list of extensions.

## Usage

1. Click on the **AdvanceDork** icon in the Chrome toolbar to open the extension popup.
2. Select a Google Dork from the dropdown menu (e.g., `site:`, `filetype:`, etc.).
3. Enter your search query in the input field.
4. Click the **Search** button. This will construct the query and open Google search with your selected dork and query.

## File Structure

- **manifest.json**: Defines the extension's metadata and permissions.
- **popup.html**: Contains the HTML structure of the extension's popup interface.
- **popup.js**: JavaScript file handling the dork selection, query creation, and search redirection.
- **icons/**: Contains the icons used in the extension, including `icon16.png`, `icon48.png`, and `icon128.png`.

## Troubleshooting

If you encounter issues such as missing icons or manifest errors, ensure the following:

1. Icons are located in the `icons/` folder and are named `icon16.png`, `icon48.png`, and `icon128.png`.
2. Paths in `manifest.json` correctly point to existing files.
3. Reload the extension by going to `chrome://extensions/`, enabling Developer mode, and clicking **Reload** under the AdvanceDork extension.

## Example `manifest.json`

```json
{
  "manifest_version": 3,
  "name": "AdvanceDork",
  "version": "1.0",
  "description": "A Chrome extension for advanced Google Dorking.",
  "action": {
    "default_icon": {
      "16": "icons/icon16.png",
      "48": "icons/icon48.png",
      "128": "icons/icon128.png"
    },
    "default_popup": "popup.html"
  },
  "icons": {
    "16": "icons/icon16.png",
    "48": "icons/icon48.png",
    "128": "icons/icon128.png"
  },
  "permissions": ["activeTab", "scripting"]
}
