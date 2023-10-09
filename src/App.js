import { useDispatch, useSelector } from 'react-redux';
import styles from './App.module.css';
import { fetchUser, selectUser } from './slices/userSlice';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './features/sideBar/Sidebar';
import Header from './features/header/Header';
import { useEffect } from 'react';

function App() {
  const drawerWidth = 280;
  const currUser = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUser()).then((action) => {
      console.log(action.payload);
      if (action.payload == null) {
        navigate('/login');
      }
    });
  }, [dispatch, navigate]);

  return currUser.value == null ? (
    <div></div>
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
