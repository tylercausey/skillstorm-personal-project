import axios from 'axios';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const CarsPage = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/cars', { headers: { 'Access-Control-Allow-Origin': '*' }})
      .then(response => setCars(response.data))
      .catch(error => console.error('Error fetching cars:', error));
  }, []);

  return (
    <div>
      <h1>Cars</h1>
      <Link href="/cars/new">Add New Car</Link>
      <ul>
        {cars.map(car => (
          <li key={car.car_id}>
            <Link href={`/cars/${car.car_id}`}>{`${car.make} ${car.model}`}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarsPage;