import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from './Header.module.css';

const Header = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the JWT token from localStorage
    router.push('/login'); // Redirect the user to the login page
  };

  return (
    <header className={styles.header}>
      <nav>
        <Link href="/cars" className={styles.navLink}>Cars</Link>
        <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
      </nav>
    </header>
  );
};

export default Header;