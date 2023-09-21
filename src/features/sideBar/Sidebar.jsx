import { Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styles from './Sidebar.module.css';
import { AddCircleOutline, Addchart, ImageOutlined, Logout, ManageSearch, Storefront } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { logout } from '../../slices/userSlice';
import { selectUser } from '../../slices/userSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import JsonAxios from '../../api/jsonAxios';
function Sidebar({ drawerWidth }) {
  const currUser = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const adminMenu = [
    { icon: <ImageOutlined className={styles.whiteFont} />, title: '배너 관리', to: 'overview/banner' },
    { icon: <ManageSearch className={styles.whiteFont} />, title: '팝업 스토어 관리', to: 'overview/list' },
    { icon: <Addchart className={styles.whiteFont} />, title: '통계' },
  ];
  const [storeList, _storeList] = useState([]);
  useEffect(() => {
    JsonAxios.get('popup-stores/me').then((res) => {
      console.log(res);
      _storeList(res.data.data);
    });
  }, []);
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#233044',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Typography className={`${styles.whiteFont} ${styles.title}`} variant="h5">
          Popmate
        </Typography>
      </Toolbar>
      {currUser.value.role === 'ROLE_MANAGER' && (
        <>
          <Typography className={`${styles.whiteFont} ${styles.padding}`}>Overview</Typography>
          <List>
            {adminMenu.map((value, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate(value.to);
                  }}
                >
                  {value.icon}
                  <ListItemText className={`${styles.whiteFont} ${styles.padding}`} primary={value.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </>
      )}
      <Typography className={`${styles.whiteFont} ${styles.padding}`}>
        Store
        {currUser.value.role === 'ROLE_MANAGER' && (
          <IconButton
            sx={{ verticalAlign: 'middle', color: '#ffffff' }}
            onClick={() => {
              navigate('/store/write', { replace: true });
            }}
          >
            <AddCircleOutline />
          </IconButton>
        )}
      </Typography>
      <List>
        {storeList.map((value, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate(`/store/${value.popupStoreId}`);
              }}
            >
              <Storefront className={styles.whiteFont} />
              <ListItemText className={`${styles.whiteFont} ${styles.padding}`} primary={value.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Typography className={`${styles.whiteFont} ${styles.padding}`}>User</Typography>
      <ListItem disablePadding>
        <ListItemButton
          onClick={() => {
            dispatch(logout());
          }}
        >
          <Logout className={styles.whiteFont} />
          <ListItemText className={`${styles.whiteFont} ${styles.padding}`} primary={'로그아웃'} />
        </ListItemButton>
      </ListItem>
    </Drawer>
  );
}

export default Sidebar;
