// src/routes/authRoutes.test.js
const request = require('supertest');
const express = require('express');
const authRoutes = require('./authRoutes'); // Adjust the path as needed

// Mock the resolvers
jest.mock('../graphql/resolvers/authResolvers', () => ({
  login: jest.fn(),
  register: jest.fn()
}));

const { login, register } = require('../graphql/resolvers/authResolvers');

// Create a test app
const app = express();
app.use(express.json());
app.use('/auth', authRoutes);

describe('Auth Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /auth/login', () => {
    it('should return a token on successful login', async () => {
      // Mock resolver response
      login.mockResolvedValue({ token: 'mock_token' });

      const response = await request(app)
        .post('/auth/login')
        .send({ username: 'testuser', password: 'testpass' })
        .expect(200);

      expect(response.body).toEqual({ token: 'mock_token' });
      expect(login).toHaveBeenCalledWith(null, { username: 'testuser', password: 'testpass' });
    });

    it('should return an error message on failed login', async () => {
      // Mock resolver to throw an error
      login.mockRejectedValue(new Error('Login failed'));

      const response = await request(app)
        .post('/auth/login')
        .send({ username: 'testuser', password: 'testpass' })
        .expect(400);

      expect(response.text).toBe('Login failed');
    });
  });

  describe('POST /auth/register', () => {
    it('should return a success message on successful registration', async () => {
      // Mock resolver response
      register.mockResolvedValue({ message: 'Registration successful' });

      const response = await request(app)
        .post('/auth/register')
        .send({ username: 'testuser', password: 'testpass', email: 'testuser@example.com' })
        .expect(200);

      expect(response.body).toEqual({ message: 'Registration successful' });
      expect(register).toHaveBeenCalledWith(null, { username: 'testuser', password: 'testpass', email: 'testuser@example.com' });
    });

    it('should return an error message on failed registration', async () => {
      // Mock resolver to throw an error
      register.mockRejectedValue(new Error('Registration failed'));

      const response = await request(app)
        .post('/auth/register')
        .send({ username: 'testuser', password: 'testpass', email: 'testuser@example.com' })
        .expect(400);

      expect(response.text).toBe('Registration failed');
    });
  });
});
