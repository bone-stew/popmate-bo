import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Drawer,
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
  ArrowRight,
  BarChart,
  EditNote,
  ImageOutlined,
  Logout,
  ManageSearch,
  ReportGmailerrorred,
  Storefront,
} from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { logout } from '../../slices/userSlice';
import { selectUser } from '../../slices/userSlice';
import { useSelector } from 'react-redux';
import { useNavigate, useParams, useLocation } from 'react-router';
import JsonAxios from '../../api/jsonAxios';

const sidebarMap = {
  list: 0,
  write: -1,
  report: -2,
  statistic: -3,
  banner: -4,
};
function Sidebar({ drawerWidth }) {
  const currUser = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { storeId } = useParams();

  const adminMenu = [
    { icon: <ManageSearch />, title: '팝업 스토어 관리', to: 'overview/list' },
    { icon: <EditNote />, title: '팝업 스토어 등록', to: 'popup-stores/write' },
    { icon: <ReportGmailerrorred />, title: '채팅 신고', to: 'overview/report' },
    { icon: <BarChart />, title: '통계', to: '/overview/statistic' },
    { icon: <ImageOutlined />, title: '배너 관리', to: 'overview/banner' },
  ];
  const [storeList, _storeList] = useState([]);
  const [selectedStore, _selectedStore] = useState();

  useEffect(() => {
    if (currUser.value.role === 'ROLE_MANAGER') {
      navigate('/overview/statistic');
    } else {
      JsonAxios.get('popup-stores/me').then((res) => {
        const list = res.data.data;
        _storeList(list);
        if (list.length > 0) navigate(`/popup-stores/${list[0].popupStoreId}`);
      });
    }
    if (storeId) {
      _selectedStore(storeId);
    } else {
      _selectedStore(sidebarMap[location.pathname.split('/').pop()]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <Typography sx={{ mt: '12px' }} className={`${styles.whiteFont} ${styles.padding}`}>
            Admin
          </Typography>
          <List>
            {adminMenu.map((value, index) => (
              <ListItem
                key={index}
                disablePadding
                style={
                  selectedStore === index * -1
                    ? { backgroundColor: 'white', borderRadius: '5px', color: '#233044' }
                    : { color: 'white' }
                }
              >
                <ListItemButton
                  onClick={() => {
                    _selectedStore(index * -1);
                    navigate(value.to);
                  }}
                >
                  {value.icon}
                  <ListItemText className={styles.padding} primary={value.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </>
      )}
      {currUser.value.role === 'ROLE_STAFF' && (
        <>
          <Typography sx={{ mt: '12px', mb: '12px' }} className={`${styles.whiteFont} ${styles.padding}`}>
            Store
          </Typography>
          {storeList.map((value) => (
            <Accordion
              sx={{
                color: 'white',
                background: 'none',
                boxShadow: 'none',
                '&:before': { height: 0 },
                '&.Mui-expanded': { margin: '0' },
              }}
              key={value.popupStoreId}
              onChange={(_, isExpanded) => {
                _selectedStore(isExpanded ? value.popupStoreId : false);
              }}
              expanded={selectedStore === value.popupStoreId}
            >
              <AccordionSummary
                sx={{
                  '&.Mui-expanded': {
                    backgroundColor: 'white',
                    minHeight: '0px',
                    borderRadius: '5px',
                    color: '#233044',
                  },
                  '.MuiAccordionSummary-content.Mui-expanded': { margin: '12px 0 ' },
                }}
              >
                <Storefront sx={{ color: 'inherit' }} />
                <Typography sx={{ paddingLeft: '10px' }}>{value.title}</Typography>
              </AccordionSummary>
              <AccordionDetails className={styles.accordionDetails}>
                <ListItem key={`/store/${value.popupStoreId}`} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      navigate(`/popup-stores/${value.popupStoreId}/detail`);
                    }}
                  >
                    <ArrowRight fontSize="small" />
                    <ListItemText primary="Detail" />
                  </ListItemButton>
                </ListItem>
                {value.reservationEnabled && (
                  <>
                    <ListItem key={`/store/${value.popupStoreId}`} disablePadding>
                      <ListItemButton
                        onClick={() => {
                          navigate(`/popup-stores/${value.popupStoreId}`);
                        }}
                      >
                        <ArrowRight fontSize="small" />
                        <ListItemText primary="Overview" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem key={`/store/${value.popupStoreId}/daily-reservations`} disablePadding>
                      <ListItemButton
                        onClick={() => {
                          navigate(`/popup-stores/${value.popupStoreId}/daily-reservations`);
                        }}
                      >
                        <ArrowRight fontSize="small" />
                        <ListItemText primary="일일 예약 관리" />
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
                        <ArrowRight fontSize="small" />
                        <ListItemText primary="주문 내역" />
                      </ListItemButton>
                    </ListItem>
                  </>
                )}
                {value.reservationEnabled && (
                  <ListItem key={`/popup-stores/${value.popupStoreId}/enter`} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/popup-stores/${value.popupStoreId}/enter`);
                      }}
                    >
                      <ArrowRight fontSize="small" />
                      <ListItemText primary="입장 QR" />
                    </ListItemButton>
                  </ListItem>
                )}
                {value.salesEnabled && (
                  <ListItem key={`${value.popupStoreId}/pickup`} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/popup-stores/${value.popupStoreId}/pickup`);
                      }}
                    >
                      <ArrowRight fontSize="small" />
                      <ListItemText primary="픽업 QR" />
                    </ListItemButton>
                  </ListItem>
                )}
              </AccordionDetails>
            </Accordion>
          ))}
        </>
      )}
      <Typography sx={{ mt: '16px' }} className={`${styles.whiteFont} ${styles.padding}`}>
        User
      </Typography>
      <ListItem sx={{ marginBottom: '600px' }} disablePadding>
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
