import { Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography } from '@mui/material';
import React from 'react';
import styles from './Sidebar.module.css';
import { AddCircleOutline, Addchart, ImageOutlined, Logout, ManageSearch, Storefront } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { logout } from '../../slices/userSlice';
import { selectUser } from '../../slices/userSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
function Sidebar({ drawerWidth }) {
  const currUser = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const adminMenu = [
    { icon: <ImageOutlined className={styles.whiteFont} />, title: '배너 관리', to: 'overview/banner' },
    { icon: <ManageSearch className={styles.whiteFont} />, title: '팝업 스토어 관리', to: 'overview/list' },
    { icon: <Addchart className={styles.whiteFont} />, title: '통계' },
  ];
  const tempStoreList = [{ title: '빵빵이의 생일파티', to: '/store/3' }];
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
        <AddCircleOutline
          sx={{ verticalAlign: 'middle', paddingLeft: '12px' }}
          onClick={() => {
            navigate('/store/write', { replace: true });
          }}
        />
      </Typography>
      <List>
        {tempStoreList.map((value, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate(value.to);
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
