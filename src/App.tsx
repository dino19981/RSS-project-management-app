import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Registration from './views/registration/Registration';
import ErrorBoundary from './components/errorBoundary/errorBoundary';
import Boards from './components/Boards/Boards';
import Board from './components/Boards/Board/Board';
import Column from './components/Columns/Column';
import Autorization from './views/autorization/Autorization';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="signup" element={<Registration />} />
            <Route path="signin" element={<Autorization />} />
            <Route path="boards" element={<Boards />} />
            <Route path="boards/:boardId" element={<Board />} />
            <Route path="boards/:boardId/columns" element={<Board />} />
            <Route path="boards/:boardId/columns/:columnId" element={<Column />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
