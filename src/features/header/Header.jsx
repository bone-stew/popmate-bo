import { Avatar, Breadcrumbs, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styles from './Header.module.css';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../slices/userSlice';
import { blue } from '@mui/material/colors';
import JsonAxios from '../../api/jsonAxios';

const breadcrumbNameMap = {
  overview: 'overview',
  list: 'list',
  banner: 'banner',
  'popup-stores': '스토어',
  write: 'write',
  reservations: '예약 내역',
  detail: '상세',
  'daily-reservations': '일일 예약 내역',
  enter: '입장 QR 코드',
  pickup: '픽업 QR 코드',
  orders: '주문내역',
  report: '채팅 신고',
  statistic: '통계',
};

const headerMap = {
  list: '팝업 스토어 목록',
  banner: '배너 등록',
  report: '신고 내역',
  statistic: '통계',
  write: '팝업스토어 등록',
};

function Header() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => isNaN(x));
  const { storeId } = useParams();
  const currUser = useSelector(selectUser);
  const [title, _title] = useState();

  useEffect(() => {
    if (storeId) {
      JsonAxios.get(`/popup-stores/${storeId}`).then((res) => {
        _title(res.data.data.title);
      });
    } else {
      const path = pathnames[pathnames.length - 1];
      _title(headerMap[path]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <p>{currUser.value.name}님</p>
        {currUser.value.role === 'ROLE_MANAGER' ? (
          <Avatar sx={{ bgcolor: blue[500] }}>AM</Avatar>
        ) : (
          <Avatar sx={{ bgcolor: blue[500] }}>ST</Avatar>
        )}
      </div>
      <div>
        <span className={styles.title}>{title}</span>
        <Breadcrumbs className={styles.breadcrumbs} aria-label="breadcrumb">
          {pathnames.map((value, index) => {
            const last = index === pathnames.length - 1;
            return (
              <Typography underline="hover" color={last ? 'text.primary' : 'inherit'} key={index}>
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
