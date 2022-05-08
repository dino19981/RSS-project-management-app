import ErrorBoundary from './components/errorBoundary/errorBoundary';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Boards from './components/Boards/Boards';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/boards" element={<Boards />}></Route>
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
