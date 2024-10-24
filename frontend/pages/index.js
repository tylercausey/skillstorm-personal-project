import Link from 'next/link';
import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageHeading}>Welcome to the Car Management System!</h1>
      <Link href="/login" className={styles.actionLink}>Login</Link>
      <Link href="/register" className={styles.actionLink}>Register</Link>
    </div>

  );
};

export default HomePage;