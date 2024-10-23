const express = require('express');
const pool = require('./db');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); 
app.use(express.json()); 

// Routes

// Create a new car
app.post('/cars', async (req, res) => {
  try {
    const { make, model, year, color, price } = req.body;
    const newCar = await pool.query(
      'INSERT INTO cars (make, model, year, color, price) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [make, model, year, color, price]
    );
    res.json(newCar.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all cars
app.get('/cars', async (req, res) => {
  try {
    const allCars = await pool.query('SELECT * FROM cars');
    res.json(allCars.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get a car by ID
app.get('/cars/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const car = await pool.query('SELECT * FROM cars WHERE car_id = $1', [id]);

    if (car.rows.length === 0) {
      return res.status(404).json({ error: 'Car not found' });
    }

    res.json(car.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update a car
app.put('/cars/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { make, model, year, color, price } = req.body;
    const updateCar = await pool.query(
      'UPDATE cars SET make = $1, model = $2, year = $3, color = $4, price = $5 WHERE car_id = $6 RETURNING *',
      [make, model, year, color, price, id]
    );

    if (updateCar.rows.length === 0) {
      return res.status(404).json({ error: 'Car not found' });
    }

    res.json(updateCar.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete a car
app.delete('/cars/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCar = await pool.query(
      'DELETE FROM cars WHERE car_id = $1 RETURNING *',
      [id]
    );

    if (deleteCar.rows.length === 0) {
      return res.status(404).json({ error: 'Car not found' });
    }

    res.json({ message: 'Car deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Only start the server if this script is run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
