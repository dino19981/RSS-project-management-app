import MainPage from './pages/mainPage/MainPage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppRoute } from './const/routes';
import MainLayout from './layouts/MainLayout';
import ErrorBoundary from './components/errorBoundary/errorBoundary';
import NotFoundPage from './pages/mainPage/NotFoundPage';
import Boards from './layouts/Boards/Boards';
import Board from './layouts/Boards/Board/Board';
import Authorization from './views/authorization/Authorization';
import Registration from './views/registration/Registration';
import TaskEdit from './layouts/Task/TaskEdit';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.MAIN} element={<MainLayout />}>
            <Route index element={<MainPage />} />
            <Route path={AppRoute.BOARDS} element={<Boards />} />
            <Route path={AppRoute.BOARD} element={<Board />} />
            <Route path={`${AppRoute.BOARD}/columns/:columnId/tasks/:taskId`} element={<Board />}>
              <Route index element={<TaskEdit />} />
            </Route>
            <Route path={AppRoute.REGISTRATION} element={<Registration />} />
            <Route path={AppRoute.LOGIN} element={<Authorization />} />
            <Route path={AppRoute.NOT_FOUND_PAGE} element={<NotFoundPage />} />
            <Route path="*" element={<Navigate replace to={AppRoute.NOT_FOUND_PAGE} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
