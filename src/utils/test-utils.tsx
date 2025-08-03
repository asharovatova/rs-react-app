import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import selectedItemsReducer from '../store/selectedItemsSlice';
import { ThemeProvider } from '../context/ThemeContext';

export const renderWithProviders = (
  ui: React.ReactElement,
  {
    preloadedState = {},
    route = '/',
    // theme = 'light',
    // ...renderOptions
  } = {}
) => {
  const store = configureStore({
    reducer: { selectedItems: selectedItemsReducer },
    preloadedState,
  });

  return {
    ...render(
      <ThemeProvider>
        <Provider store={store}>
          <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
        </Provider>
      </ThemeProvider>
    ),
    store,
  };
};
