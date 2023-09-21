import { Avatar, Breadcrumbs, Link, Typography } from '@mui/material';
import React from 'react';
import styles from './Header.module.css';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../slices/userSlice';

function Header() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const currUser = useSelector(selectUser);
  const breadcrumbNameMap = {
    '/overview': 'Overview',
    '/overview/list': 'list',
    '/overview/banner': 'banner',
    '/store': 'store',
    '/store/3': '팝업스토어 관리',
    '/store/write': 'write',
    '/store/1/reservations': 'reservations',
  };
  const titleNameMap = {
    banner: '메인 배너 등록',
    list: '팝업스토어 목록',
    3: '팝업스토어 관리',
    write: '팝업스토어 등록',
    reservations: '일일 예약 내역',
  };
  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <p>{currUser.value.name}</p>
        <Avatar />
      </div>
      <div>
        <span className={styles.title}>{titleNameMap[pathnames[pathnames.length - 1]]}</span>
        <Breadcrumbs className={styles.breadcrumbs} aria-label="breadcrumb">
          {pathnames.map((value, index) => {
            const last = index === pathnames.length - 1;
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;
            return last ? (
              <Typography color="text.primary" key={to}>
                {breadcrumbNameMap[to]}
              </Typography>
            ) : (
              <Link underline="hover" color="inherit" href={to} key={to}>
                {breadcrumbNameMap[to]}
              </Link>
            );
          })}
        </Breadcrumbs>
      </div>
    </div>
  );
}

export default Header;
