import axios from 'axios';
import CarForm from '../../components/CarForm';
import { useRouter } from 'next/router';
import Link from 'next/link';

const NewCarPage = () => {
  const router = useRouter();

  const handleSubmit = async (formData) => {
    try {
      await axios.post('http://localhost:3000/cars', formData, { headers: { 'Access-Control-Allow-Origin': '*' }});
      router.push('/cars');
    } catch (error) {
      console.error('Error creating car:', error);
    }
  };

  return (
    <div>
      <h1>Add New Car</h1>
      <CarForm onSubmit={handleSubmit} />
      <Link href="/cars">Back to Cars</Link>
    </div>
  );
};

export default NewCarPage;