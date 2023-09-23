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
import OrderQR from './pages/OrderQR';
import DailyReservation from './pages/DailyReservation';

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
        path: '/popup-stores/:storeId/orders',
        element: <Order />,
      },
      {
        path: '/popup-stores/:storeId',
        element: <ReservationMain />,
      },
      {
        path: '/popup-stores/write',
        element: <StoreCreate />,
      },
      {
        path: '/popup-stores/:storeId/edit',
        element: <StoreEdit />,
      },
      {
        path: '/popup-stores/:storeId/detail',
        element: <StoreView />,
      },
      {
        path: '/popup-stores/:storeId/daily-reservations',
        element: <DailyReservation />,
      },
      {
        path: '/popup-stores/:storeId/pickup',
        element: <OrderQR />,
      },
      {
        path: '/popup-stores/:storeId/enter',
        element: <OrderQR />,
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
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
