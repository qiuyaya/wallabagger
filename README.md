# Wallabagger

[Wallabagger](https://github.com/wallabag/wallabagger) is a Firefox and Chromium-based browser (Chrome, Vivaldi, Brave…) extension for [wallabag v2](https://wallabag.org).

## 中文说明

Wallabagger 是一个用于 [wallabag v2](https://wallabag.org) 的浏览器扩展，支持 Firefox 和基于 Chromium 的浏览器（Chrome、Vivaldi、Brave 等）。

### wallabag 是什么？

wallabag 是一个可自托管的应用程序，让您不再错过任何内容。更多信息请访问：[wallabag.org](https://wallabag.org) 和 [github.com](https://github.com/wallabag/wallabag)

### 主要功能

* 保存当前页面
* 从付费墙页面发送内容到 wallabag
* 编辑标题
* 添加（带自动完成功能！）和删除标签
* 设置收藏和归档状态
* 删除页面

### 系统要求

* 服务器端需要 [wallabag v2](https://wallabag.org)
* Firefox 或基于 Chromium 的浏览器（Chrome、Vivaldi、Brave、Edge v48+...）

## What is wallabag?

wallabag is a self hostable application allowing you to not miss any content anymore. More informations on website: [wallabag.org](https://wallabag.org) and [github.com](https://github.com/wallabag/wallabag)

* save the current page
* send the content from a paywalled page to wallabag
* edit the title
* add (with autocomplete!) and remove tags
* set starred and archived status
* delete the page

## Requirement

* [wallabag v2](https://wallabag.org) on server side.
* Firefox or Chromium-based browser (Chrome, Vivaldi, Brave, Edge v48+…)

## Installation

- Chromium-based browsers users can install extension from the [Chrome WebStore](https://chrome.google.com/webstore/detail/wallabagger/gbmgphmejlcoihgedabhgjdkcahacjlj)
- Firefox browsers users can install the extension from [Mozilla add-ons storage](https://addons.mozilla.org/en-US/firefox/addon/wallabagger/)

## 开发和打包说明 / Development and Build

### 开发环境设置

1. 克隆项目：
```bash
git clone https://github.com/wallabag/wallabagger.git
cd wallabagger
```

2. 安装依赖：
```bash
npm install
```

### 开发命令

#### 代码检查
```bash
npm run lint
```
使用 ESLint 对 `wallabagger/js/` 目录下的所有 JavaScript 文件进行代码检查。

#### 更新依赖
```bash
npm run deps:update
```
从 node_modules 更新 Spectre CSS 文件到扩展的 css 目录。

#### 本地化文件排序
```bash
npm run locales:sort
```
对 locales 目录中的 JSON 文件进行排序，保持格式一致。

### 打包发布

#### 创建发布包
```bash
./pack.sh
```
创建用于分发的 zip 压缩包（适用于 Chrome Web Store、Firefox Add-ons）。

该脚本会：
- 进入 `wallabagger` 目录
- 创建包含所有必需文件的 `wallabagger.zip` 压缩包

#### 支持的浏览器版本
- Firefox >= 109
- Chrome > 88

### Development Setup

1. Clone the repository:
```bash
git clone https://github.com/wallabag/wallabagger.git
cd wallabagger
```

2. Install dependencies:
```bash
npm install
```

### Development Commands

#### Linting
```bash
npm run lint
```
Lints all JavaScript files in `wallabagger/js/` using ESLint with Standard configuration.

#### Dependency Updates
```bash
npm run deps:update
```
Updates Spectre CSS files from node_modules to the extension's css directory.

#### Locale Management
```bash
npm run locales:sort
```
Sorts JSON files in the locales directory for consistent formatting.

### Building for Distribution

#### Create Release Package
```bash
./pack.sh
```
Creates a zip archive for distribution (Chrome Web Store, Firefox Add-ons).

The script will:
- Navigate to the `wallabagger` directory
- Create a `wallabagger.zip` archive with all necessary files

#### Browser Support
- Firefox >= 109
- Chrome > 88

## Useful links

- [Documentation](https://wallabagger.wallabag.org/)

## Many thanks to

* [Yuriy Evdokimov](mailto:rurik19@yandex.ru) for being at the origin of this extension
* [All the wallabag contributors](https://github.com/wallabag/wallabag/graphs/contributors)
* [Yan Zhu](https://github.com/picturepan2) for the [Spectre CSS framework](https://github.com/picturepan2/spectre)

## License

This work is free. You can redistribute it and/or modify it under the terms of the MIT License. See the COPYING file for more details.
