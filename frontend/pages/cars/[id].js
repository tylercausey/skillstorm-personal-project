import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
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
    <div>
      {car ? (
        <>
          <h1>{`${car.make} ${car.model}`}</h1>
          <p>Year: {car.year}</p>
          <p>Color: {car.color}</p>
          <p>Price: {car.price}</p>
          <Link href={`/cars/${id}/edit`}>Edit</Link>
          <button onClick={handleDelete}>Delete</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <Link href="/cars">Back to Cars</Link>
    </div>
  );
};

export default CarDetailsPage;