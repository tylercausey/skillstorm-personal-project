import { useRouter } from 'next/router';
import axios from 'axios';
import RegisterForm from '../components/RegisterForm';
import styles from './RegisterPage.module.css'

const RegisterPage = () => {
  const router = useRouter();

  const handleRegister = async (formData) => {
    try {
      await axios.post('http://localhost:3000/auth/register', formData);
      alert('Registration successful! Please log in.');
      router.push('/login'); // Redirect to the login page
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
  };

  const handleLoginRedirect = () => {
    router.push('/login'); // Navigate to the login page
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageHeading}>Register</h1>
      <RegisterForm onSubmit={handleRegister} />
      <button className={styles.loginButton} onClick={handleLoginRedirect}>
        Already have an account? Login Here
      </button>
    </div>
  );
};

export default RegisterPage;