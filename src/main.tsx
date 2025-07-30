import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';

const rootElement = document.createElement('div');
rootElement.id = 'root';
document.body.append(rootElement);

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ErrorBoundary fallback={<div>Could&apos;t load the app</div>}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
