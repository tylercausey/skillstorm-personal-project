import Link from 'next/link';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Car Management System!</h1>
      <Link href="/cars">View Cars</Link>
    </div>
  );
};

export default HomePage;