import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ErrorBoundary from './components/errorBoundary/errorBoundary';
import Boards from './components/Boards/Boards';
import Board from './components/Boards/Board/Board';
import Column from './components/Columns/Column';
import Autorization from './views/autorization/Autorization';
import MainPage from './pages/mainPage/MainPage';
import { AppRoute } from './const/routes';
import Registration from './views/registration/Registration';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.MAIN} element={<MainLayout />}>
            <Route index element={<MainPage />} />
            <Route path={AppRoute.BOARDS} element={<Boards />} />
            <Route path={AppRoute.BOARD} element={<Board />} />
            <Route path={AppRoute.COLUMNS} element={<Board />} />
            <Route path={AppRoute.COLUMN} element={<Column />} />
            <Route path={AppRoute.REGISTRATION} element={<Registration />} />
            <Route path={AppRoute.LOGIN} element={<Autorization />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
