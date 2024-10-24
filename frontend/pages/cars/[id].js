import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Header from '../../components/Header'
import styles from './CarDetailsPage.module.css';
import Link from 'next/link';

const CarDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [car, setCar] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3000/cars/${id}`)
        .then(response => setCar(response.data))
        .catch(error => console.error('Error fetching car:', error));
    }
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/cars/${id}`);
      router.push('/cars');
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <Header />
      {car ? (
        <>
          <h1 className={styles.carHeading}>{`${car.make} ${car.model}`}</h1>
          <p className={styles.carDetails}> Year: {car.year}</p>
          <p className={styles.carDetails}>Color: {car.color}</p>
          <p className={styles.carDetails}>Price: {car.price}</p>
          <Link href={`/cars/${id}/edit`} className={styles.actionLink}>Edit</Link>
          <button onClick={handleDelete} className={styles.deleteButton}>Delete</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <Link href="/cars" className={styles.backLink}>Back to Cars</Link>
    </div>
  );
};

export default CarDetailsPage;