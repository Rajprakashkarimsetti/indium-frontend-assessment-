const jwt = require('jsonwebtoken');

const secretKey = 'your_secret_key'; // Change this to a secure key

module.exports = {
  generateToken: (user) => jwt.sign(user, secretKey, { expiresIn: '1h' }),
  verifyToken: (token) => jwt.verify(token, secretKey),
};
