import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { AppStoreProvider } from './store/store';
import { RouterProvider } from './router';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppStoreProvider>
      <RouterProvider>
        <App />
      </RouterProvider>
    </AppStoreProvider>
  </React.StrictMode>
);
