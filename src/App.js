import { useDispatch, useSelector } from 'react-redux';
import styles from './App.module.css';
import { fetchUser, selectUser } from './slices/userSlice';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './features/sideBar/Sidebar';
import Header from './features/header/Header';
import { useEffect, useState } from 'react';
import StoreCreate from './pages/StoreCreate';
import StoreView from './pages/StoreView';

function App() {
  const drawerWidth = 240;
  const currUser = useSelector(selectUser);
  const [pageTitle, _pageTitle] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUser()).then((action) => {
      console.log(action);
      if (action.payload == null) {
        navigate('/login');
      }
    });
  }, [dispatch, navigate]);

  return currUser.value == null ? (
    <div></div>
  ) : (
    <div style={{ display: 'flex' }}>
      <Sidebar _pageTitle={_pageTitle} drawerWidth={drawerWidth} />
      <div className={styles.content}>
        <Header pageTitle={pageTitle} />
        <Outlet />
        {/* <StoreCreate /> */}
        <StoreView popupStoreId={112} />
      </div>
    </div>
  );
}

export default App;
