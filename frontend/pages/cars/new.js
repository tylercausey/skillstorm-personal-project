import axios from 'axios';
import Header from '../../components/Header'
import CarForm from '../../components/CarForm';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from './NewCarPage.module.css';

const NewCarPage = () => {
  const router = useRouter();

  const handleSubmit = async (formData) => {
    const token = localStorage.getItem('token');
    if(!token) {
      router.push('/login');
    }
    else{
      try {
        await axios.post('http://localhost:3000/cars', formData, { 
          headers: { 
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}` 
          }
        });

        router.push('/cars');
      } catch (error) {
        console.error('Error creating car:', error);
      }
    }
    
  };

  return (
    <div className={styles.pageContainer}>
      <Header />
      <h1 className={styles.pageHeading}>Add New Car</h1>
      <CarForm onSubmit={handleSubmit} />
      <Link href="/cars" className={styles.backLink}>Back to Cars</Link>
    </div>
  );
};

export default NewCarPage;