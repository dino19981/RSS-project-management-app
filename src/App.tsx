import ErrorBoundary from './components/errorBoundary/errorBoundary';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Boards from './components/Boards/Boards';
import Board from './components/Boards/Board/Board';
import Column from './components/Columns/Column';
import Task from './components/Task/Task';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/boards" element={<Boards />} />
            <Route path="/boards/:boardId" element={<Board />} />
            <Route path="/boards/:boardId/columns" element={<Board />} />
            <Route path="/boards/:boardId/columns/:columnId" element={<Column />} />
            <Route path="/boards/:boardId/columns/:columnId/tasks" element={<Column />} />
            <Route path="/boards/:boardId/columns/:columnId/tasks/:taskId" element={<Task />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
