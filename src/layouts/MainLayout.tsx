import Footer from '../views/footer/Footer';
import Header from '../views/header/Header';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch } from '../store';
import { getUserData } from '../utils/authentication';
import { setAuthorizeUser, setLoadingUserData, setUserData } from '../store/user';

export default function MainLayout() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      dispatch(setAuthorizeUser());
      (async () => {
        const userData = await getUserData(token);
        dispatch(setUserData(userData));
      })();
    } else {
      dispatch(setLoadingUserData(false));
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
