import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import styles from './Sidebar.module.css';
import {
  AddCircleOutline,
  // Addchart,
  EventNote,
  ImageOutlined,
  Logout,
  ManageSearch,
  QrCode,
  ReceiptLong,
  Storefront,
  ViewCarouselOutlined,
} from '@mui/icons-material';
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
    // { icon: <Addchart className={styles.whiteFont} />, title: '통계' },
  ];
  const [storeList, _storeList] = useState([]);
  const [selectedStore, _selectedStore] = useState();
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
            sx={{ verticalAlign: 'middle', color: 'white' }}
            onClick={() => {
              navigate('/popup-stores/write', { replace: true });
            }}
          >
            <AddCircleOutline />
          </IconButton>
        )}
      </Typography>
      {storeList.map((value) => (
        <Accordion
          sx={{
            color: 'white',
            background: 'none',
            boxShadow: 'none',
            '&:before': { height: 0 },
            '&.Mui-expanded': { margin: 0 },
          }}
          key={value.popupStoreId}
          onChange={(event, isExpanded) => {
            _selectedStore(isExpanded ? value.popupStoreId : false);
            // console.log(event);
            navigate(`/popup-stores/${value.popupStoreId}/detail`);
          }}
          expanded={selectedStore === value.popupStoreId}
        >
          <AccordionSummary
            sx={{
              '&.Mui-expanded': { minHeight: '0px' },
              '.MuiAccordionSummary-content.Mui-expanded': { margin: '12px 0 0 0' },
            }}
          >
            <Storefront className={styles.whiteFont} />
            <Typography sx={{ paddingLeft: '10px' }}>{value.title}</Typography>
          </AccordionSummary>
          <AccordionDetails className={styles.accordionDetails}>
            <ListItem key={`/store/${value.popupStoreId}`} disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate(`/popup-stores/${value.popupStoreId}`);
                }}
              >
                <ViewCarouselOutlined className={styles.whiteFont} />
                <ListItemText className={`${styles.whiteFont} ${styles.padding}`} primary="Overview" />
              </ListItemButton>
            </ListItem>
            {value.reservationEnabled && (
              <>
                <ListItem key={`/store/${value.popupStoreId}/daily-reservations`} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      navigate(`/popup-stores/${value.popupStoreId}/daily-reservations`);
                    }}
                  >
                    <EventNote className={styles.whiteFont} />
                    <ListItemText className={`${styles.whiteFont} ${styles.padding}`} primary="일일 예약 관리" />
                  </ListItemButton>
                </ListItem>
                <ListItem key={`/popup-stores/${value.popupStoreId}/enter`} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      navigate(`/popup-stores/${value.popupStoreId}/enter`);
                    }}
                  >
                    <QrCode className={styles.whiteFont} />
                    <ListItemText className={`${styles.whiteFont} ${styles.padding}`} primary="입장 QR" />
                  </ListItemButton>
                </ListItem>
              </>
            )}
            {value.salesEnabled && (
              <>
                <ListItem key={`${value.popupStoreId}/orders`} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      navigate(`/popup-stores/${value.popupStoreId}/orders`);
                    }}
                  >
                    <ReceiptLong className={styles.whiteFont} />
                    <ListItemText className={`${styles.whiteFont} ${styles.padding}`} primary="주문 내역" />
                  </ListItemButton>
                </ListItem>
                <ListItem key={`${value.popupStoreId}/pickup`} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      navigate(`/popup-stores/${value.popupStoreId}/pickup`);
                    }}
                  >
                    <QrCode className={styles.whiteFont} />
                    <ListItemText className={`${styles.whiteFont} ${styles.padding}`} primary="픽업 QR" />
                  </ListItemButton>
                </ListItem>
              </>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
      <Typography className={`${styles.whiteFont} ${styles.padding}`}>User</Typography>
      <ListItem sx={{ marginBottom: '300px' }} disablePadding>
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
