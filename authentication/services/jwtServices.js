const jwt = require('jsonwebtoken');
require('dotenv').config()
const secret = process.env.SECRET;

module.exports = {
    createToken: async(data) => {
        try {
            let token = await jwt.sign(data, secret, { expiresIn: '1h' });
            return token
        } catch (error) {
            console.log(error)
        }
    },
    verifyToken: async(token) => {
        return data = await jwt.verify(token, secret)
    }
}