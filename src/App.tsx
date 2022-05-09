import MainPage from './pages/mainPage/MainPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute } from './config/navigation';
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
            <Route path={AppRoute.MAIN} element={<MainPage />} />
            <Route path="/boards" element={<Boards />} />
            <Route path="/boards/:boardId" element={<Board />} />
            <Route path="/boards/:boardId/columns" element={<Board />} />
            <Route path="/boards/:boardId/columns/:columnId" element={<Column />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
