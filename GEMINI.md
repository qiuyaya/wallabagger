# Gemini Code Understanding

## Project Overview

This project is a browser extension for Wallabag, a self-hostable application for saving web articles. The extension, named "Wallabagger," allows users to save pages to their Wallabag instance, add tags, and manage saved articles directly from their browser. It is compatible with Firefox and Chromium-based browsers.

The extension is built using JavaScript, HTML, and CSS. It uses the `web-ext` tool for development and `eslint` for code linting. The user interface is built with the Spectre.css framework.

## Building and Running

The project does not have a build process in the traditional sense. The extension can be loaded into the browser for development using the `web-ext` tool.

**Key commands:**

*   **`npm install`**: Install project dependencies.
*   **`npm run lint`**: Lint the JavaScript files in the `wallabagger/js` directory.
*   **`npm run deps:update`**: Copy Spectre.css files from `node_modules` to the `wallabagger/css` directory.
*   **`npx web-ext run`**: To run the extension in a development browser.

## Development Conventions

*   **Coding Style**: The project uses ESLint with the `eslint-config-standard` configuration to enforce a consistent coding style.
*   **Localization**: The extension is localized into multiple languages. The localization files are located in the `wallabagger/_locales` directory. The `locales:sort` script is used to keep the `messages.json` files sorted.
*   **API Interaction**: The extension interacts with the Wallabag API through the `wallabag-api.js` file. The core logic for handling API requests and responses is in `background.js`.
*   **UI**: The user interface for the popup and options pages is defined in `popup.html` and `options.html` respectively. The corresponding JavaScript files are `popup.js` and `options.js`.
