import { Avatar, Breadcrumbs, Link, Typography } from '@mui/material';
import React from 'react';
import styles from './Header.module.css';
import { useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const breadcrumbNameMap = {
    '/overview': 'Overview',
    '/overview/list': 'list',
  };
  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <p>Admin</p>
        <Avatar />
      </div>
      <div>
        <span className={styles.title}>팝업스토어 목록</span>
        <Breadcrumbs className={styles.breadcrumbs} aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
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
