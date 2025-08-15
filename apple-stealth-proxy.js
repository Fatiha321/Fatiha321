// apple-stealth-proxy.js
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const targets = [
    'https://gs.apple.com',
    'https://init.icloud.com',
    'https://albert.apple.com',
    'https://setup.icloud.com'
];

targets.forEach((target, index) => {
    app.use(`/apple${index}`, createProxyMiddleware({
        target,
        changeOrigin: true,
        secure: true,
        onProxyReq: (proxyReq) => {
            proxyReq.setHeader('User-Agent', 'Apple-iPhone/18.5');
        }
    }));
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Stealth Apple CDN Proxy is running...');
});
