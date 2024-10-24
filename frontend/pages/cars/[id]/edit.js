import axios from 'axios';
import { useRouter } from 'next/router';
import Header from '../../../components/Header'
import { useEffect, useState } from 'react';
import CarForm from '../../../components/CarForm';
import Link from 'next/link';
import styles from './EditCarPage.module.css'

const EditCarPage = () => {
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

  const handleSubmit = async (formData) => {
    try {
      await axios.put(`http://localhost:3000/cars/${id}`, formData);
      router.push('/cars');
    } catch (error) {
      console.error('Error updating car:', error);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <Header />
      <h1 className={styles.pageHeading}>Edit Car</h1>
      {car ? <CarForm initialData={car} onSubmit={handleSubmit} /> : <p>Loading...</p>}
      <Link href="/cars" className={styles.backLink}>Back to Cars</Link>
    </div>
  );
};

export default EditCarPage;