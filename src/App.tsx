import MainPage from './pages/mainPage/MainPage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppRoute } from './const/routes';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import MainLayout from './layouts/MainLayout';
import ErrorBoundary from './components/errorBoundary/errorBoundary';
import NotFoundPage from './pages/mainPage/NotFoundPage';
import Boards from './layouts/Boards/Boards';
import Board from './layouts/Boards/Board/Board';
import Column from './layouts/Columns/Column';
import Task from './layouts/Task/Task';
import Authorization from './views/authorization/Authorization';
import Registration from './views/registration/Registration';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <DndProvider backend={HTML5Backend}>
          <Routes>
            <Route path={AppRoute.MAIN} element={<MainLayout />}>
              <Route index element={<MainPage />} />
              <Route path={AppRoute.BOARDS} element={<Boards />} />
              <Route path={AppRoute.BOARD} element={<Board />} />
              <Route path={AppRoute.COLUMNS} element={<Board />} />
              <Route path={AppRoute.COLUMN} element={<Column />} />
              <Route path={AppRoute.TASKS} element={<Column />} />
              <Route path={AppRoute.TASK} element={<Task />} />
              <Route path={AppRoute.REGISTRATION} element={<Registration />} />
              <Route path={AppRoute.LOGIN} element={<Authorization />} />
              <Route path={AppRoute.NOT_FOUND_PAGE} element={<NotFoundPage />} />
              <Route path="*" element={<Navigate replace to={AppRoute.NOT_FOUND_PAGE} />} />
            </Route>
          </Routes>
        </DndProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
