import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Error from './pages/Error';
import PopupList from './pages/PopupList';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainBanner from './pages/MainBanner';
import Order from './pages/Order';
import ReservationMain from './pages/ReservationMain';
import StoreCreate from './pages/StoreCreate';
import StoreEdit from './pages/StoreEdit';
import StoreView from './pages/StoreView';
import Login from './pages/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: '/overview/list',
        element: <PopupList />,
      },
      {
        path: '/overview/banner',
        element: <MainBanner />,
      },
      {
        path: '/store/:storeId/order',
        element: <Order />,
      },
      {
        path: '/store/:storeId/',
        element: <ReservationMain />,
      },
      {
        path: '/store/write',
        element: <StoreCreate />,
      },
      {
        path: '/store/:storeId/edit',
        element: <StoreEdit />,
      },
      {
        path: '/store/:storeId/detail',
        element: <StoreView />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
