const { verifyToken } = require('../services/jwtServices');

// Middleware to validate JWT token for local users
function validateTokenUser(req, res, next) {
    if (!req.headers.authorization) {
        res.status(401).json({ message: "Authorization header is missing" });
        return 401
    } else {
        const token = req.headers.authorization.split(" ")[1];
        try {
            const decodedToken = validateToken(token);
            decodedToken.message ? res.status(401).json({ message: decodedToken.message }) : next()
        } catch (error) {
            res.status(403).json(error.message)
        }
    }
}

// Middleware to validate JWT token for foreign usersrsrs
function validateJwtTokenForeign(req, res, next) {
    console.log("hellllllllllllo", req.a)
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    console.log('object', token)
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