const { verifyToken } = require('../services/jwtServices');

// Middleware to validate JWT token for local users
function validateTokenUser(req, res, next) {
    const authHeader = req.header('x-auth-token');
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

    try {
        const decoded = verifyToken(token)
        req.userId = decoded.id;
        next();
    } catch (err) {
        res.status(400).json({ error: 'Invalid token.' });
    }
}

// Middleware to validate JWT token for foreign users
function validateJwtTokenForeign(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, process.env.FOREIGN_ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ error: 'Invalid token.' });
    }
}

module.exports = {
    validateTokenUser,
    validateJwtTokenForeign
};