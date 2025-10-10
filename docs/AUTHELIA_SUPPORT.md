# Authelia 二次认证支持

## 概述

Wallabagger 现在支持在使用 Authelia 二次认证保护的 Wallabag 实例中工作。该功能提供了两种认证方式，以适应不同的 Authelia 部署场景。

## 功能特性

### 1. Cookie 模式（推荐）
- **自动携带 Authelia session cookies**
- 最简单的配置方式
- 适用于大多数标准 Authelia 部署
- 浏览器会自动管理认证 cookies

### 2. 自定义 Header 模式
- 允许手动配置额外的认证 header
- 适用于特殊的 Authelia 配置
- 支持自定义 header 名称和值
- 作为 Cookie 模式的补充或替代方案

## 配置方法

### 前提条件
- Wallabag 实例已正确配置
- 已获取 Wallabag API 的 Client ID 和 Client Secret
- 已在浏览器中登录到 Authelia 保护的 Wallabag 实例

### 配置步骤

1. **打开扩展设置页面**
   - 点击浏览器工具栏中的 Wallabagger 图标
   - 选择 "设置" 或 "Options"

2. **配置 Wallabag 基本信息**
   - 输入 Wallabag URL
   - 完成 OAuth2 认证配置

3. **启用 Authelia 支持**

   #### 方法 A: Cookie 模式（推荐）
   - 滚动到 "Authelia 二次认证" 部分
   - 勾选 "启用 Cookie 携带" 复选框
   - 保存设置

   #### 方法 B: 自定义 Header 模式
   如果 Cookie 模式不工作，可以尝试：
   - 输入 Header 名称（例如：`X-Authelia-Token`）
   - 输入 Header 值（你的 Authelia token）
   - 保存设置

4. **测试配置**
   - 尝试保存一个网页到 Wallabag
   - 如果成功，说明配置正确

## 技术实现

### 修改的文件

1. **wallabagger/js/wallabag-api.js**
   - 添加了 Authelia 配置字段：
     - `EnableAutheliaCookies`: 是否启用 cookie 携带
     - `AutheliaHeaderName`: 自定义 header 名称
     - `AutheliaHeaderValue`: 自定义 header 值
   - 添加了 `updateFetchApiConfig()` 方法来更新 FetchApi 配置

2. **wallabagger/js/fetch-api.js**
   - 添加了 `setAutheliaConfig()` 方法
   - 修改了 `getRequestOptions()` 以根据配置设置 `credentials`
   - 修改了 `getHeaders()` 以添加自定义 Authelia header

3. **wallabagger/options.html**
   - 添加了 "Authelia 二次认证" 配置区域
   - 包含 Cookie 模式复选框
   - 包含自定义 Header 配置输入框

4. **wallabagger/js/options.js**
   - 添加了 Authelia 相关的 DOM 元素引用
   - 实现了事件处理函数：
     - `enableAutheliaCookiesClick()`
     - `autheliaHeaderNameBlur()`
     - `autheliaHeaderValueBlur()`
   - 在 `setFields()` 中添加了加载 Authelia 配置的逻辑

### 工作原理

#### Cookie 模式
当启用 Cookie 模式时，FetchApi 会将 `credentials` 选项从 `'omit'` 改为 `'include'`，这样浏览器会自动在所有请求中携带相关的 cookies，包括 Authelia 的 session cookie。

```javascript
credentials: this.autheliaConfig.enableCookies ? 'include' : 'omit'
```

#### 自定义 Header 模式
当配置了自定义 header 时，FetchApi 会在所有请求的 headers 中添加指定的 header：

```javascript
if (this.autheliaConfig.headerName && this.autheliaConfig.headerValue) {
    headers[this.autheliaConfig.headerName] = this.autheliaConfig.headerValue;
}
```

## 故障排除

### 问题：保存网页失败，显示认证错误

**可能原因**：
1. 未在浏览器中登录 Authelia
2. Cookie 模式未启用
3. 自定义 header 配置不正确

**解决方法**：
1. 确保在浏览器中已登录 Authelia 保护的 Wallabag
2. 启用 "Cookie 携带" 选项
3. 如果仍然失败，尝试使用自定义 Header 模式

### 问题：Cookie 模式不工作

**可能原因**：
- Authelia 配置使用了非标准的认证方式
- 跨域 cookie 策略限制

**解决方法**：
1. 尝试使用自定义 Header 模式
2. 检查 Authelia 日志以确定使用的认证方式
3. 联系 Authelia 管理员获取正确的认证 header 配置

### 问题：如何获取 Authelia token

**方法**：
1. 在浏览器中登录 Authelia 保护的 Wallabag
2. 打开浏览器开发者工具（F12）
3. 切换到 "Network" 标签
4. 刷新页面
5. 查看请求的 headers，找到 Authelia 相关的 header
6. 复制 header 名称和值到扩展设置中

## 安全考虑

1. **Cookie 安全**：
   - Cookie 模式仅在 HTTPS 连接时工作
   - 浏览器会自动管理 cookie 的安全性

2. **自定义 Header**：
   - Header 值作为敏感信息存储在浏览器的本地存储中
   - 建议仅在必要时使用自定义 Header 模式
   - 不要与他人分享你的 Authelia token

3. **兼容性**：
   - 该功能不影响没有使用 Authelia 的用户
   - 向后兼容现有配置

## 贡献

如果你发现问题或有改进建议，请在 GitHub 上提交 issue 或 pull request。

## 许可证

遵循 Wallabagger 项目的原有许可证。
