import MainPage from './pages/mainPage/MainPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute } from './config/const';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.MAIN} element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
