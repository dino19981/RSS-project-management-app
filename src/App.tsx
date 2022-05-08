import ErrorBoundary from './components/errorBoundary/errorBoundary';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Boards from './components/Boards/Boards';
import Board from './components/Boards/Board/Board';
import Column from './components/Columns/Column';
import Columns from './components/Columns/Columns';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/boards" element={<Boards />} />
            <Route path="/boards/:id" element={<Board />} />
            <Route path="/boards/:id/columns" element={<Columns />} />
            <Route path="/boards/:id/columns/:id" element={<Column />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
