const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { validateJwtTokenForeign } = require('./middlewares/validateauthentication');
const UserRoutes = require('./routes/UserRoutes');
const customerRoute = require('./routes/customerRoute');

const app = express();
app.use(express.json());
app.use(cors());
// Redirect function for modifying the outgoing request
const redirect = (proxyReq, req, res, options) => {
    if (req.body) {
        const body_data = JSON.stringify(req.body);
        proxyReq.setHeader('Content-Type', 'application/json');
        proxyReq.setHeader('Content-Length', Buffer.byteLength(body_data));
        proxyReq.write(body_data);
    } else {
        proxyReq.setHeader('X-Forwarded-For', req.connection.remoteAddress);
    }
};

// Proxy middleware for product sales service
const productsProxy = createProxyMiddleware('/product_sales', {
    target: 'http://localhost:4042',
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
        validateJwtTokenForeign(req, res, () => {
            redirect(proxyReq, req, res);
        });
    },
});

// Proxy middleware for background services
const backgroundProxy = createProxyMiddleware('/infoupdate', {
    target: 'http://localhost:4041',
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
        validateJwtTokenForeign(req, res, () => {
            redirect(proxyReq, req, res);
        });
    },
});

// Routes
app.use('/users', UserRoutes);
app.use('/customer', customerRoute);

app.get('/', async(req, res) => {
    res.json({ message: "Confirmed Connection to Kustoma24" });
    res.send('');
});

// Set up the server to use the proxy middlewares
app.use(productsProxy);
app.use(backgroundProxy);


// Connection to the server
const port = process.env.PORT || 4080;
app.listen(port, () => {
    console.log(`Authentication Server Listening on port: ${port}`);
});