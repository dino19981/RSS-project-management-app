import Footer from '../views/footer/Footer';
import Header from '../views/header/Header';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch } from '../store/hooks';
import { getUserData } from '../utils/authentification';
import { setUserData } from '../store/user/actions';

export default function MainLayout() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      (async () => {
        const userData = await getUserData(token);
        dispatch(setUserData(userData));
      })();
    }
  }, []);

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
