import { useSelector } from 'react-redux';
import styles from './App.module.css';
import { selectUser } from './slices/userSlice';
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from './features/sideBar/Sidebar';
import Header from './features/header/Header';
import { useState } from 'react';

function App() {
  const currUser = useSelector(selectUser);
  const drawerWidth = 240;

  const [pageTitle, _pageTitle] = useState();
  return currUser.value == null ? (
    <Navigate to="/login" replace={true} />
  ) : (
    <div style={{ display: 'flex' }}>
      <Sidebar _pageTitle={_pageTitle} drawerWidth={drawerWidth} />
      <div className={styles.content}>
        <Header pageTitle={pageTitle} />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
