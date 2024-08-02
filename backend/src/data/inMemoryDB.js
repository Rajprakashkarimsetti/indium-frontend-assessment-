const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// In-memory user store
const users = [];
const transactions = [];

// Replace 'your_jwt_secret' with an environment variable
const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret';

const authResolvers = {
  Mutation: {
    register: async (_, { username, email, password }) => {
      try {
        const existingUser = users.find(user => user.username === username);
        if (existingUser) {
          throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = { username, email, password: hashedPassword };
        users.push(user);

        const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
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
        const user = users.find(user => user.username === username);
        if (!user) {
          throw new Error('User not found');
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
          throw new Error('Invalid password');
        }

        const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
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

const saveTransaction = (transaction) => {
  transactions.push(transaction);
  return transaction;
};

const getAllTransactions = () => {
  return transactions;
};

const getTransactions = () => {
    return transactions;
};


module.exports = {
  saveTransaction,
  getAllTransactions,
  authResolvers,
  getTransactions
};
