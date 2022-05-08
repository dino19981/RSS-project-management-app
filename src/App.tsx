import MainPage from './pages/mainPage/MainPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoutes } from './config/const';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoutes.MAIN} element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
