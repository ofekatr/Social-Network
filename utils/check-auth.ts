const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');

const { JWT_KEY } = require('../config');

export { };

module.exports = (context) => {
    const authHeader: string = context.req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split('Bearer ')[1];
        if (token) {
            try {
                const user = jwt.verify(token, JWT_KEY);
                return user;
            } catch (err) {
                throw new AuthenticationError('Invalid or expired token.');
            }
        }
        throw new Error('Authentication token format must be \'Bearer <token>\'');
    }
    throw new Error('Authorization header was not provided.');
}