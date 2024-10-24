const request = require('supertest');
const app = require('./index'); 

jest.mock('./db', () => {
  const pool = {
    query: jest.fn(),
  };
  return pool;
});

const pool = require('./db');

describe('Auth API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /auth/register', () => {
    it('should register a new user', async () => {
      const userData = { username: 'testuser', email: 'test@example.com', password: 'password123' };
      const newUser = {
        user_id: 1,
        username: 'testuser',
        email: 'test@example.com',
        password_hash: 'hashedpassword123',
      };

      pool.query.mockResolvedValueOnce({ rows: [newUser] });

      const response = await request(app).post('/auth/register').send(userData);
      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual(newUser);
    });

    it('should return 500 if registration fails', async () => {
      const userData = { username: 'testuser', email: 'test@example.com', password: 'password123' };

      pool.query.mockRejectedValueOnce(new Error('Database error'));

      const response = await request(app).post('/auth/register').send(userData);
      expect(response.statusCode).toBe(500);
      expect(response.text).toBe('Server error');
    });
  });

  describe('POST /auth/login', () => {
    it('should log in a user and return a token', async () => {
      const loginData = { username: 'testuser', password: 'password123' };
      const user = {
        user_id: 1,
        username: 'testuser',
        email: 'test@example.com',
        password_hash: 'hashedpassword123',
      };

      pool.query.mockResolvedValueOnce({ rows: [user] });

      const bcrypt = require('bcrypt');
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true);

      const jwt = require('jsonwebtoken');
      const token = 'test-jwt-token';
      jest.spyOn(jwt, 'sign').mockReturnValueOnce(token);

      const response = await request(app).post('/auth/login').send(loginData);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ token });
    });

    it('should return 401 if username is not found', async () => {
      const loginData = { username: 'unknownuser', password: 'password123' };

      pool.query.mockResolvedValueOnce({ rows: [] });

      const response = await request(app).post('/auth/login').send(loginData);
      expect(response.statusCode).toBe(401);
      expect(response.body).toEqual({ error: 'Invalid credentials' });
    });

    it('should return 401 if password is incorrect', async () => {
      const loginData = { username: 'testuser', password: 'wrongpassword' };
      const user = {
        user_id: 1,
        username: 'testuser',
        email: 'test@example.com',
        password_hash: 'hashedpassword123',
      };

      pool.query.mockResolvedValueOnce({ rows: [user] });

      const bcrypt = require('bcrypt');
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false);

      const response = await request(app).post('/auth/login').send(loginData);
      expect(response.statusCode).toBe(401);
      expect(response.body).toEqual({ error: 'Invalid credentials' });
    });

    it('should return 500 if login fails due to a server error', async () => {
      const loginData = { username: 'testuser', password: 'password123' };

      pool.query.mockRejectedValueOnce(new Error('Database error'));

      const response = await request(app).post('/auth/login').send(loginData);
      expect(response.statusCode).toBe(500);
      expect(response.text).toBe('Server error');
    });
  });
});