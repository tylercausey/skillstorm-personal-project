const request = require('supertest');
const app = require('./index'); 

jest.mock('./db', () => {
  const pool = {
    query: jest.fn(),
  };
  return pool;
});

const pool = require('./db');

describe('Car API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /cars', () => {
    it('should create a new car', async () => {
      const carData = { make: 'Toyota', model: 'Corolla', year: 2022, color: 'Red', price: 20000 };

      pool.query.mockResolvedValueOnce({ rows: [carData] });

      const response = await request(app).post('/cars').send(carData);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(carData);
    });
  });

  describe('GET /cars', () => {
    it('should fetch all cars', async () => {
      const cars = [
        { car_id: 1, make: 'Toyota', model: 'Corolla', year: 2022, color: 'Red', price: 20000 },
        { car_id: 2, make: 'Honda', model: 'Civic', year: 2021, color: 'Blue', price: 18000 },
      ];

      pool.query.mockResolvedValueOnce({ rows: cars });

      const response = await request(app).get('/cars');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(cars);
    });
  });

  describe('GET /cars/:id', () => {
    it('should fetch a car by ID', async () => {
      const car = { car_id: 1, make: 'Toyota', model: 'Corolla', year: 2022, color: 'Red', price: 20000 };

      pool.query.mockResolvedValueOnce({ rows: [car] });

      const response = await request(app).get('/cars/1');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(car);
    });

    it('should return 404 if car not found', async () => {
      pool.query.mockResolvedValueOnce({ rows: [] });

      const response = await request(app).get('/cars/999');
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ error: 'Car not found' });
    });
  });

  describe('PUT /cars/:id', () => {
    it('should update a car', async () => {
      const carData = { make: 'Toyota', model: 'Corolla', year: 2022, color: 'Red', price: 21000 };

      pool.query.mockResolvedValueOnce({ rows: [carData] });

      const response = await request(app).put('/cars/1').send(carData);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(carData);
    });

    it('should return 404 if car not found', async () => {
      pool.query.mockResolvedValueOnce({ rows: [] });

      const response = await request(app).put('/cars/999').send({ make: 'Toyota' });
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ error: 'Car not found' });
    });
  });

  describe('DELETE /cars/:id', () => {
    it('should delete a car', async () => {
      pool.query.mockResolvedValueOnce({ rows: [{ car_id: 1 }] });

      const response = await request(app).delete('/cars/1');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ message: 'Car deleted successfully' });
    });

    it('should return 404 if car not found', async () => {
      pool.query.mockResolvedValueOnce({ rows: [] });

      const response = await request(app).delete('/cars/999');
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ error: 'Car not found' });
    });
  });
});
