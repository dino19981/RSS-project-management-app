import Loader from 'components/loader/loader';
import { AppRoute } from 'const/routes';
import AuthUser from 'hocs/AuthUser';
import UnknownUser from 'hocs/UnknownUser';
import MainLayout from 'layouts/MainLayout';
import React, { Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import EditUserProfile from 'views/editUserProfile/EditUserProfile';
import Board from 'views/pages/Board/Board';
import { Authorization } from 'views/pages/authentication/authorization/Authorization';
import { Registration } from 'views/pages/authentication/registration/Registration';
import { Boards } from 'views/pages/boards/Boards';
import NotFoundPage from 'views/pages/notFoundPage/NotFoundPage';
import MainPage from 'views/pages/welcome/WelcomePage';
import TaskEdit from 'views/taskEdit/TaskEdit';

function Routing() {
  return (
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
  );
}

export default Routing;
