import { useRouter } from 'next/router';
import axios from 'axios';
import LoginForm from '../components/LoginForm';
import styles from './LoginPage.module.css'

const LoginPage = () => {
  const router = useRouter();

  const handleLogin = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', credentials);
      localStorage.setItem('token', response.data.token); // Save JWT token
      router.push('/cars'); // Redirect to the cars page
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleRegisterRedirect = () => {
    router.push('/register'); // Navigate to the register page
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageHeading}>Login</h1>
      <LoginForm onSubmit={handleLogin} />
      <button className={styles.registerButton} onClick={handleRegisterRedirect}>
        New User? Register Here
      </button>
    </div>
  );
};

export default LoginPage;