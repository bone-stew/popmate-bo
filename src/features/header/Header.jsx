import { Avatar, Breadcrumbs, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styles from './Header.module.css';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../slices/userSlice';
import JsonAxios from '../../api/jsonAxios';

function Header() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const { storeId } = useParams('storeId');
  const currUser = useSelector(selectUser);
  const [title, _title] = useState();
  const breadcrumbNameMap = {
    overview: 'overview',
    list: 'list',
    banner: 'banner',
    'popup-stores': 'store',
    write: 'write',
    reservations: 'reservations',
    detail: '상세',
    'daily-reservations': '일일 예약 내역',
    enter: '입장 QR 코드',
    pickup: '픽업 QR 코드',
    orders: '주문내역',
    report: '채팅 신고',
  };
  useEffect(() => {
    if (storeId) {
      JsonAxios.get(`/popup-stores/${storeId}`).then((res) => {
        _title(res.data.data.title);
        console.log('===========호출=========');
      });
    }
  }, [storeId]);

  useEffect(() => {
    if (pathnames[pathnames.length - 1] === 'list') _title('팝업 스토어 목록');
    if (pathnames[pathnames.length - 1] === 'banner') _title('배너 등록');
    if (pathnames[pathnames.length - 1] === 'report') _title('신고 내역');
  }, [pathnames]);

  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <p>
          {currUser.value.name} {currUser.value.role === 'ROLE_MANAGER' ? '매니저님' : '스태프님'}
        </p>
        <Avatar />
      </div>
      <div>
        <span className={styles.title}>{title}</span>
        <Breadcrumbs className={styles.breadcrumbs} aria-label="breadcrumb">
          {pathnames.map((value, index) => {
            const last = index === pathnames.length - 1;
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;
            return last ? (
              <Typography color="text.primary" key={to}>
                {isNaN(value) ? breadcrumbNameMap[value] : title}
              </Typography>
            ) : (
              <Typography underline="hover" color="inherit" key={to}>
                {isNaN(value) ? breadcrumbNameMap[value] : title}
              </Typography>
            );
          })}
        </Breadcrumbs>
      </div>
    </div>
  );
}

export default Header;
