import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { OwnerStoreProvider } from './store/ownerStore';
import { RouterProvider } from './router';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <OwnerStoreProvider>
      <RouterProvider>
        <App />
      </RouterProvider>
    </OwnerStoreProvider>
  </React.StrictMode>
);
