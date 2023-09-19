import { useSelector } from 'react-redux';
import styles from './App.module.css';
import Login from './pages/Login';
import { selectUser } from './slices/userSlice';
// import { Outlet } from 'react-router-dom';
import Sidebar from './features/sideBar/Sidebar';
import Header from './features/header/Header';
// import StoreCreate from './pages/StoreCreate';
import StoreView from './pages/StoreView';
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
        <StoreView popupStoreId={95} />
      </div>
    </div>
  );
}

export default App;
