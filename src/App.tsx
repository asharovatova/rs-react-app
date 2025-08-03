import './assets/styles/main.module.scss';
import { AppRouter } from './components/Router';
import { ThemeProvider } from './context/ThemeContext';

export function App() {
  return (
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  );
}
