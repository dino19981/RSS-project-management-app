import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <>
      <Header />
      <main className="main">
        <div className="container">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
}
