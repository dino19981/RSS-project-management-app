import ErrorBoundary from '../components/errorBoundary/errorBoundary';
import './styles/sass/main.scss';
import { StoreProvider } from './providers/StoreProvider';
import './i18n';
import Routing from 'pages';

function App() {
  return (
    <ErrorBoundary>
      <StoreProvider>
        <Routing />
      </StoreProvider>
    </ErrorBoundary>
  );
}

export default App;
