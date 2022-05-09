import MainPage from './pages/mainPage/MainPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute } from './const/routes';
import MainLayout from './layouts/MainLayout';
import Boards from './components/Boards/Boards';
import Board from './components/Boards/Board/Board';
import Column from './components/Columns/Column';
import ErrorBoundary from './components/errorBoundary/errorBoundary';

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
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
