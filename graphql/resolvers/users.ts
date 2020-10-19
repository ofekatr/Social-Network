const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const { JWT_KEY } = require('../../config');
const User = require('../../models/User');
const { validateRegisterInput, validateLoginInput } = require('../../utils/validators/login');

export { }

function generateJwtToken(user) {
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username
    }, JWT_KEY, { expiresIn: '1h' });
}

module.exports = {
    Mutation: {
        async login(_, {
            loginInput: { username, password }
        }) {
            const { errors, valid } = validateLoginInput(username, password)
            if (!valid) {
                throw new UserInputError('Username or password are invalid.', { errors });
            }
            try {
                const user = await User.findOne({ username });
                if (!user) {
                    errors.notFound = 'User does not exist.';
                    throw new UserInputError('User does not exist.', { errors });
                }
                const match = await bcrypt.compare(password, user.password);
                if (!match) {
                    errors.incorrect = 'Username or password are incorrect.';
                    throw new UserInputError('Username or password are incorrect.', { errors });
                }
                const token = generateJwtToken(user);
                return {
                    ...user._doc,
                    id: user._id,
                    token
                };
            } catch (err) {
                throw err;
            }
        },

        async register(_, {
            registerInput: { username, email, password, confirmPassword }
        },
        ) {
            // Validate user data
            const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword);
            if (!valid) {
                throw new UserInputError('Invalid inputs.', { errors });
            }
            // Make sure user doesn't already exist
            try {
                const user = await User.findOne({ username })
                if (user) {
                    errors.username = 'Username is taken.';
                    throw new UserInputError('Username is server.', { errors });
                }
                // Hash the password and create an auth token
                password = await bcrypt.hash(password, 12);
        
                const newUser = new User({
                    email,
                    username,
                    password,
                    createdDate: new Date().toISOString()
                });
                const res = await newUser.save();
                const token = generateJwtToken(res);
        
                return {
                    ...res._doc,
                    id: res._id,
                    token,
                };
            }
            
            catch (err) {
                throw err;
            }
    
        }
    }
}