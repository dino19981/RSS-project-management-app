import Footer from './components/footer/Footer';
import Header from '../views/header/Header';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch } from '../store';
import { setAuthorizeUser, setLoadingUserData, setUserData } from '../store/user';
import { getUserData } from 'shared/api/requests/user';

export default function MainLayout() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      dispatch(setAuthorizeUser());
      (async () => {
        try {
          const userData = await getUserData(token);

          dispatch(setUserData({ ...userData, authorizeStatus: true }));
        } catch {
          dispatch(setLoadingUserData(false));
        }
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
