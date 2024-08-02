const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// In-memory user store
const users = [];

// Replace 'your_jwt_secret' with an environment variable
const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret';

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
        const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });

        // Exclude the password field from the response
        const { password: _, ...userWithoutPassword } = user;

        return {
          token,
          user: userWithoutPassword
        };
      } catch (error) {
        throw new Error(`Registration failed: ${error.message}`);
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
        const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });

        // Exclude the password field from the response
        const { password: _, ...userWithoutPassword } = user;

        return {
          token,
          user: userWithoutPassword
        };
      } catch (error) {
        throw new Error(`Login failed: ${error.message}`);
      }
    }
  }
};

const transactions = [];

const saveTransaction = (transaction) => {
  transactions.push(transaction);
  return transaction;
};

const getAllTransactions = () => {
  return transactions;
};

module.exports = {
  saveTransaction,
  getAllTransactions,
  authResolvers
};

