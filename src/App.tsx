import MainPage from './pages/mainPage/MainPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute } from './config/const';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.MAIN} element={<MainLayout />}>
          <Route path={AppRoute.MAIN} element={<MainPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
