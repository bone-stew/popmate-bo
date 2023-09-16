import { useSelector } from 'react-redux';
import styles from './App.module.css';
import Login from './pages/Login';
import { selectUser } from './slices/userSlice';
import { Outlet } from 'react-router-dom';
import Sidebar from './features/sideBar/Sidebar';
import Header from './features/header/Header';

function App() {
  const currUser = useSelector(selectUser);
  const isLoggedIn = currUser.value == null;
  const drawerWidth = 240;

  return isLoggedIn ? (
    <Login />
  ) : (
    <div style={{ display: 'flex' }}>
      <Sidebar drawerWidth={drawerWidth} />
      <div className={styles.content}>
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
