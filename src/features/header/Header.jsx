import { Avatar, Breadcrumbs, Typography } from '@mui/material';
import React from 'react';
import styles from './Header.module.css';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../slices/userSlice';
import { selectHeader } from '../../slices/headerSlice';

function Header() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const currUser = useSelector(selectUser);
  const header = useSelector(selectHeader);
  const breadcrumbNameMap = {
    '/overview': 'Overview',
    '/overview/list': 'list',
    '/overview/banner': 'banner',
    '/store': 'store',
    '/store/3': '팝업스토어 관리',
    '/store/write': 'write',
    '/store/1/reservations': 'reservations',
  };
  // const titleNameMap = {
  //   3: '팝업스토어 관리',
  //   reservations: '일일 예약 내역',
  // };
  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <p>{currUser.value.name}</p>
        <Avatar />
      </div>
      <div>
        <span className={styles.title}>{header.value}</span>
        <Breadcrumbs className={styles.breadcrumbs} aria-label="breadcrumb">
          {pathnames.map((value, index) => {
            const last = index === pathnames.length - 1;
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;
            return last ? (
              <Typography color="text.primary" key={to}>
                {breadcrumbNameMap[to]}
              </Typography>
            ) : (
              <Typography underline="hover" color="inherit" key={to}>
                {breadcrumbNameMap[to]}
              </Typography>
            );
          })}
        </Breadcrumbs>
      </div>
    </div>
  );
}

export default Header;
