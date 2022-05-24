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
import AuthRequired from './hocs/AuthRequired';
import AuthNotRequired from './hocs/AuthNotRequired';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.MAIN} element={<MainLayout />}>
            <Route
              index
              element={
                <AuthNotRequired>
                  <MainPage />
                </AuthNotRequired>
              }
            />
            <Route
              path={AppRoute.BOARDS}
              element={
                <AuthRequired>
                  <Boards />
                </AuthRequired>
              }
            />
            <Route
              path={AppRoute.BOARD}
              element={
                <AuthRequired>
                  <Board />
                </AuthRequired>
              }
            />
            <Route
              path={`${AppRoute.BOARD}/columns/:columnId/tasks/:taskId`}
              element={
                <AuthRequired>
                  <Board />
                </AuthRequired>
              }
            >
              <Route
                index
                element={
                  <AuthRequired>
                    <TaskEdit />
                  </AuthRequired>
                }
              />
            </Route>
            <Route
              path={AppRoute.REGISTRATION}
              element={
                <AuthNotRequired>
                  <Registration />
                </AuthNotRequired>
              }
            />
            <Route
              path={AppRoute.LOGIN}
              element={
                <AuthNotRequired>
                  <Authorization />
                </AuthNotRequired>
              }
            />
            <Route path={AppRoute.NOT_FOUND_PAGE} element={<NotFoundPage />} />
            <Route path="*" element={<Navigate replace to={AppRoute.NOT_FOUND_PAGE} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
