const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// In-memory user store
const users = [];

const authResolvers = {
  Mutation: {
    register: async (_, { username, email, password }) => {
      try {
        // Check if user already exists
        const existingUser = users.find(user => user.username === username);
        if (existingUser) {
          throw new Error('User already exists');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create new user
        const user = { username, email, password: hashedPassword };
        users.push(user);

        // Generate token
        const token = jwt.sign({ username }, 'your_jwt_secret', { expiresIn: '1h' });

        return {
          token,
          user
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    login: async (_, { username, password }) => {
      try {
        // Find user
        const user = users.find(user => user.username === username);
        if (!user) {
          throw new Error('User not found');
        }

        // Check password
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
          throw new Error('Invalid password');
        }

        // Generate token
        const token = jwt.sign({ username }, 'your_jwt_secret', { expiresIn: '1h' });

        return {
          token,
          user
        };
      } catch (error) {
        throw new Error(error.message);
      }
    }
  }
};

module.exports = authResolvers;
