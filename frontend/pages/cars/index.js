import axios from 'axios';
import Header from '../../components/Header'
import styles from './CarsPage.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const CarsPage = () => {
  const [cars, setCars] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token) {
      router.push('/login');
    }
    else{
      axios.get('http://localhost:3000/cars', { 
        headers: { 
          'Access-Control-Allow-Origin': '*',
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => setCars(response.data))
      .catch(error => console.error('Error fetching cars:', error)); 
    }
    
  }, []);

  return (
    <div className={styles.pageContainer}>
      <Header />
      <h1 className={styles.pageHeading}>Cars</h1>
      <Link href="/cars/new" className={styles.addCarLink}>Add New Car</Link>
      <ul className={styles.carsList}>
        {cars.map(car => (
          <li key={car.car_id} className={styles.carItem}>
            <Link href={`/cars/${car.car_id}`}  className={styles.carLink}>{`${car.make} ${car.model}`} </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarsPage;