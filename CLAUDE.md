# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## rule

- 始终以中文回复

## Project Overview

Wallabagger is a browser extension (Firefox & Chromium-based) for Wallabag v2, a self-hosted read-later application. The extension allows users to save articles, edit titles, manage tags, and control archived/starred status.

## Development Commands

### Linting
```bash
npm run lint
```
Lints all JavaScript files in `wallabagger/js/` using ESLint with Standard configuration.

### Dependency Updates
```bash
npm run deps:update
```
Updates Spectre CSS files from node_modules to the extension's css directory.

### Locale Management
```bash
npm run locales:sort
```
Sorts JSON files in the locales directory for consistent formatting.

### Extension Packaging
```bash
./pack.sh
```
Creates a zip archive for distribution (Chrome Web Store, Firefox Add-ons).

## Architecture

### Core Components

#### Background Script (`js/background.js`)
- **Entry point**: Service worker for Manifest V3
- **Key responsibilities**: Context menus, message passing, port management, caching system
- **Notable patterns**: Uses ES6 modules, implements CacheType for local caching, manages extension lifecycle

#### API Layer (`js/wallabag-api.js`)
- **Purpose**: Handles all Wallabag API communication
- **Key features**: OAuth2 token management, article CRUD operations, tag management
- **Architecture**: Uses FetchApi for HTTP requests, implements URL hashing for exist checks

#### Popup Interface (`js/popup.js`)
- **Role**: Main user interface controller
- **Features**: Article management UI, tag autocomplete, title editing, status toggles
- **Pattern**: Event-driven controller with extensive DOM manipulation

#### Options Page (`js/options.js`)
- **Function**: Extension configuration interface
- **Responsibilities**: Server settings, authentication, feature toggles

#### Utilities
- `js/common.js`: Shared utilities and translation helpers
- `js/fetch-api.js`: HTTP request abstraction layer
- `js/browser-polyfill.js`: Cross-browser compatibility

### Extension Structure

```
wallabagger/
├── manifest.json          # Extension manifest (Manifest V3)
├── popup.html             # Main popup interface
├── options.html           # Settings page
├── js/                    # JavaScript modules
├── css/                   # Styles (includes Spectre CSS framework)
├── img/                   # Icons and images
├── fonts/                 # Web fonts
└── _locales/              # Internationalization files
```

### Code Patterns

#### Module System
- Uses ES6 imports/exports
- Background script imports: `browser-polyfill`, `common`, `wallabag-api`
- Popup imports: `browser-polyfill`, `common`
- API layer imports: `browser-polyfill`, `fetch-api`

#### Global Objects
ESLint configuration defines these globals:
- `WallabagApi`: Main API interface
- `FetchApi`: HTTP request handler
- `Common`: Shared utilities

#### Browser Compatibility
- Targets Firefox >= 109, Chrome > 88
- Uses browser polyfill for cross-browser compatibility
- Manifest V3 with service worker background script

## Code Standards

### ESLint Configuration
- Extends Standard JavaScript style
- 4-space indentation with switch case indentation
- Semicolons required
- WebExtensions and browser environment enabled
- Compatibility checking enabled via eslint-plugin-compat

### File Organization
- JavaScript files in `wallabagger/js/`
- All files use ES6 module syntax
- Consistent naming: kebab-case for files, camelCase for variables
- Extensive use of prototypal inheritance patterns

## Browser Extension Specifics

### Permissions
- **Required**: `storage`, `contextMenus`, `activeTab`, `scripting`
- **Optional**: `tabs`, host permissions for API endpoints
- **Keyboard shortcuts**: Alt+W (popup), Alt+Shift+W (quick save)

### API Integration
- OAuth2 flow with token refresh
- RESTful API communication with Wallabag server
- Local caching for performance optimization
- Support for both cloud and self-hosted Wallabag instances

### UI Framework
- Uses Spectre CSS framework for consistent styling
- Responsive design for various popup sizes
- Extensive use of CSS classes for state management

## Development Notes

- Extension supports both Manifest V2 and V3 patterns
- Background script works as both traditional script and service worker
- Internationalization support for 40+ locales
- Feature flags for experimental functionality (exist checks, local fetch)
- Debug mode available for development and troubleshooting