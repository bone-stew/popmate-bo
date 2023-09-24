import React, { useEffect, useState } from 'react';
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Divider,
  IconButton,
} from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import FilterListIcon from '@mui/icons-material/FilterList';
import StatusButton from '../components/StatusButton';
import MoreButton from '../components/MoreButton';
import JsonAxios from '../api/jsonAxios';
import { addMinutesToLocalDateTime, formatToLocalTime, formatToLocalTimeFromLocalDateTime } from '../app/dateTimeUtils';
import { useLocation, useNavigate } from 'react-router';

const TableCellCenter = ({ children }) => (
  <TableCell align="center" style={{ height: '30px' }}>
    {children}
  </TableCell>
);

const cardStyle = {
  boxShadow:
    '0px 2px 4px 2px rgba(0, 0, 0, 0.05) , 0px -2px 4px -2px rgba(0, 0, 0, 0.05), 0px 0px 10px 5px rgba(0, 0, 0, 0.05)',
  height: '120px',
  borderRadius: '10px',
};

const ReservationMain = () => {
  const location = useLocation();

  const [popupStoreId, _popupStoreId] = useState(location.pathname.split('/').filter((x) => x)[1]);
  const [todayReservations, _todayReservations] = useState([]);
  const [sortOrderOption, _sortOrderOption] = useState('pickupTime');
  const [todayOrders, _todayOrders] = useState([]);
  const [currentReservation, _currentReservation] = useState([]);

  const navigate = useNavigate();
  console.log(_popupStoreId);

  useEffect(() => {
    const apiUrl = `popup-stores/${popupStoreId}/reservations/today`;
    JsonAxios.get(apiUrl)
      .then((response) => {
        _currentReservation(response.data.data);
        _todayReservations(response.data.data.upComingReservations);
      })
      .catch((error) => {
        console.error('API 호출 중 오류 발생:', error);
      });
  }, [popupStoreId]);

  useEffect(() => {
    const apiUrl = `popup-stores/${popupStoreId}/orders/today?sort=${sortOrderOption}`;

    JsonAxios.get(apiUrl)
      .then((response) => {
        _todayOrders(response.data.data);
      })
      .catch((error) => {
        console.error('API 호출 중 오류 발생:', error);
      });
  }, [popupStoreId, sortOrderOption]);

  const handleSortClick = (option) => {
    _sortOrderOption(option);
  };

  const handleReservationMoreButtonClick = () => {
    navigate(`/popup-stores/${popupStoreId}/reservations`);
  };

  const handleOrderMoreButtonClick = () => {
    navigate(`/popup-stores/${popupStoreId}/orders`);
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '60px' }}>
        {/* 왼쪽 상단: "이 시각 예약 현황" */}
        <div style={{ minWidth: '300px', marginTop: '10px' }}>
          <Typography variant="h7">{currentReservation.isEntering ? '이 시각' : '지난'}</Typography>
          <Typography variant="h4" style={{ marginBottom: '10px', marginTop: '10px' }}>
            {formatToLocalTime(currentReservation.currentReservationStartTime)} ~{' '}
            {formatToLocalTime(currentReservation.currentReservationEndTime)}
          </Typography>
          <Typography variant="h7" gutterBottom>
            예약 현황이예요
          </Typography>
        </div>
        {/* 오른쪽 상단: 카드 레이아웃 */}
        <Grid container style={{ textAlign: 'center' }}>
          <Grid container justifyContent="flex-end">
            <Grid item xs={10}>
              <Card style={cardStyle}>
                <CardContent style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '75%' }}>
                  <div style={{ flex: '1' }}>
                    <Typography variant="h7" gutterBottom>
                      이 시각 입장할 인원 수
                    </Typography>
                    <Typography variant="h4" style={{ marginTop: '10px' }}>
                      {currentReservation.reservedGuestCount}
                    </Typography>
                  </div>
                  <Divider orientation="vertical" flexItem />
                  <div style={{ flex: '1' }}>
                    <Typography variant="h7" gutterBottom>
                      대기 중인 인원 수
                    </Typography>
                    <Typography variant="h4" style={{ marginTop: '10px' }}>
                      {currentReservation.entryGuestCount}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </div>

      {/* 하단 왼쪽: 예약 인원 관리 */}
      <div style={{ display: 'flex' }}>
        {/* 왼쪽 요소 */}
        <div style={{ flex: 1, marginRight: '50px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <Typography variant="h6" style={{ fontWeight: 'bold' }}>
              이 시각 이후 예약 인원을 관리하세요
            </Typography>
            <MoreButton handler={handleReservationMoreButtonClick} />
          </div>
          <TableContainer
            style={{
              boxShadow: '0px 2px 4px 2px rgba(0, 0, 0, 0.1) , 0px -2px 4px -2px rgba(0, 0, 0, 0.1)',
              borderRadius: '15px',
              maxHeight: '500px',
              overflowY: 'auto',
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell colSpan={3} align="right">
                    <IconButton aria-label="더보기" size="small" edge="end">
                      <HelpIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: '#F2F4F6' }}>
                  <TableCellCenter>시간</TableCellCenter>
                  <TableCellCenter>예약한 인원 수</TableCellCenter>
                  <TableCellCenter>입장/예약 상태</TableCellCenter>
                </TableRow>
              </TableHead>
              <TableBody>
                {todayReservations.map((item, index) => (
                  <TableRow key={index}>
                    <TableCellCenter>
                      {formatToLocalTime(item.visitStartTime)} ~ {formatToLocalTime(item.visitEndTime)}
                    </TableCellCenter>
                    <TableCellCenter>{item.currentGuestCount}</TableCellCenter>
                    <TableCellCenter>
                      <StatusButton status={item.status} label={item.status} />
                    </TableCellCenter>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        {/* 하단 오른쪽: 주문 목록 확인 */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <Typography variant="h6" style={{ fontWeight: 'bold' }}>
              오늘의 주문 목록을 확인하세요
            </Typography>
            <MoreButton handler={handleOrderMoreButtonClick} />
          </div>
          <TableContainer
            style={{
              boxShadow: '0px 2px 4px 2px rgba(0, 0, 0, 0.1) , 0px -2px 4px -2px rgba(0, 0, 0, 0.1)',
              borderRadius: '15px',
              maxHeight: '500px',
              overflowY: 'auto',
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell colSpan={4} align="right">
                    {sortOrderOption === 'pickupTime' ? (
                      <div>
                        픽업시간 순
                        <IconButton
                          aria-label="더보기"
                          size="small"
                          edge="end"
                          onClick={() =>
                            handleSortClick(sortOrderOption === 'pickupTime' ? 'orderStatus' : 'pickupTime')
                          }
                        >
                          <FilterListIcon fontSize="small" />
                        </IconButton>
                      </div>
                    ) : (
                      <div>
                        주문상태 순
                        <IconButton
                          aria-label="더보기"
                          size="small"
                          edge="end"
                          onClick={() =>
                            handleSortClick(sortOrderOption === 'pickupTime' ? 'orderStatus' : 'pickupTime')
                          }
                        >
                          <FilterListIcon fontSize="small" />
                        </IconButton>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: '#F2F4F6' }}>
                  <TableCellCenter>주문 번호</TableCellCenter>
                  <TableCellCenter>고객 이름</TableCellCenter>
                  <TableCellCenter>픽업 시간</TableCellCenter>
                  <TableCellCenter>주문 상태</TableCellCenter>
                </TableRow>
              </TableHead>
              <TableBody>
                {todayOrders.map((item, index) => (
                  <TableRow key={index}>
                    <TableCellCenter>{item.orderNumber}</TableCellCenter>
                    <TableCellCenter>{item.userName}</TableCellCenter>
                    <TableCellCenter>
                      {formatToLocalTimeFromLocalDateTime(addMinutesToLocalDateTime(item.pickupTime, 10))}
                    </TableCellCenter>
                    <TableCellCenter>
                      <StatusButton status={item.orderStatus} label={item.orderStatus} />
                    </TableCellCenter>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};

export default ReservationMain;
