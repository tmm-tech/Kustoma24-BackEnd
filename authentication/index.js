const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { validateJwtTokenForeign } = require('./middlewares/validateauthentication');
const UserRoutes = require('./routes/UserRoutes');
const customerRoute = require('./routes/customerRoute');
const scheduleReport = require('./services/ReportService');
const app = express();
app.use(cors());
scheduleReport();
const addTokenToRequest = async(req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        try {
            const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
            req.token = decodedToken;
        } catch (error) {
            return res.status(401).json({ error: 'Invalid token.' });
        }
    }
    next();
};

// Add middleware to validate token and add it to the request object
app.use(addTokenToRequest);
// Redirect function for modifying the outgoing request
const redirect = function(proxyReq, req, res, options) {
    console.log("the body with token", req.headers)
    console.log("the body with token", req.body)
    let valid = validateJwtTokenForeign(proxyReq, req, res)
    if (valid === true) {
        if (req.body) {
            let bodyData = JSON.stringify(req.body);
            proxyReq.setHeader('Content-Type', 'application/json');
            proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
            proxyReq.write(bodyData);
        } else {
            proxyReq.setHeader('X-Forwarded-For', req.ip)
        }
    } else if (valid === 401) {
        res.status(401).json({ message: "Authorization header is missing" });
    } else {
        res.status(401).json({ message: valid })
    }
};

// Proxy middleware for product sales service
const productsProxy = createProxyMiddleware('/productsales', {
    target: 'http://localhost:4042',
    changeOrigin: true,
    onProxyReq: redirect
});

const backgroundProxy = createProxyMiddleware('/infoupdate', {
    target: 'http://localhost:4041',
    changeOrigin: true,
    onProxyReq: redirect
});

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
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