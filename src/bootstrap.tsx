import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppProviders } from './AppProviders';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { DashboardPage } from './pages/dashboard/Dashboard';
import { LoginPage } from './pages/login/LoginPage';
import reportWebVitals from './reportWebVitals';
import './styles/index.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoute component={DashboardPage} />
  },
  {
    path: '/login',
    element: <LoginPage />
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
