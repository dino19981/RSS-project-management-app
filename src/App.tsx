import MainPage from './views/pages/welcome/WelcomePage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppRoute } from './const/routes';
import MainLayout from './layouts/MainLayout';
import ErrorBoundary from './components/errorBoundary/errorBoundary';
import NotFoundPage from './views/pages/notFoundPage/NotFoundPage';
import Boards from './views/pages/boards/Boards';
import Board from './views/pages/board/Board';
import Authorization from './views/pages/authentification/authorization/Authorization';
import Registration from './views/pages/authentification/registration/Registration';
import TaskEdit from './views/task/TaskEdit';
import AuthUser from './hocs/AuthUser';
import UnknownUser from './hocs/UnknownUser';
import EditUserProfile from './views/editUserProfile/EditUserProfile';
import { Suspense } from 'react';
import Loader from './components/loader/loader';

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loader />}>
        <BrowserRouter>
          <Routes>
            <Route path={AppRoute.MAIN} element={<MainLayout />}>
              <Route
                index
                element={
                  <AuthUser redirectTo={AppRoute.WELCOME_PAGE}>
                    <Boards />
                  </AuthUser>
                }
              />
              <Route path={AppRoute.WELCOME_PAGE} element={<MainPage />} />
              <Route
                path={AppRoute.BOARD}
                element={
                  <AuthUser>
                    <Board />
                  </AuthUser>
                }
              />
              <Route
                path={`${AppRoute.BOARD}/columns/:columnId/tasks/:taskId`}
                element={
                  <AuthUser>
                    <Board />
                  </AuthUser>
                }
              >
                <Route
                  index
                  element={
                    <AuthUser>
                      <TaskEdit />
                    </AuthUser>
                  }
                />
              </Route>
              <Route
                path={AppRoute.REGISTRATION}
                element={
                  <UnknownUser redirectTo={AppRoute.MAIN}>
                    <Registration />
                  </UnknownUser>
                }
              />
              <Route
                path={AppRoute.LOGIN}
                element={
                  <UnknownUser redirectTo={AppRoute.MAIN}>
                    <Authorization />
                  </UnknownUser>
                }
              />
              <Route
                path={AppRoute.EDIT_PROFILE}
                element={
                  <AuthUser>
                    <EditUserProfile />
                  </AuthUser>
                }
              />
              <Route path={AppRoute.NOT_FOUND_PAGE} element={<NotFoundPage />} />
              <Route path="*" element={<Navigate replace to={AppRoute.NOT_FOUND_PAGE} />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
