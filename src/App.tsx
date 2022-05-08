import ErrorBoundary from './components/errorBoundary/errorBoundary';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Boards from './components/Boards/Boards';
import Board from './components/Boards/Board/Board';
import Column from './components/Column/Column';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/boards" element={<Boards />}></Route>
            <Route path="/boards/:id" element={<Board />}></Route>
            <Route path="/boards/:id/columns/:id" element={<Column />}></Route>
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
