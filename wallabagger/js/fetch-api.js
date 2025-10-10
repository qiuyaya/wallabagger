const FetchApi = function () {
    this.autheliaConfig = {
        enableCookies: false,
        headerName: null,
        headerValue: null
    };
};

FetchApi.prototype = {

    setAutheliaConfig: function (config) {
        if (config) {
            this.autheliaConfig = Object.assign({}, this.autheliaConfig, config);
        }
    },

    getRequestOptions: function (method, token, content) {
        let options = {
            method,
            headers: this.getHeaders(token),
            mode: 'cors',
            cache: 'default',
            credentials: this.autheliaConfig.enableCookies ? 'include' : 'omit'
        };
        if (content !== '') {
            options = Object.assign(options, { body: JSON.stringify(content) });
        }
        return options;
    },

    getHeaders: function (token) {
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        };
        if (token !== '') {
            headers.Authorization = `Bearer ${token}`;
        }
        // 添加 Authelia 自定义 header（如果配置了）
        if (this.autheliaConfig.headerName && this.autheliaConfig.headerValue) {
            headers[this.autheliaConfig.headerName] = this.autheliaConfig.headerValue;
        }
        return headers;
    },

    Patch: function (url, token, content) {
        return this.Fetch(url, 'PATCH', token, content);
    },

    Post: function (url, token, content) {
        return this.Fetch(url, 'POST', token, content);
    },

    Delete: function (url, token) {
        return this.Fetch(url, 'DELETE', token, '');
    },

    Get: function (url, token) {
        return this.Fetch(url, 'GET', token, '');
    },

    Fetch: function (url, method, token, content) {
        const options = this.getRequestOptions(method, token, content);
        return fetch(url, options).then(response => response.ok ? response.json() : response.json().then(err => Promise.reject(err)));
    }
};

export { FetchApi };
