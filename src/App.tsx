import { Provider } from 'react-redux';
import './assets/styles/main.scss';
import { AppRouter } from './components/Router';
import { ThemeProvider } from './context/ThemeContext';
import { store } from './store/store';

export function App() {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </ThemeProvider>
  );
}
