import React from 'react';
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
} from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import FilterListIcon from '@mui/icons-material/FilterList';
import StatusButton from '../components/StatusButton';
import MoreButton from '../components/MoreButton';

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
  // 예약 현황 데이터
  const reservationStatus = {
    currentVisitStartTime: '10:00',
    currentVisitEndTime: '10:15',
    entering: 44,
    waiting: 6,
  };

  // 예약 인원 데이터
  const reservationData = [
    {
      visitStartTime: '10:00',
      visitEndTime: '10:15',
      capacity: 20,
      status: '입장 중',
    },
    {
      visitStartTime: '10:15',
      visitEndTime: '10:30',
      capacity: 20,
      status: '예약완료',
    },
    {
      visitStartTime: '10:30',
      visitEndTime: '10:45',
      capacity: 20,
      status: '예약 중',
    },
    {
      visitStartTime: '10:45',
      visitEndTime: '11:00',
      capacity: 20,
      status: '예약 대기',
    },
    {
      visitStartTime: '11:30',
      visitEndTime: '11:45',
      capacity: 20,
      status: '예약 대기',
    },
    {
      visitStartTime: '11:30',
      visitEndTime: '11:45',
      capacity: 20,
      status: '예약 대기',
    },
  ];

  // 주문 목록 데이터
  const orderData = [
    {
      orderNumber: 'ORD12345',
      customerName: '홍길동',
      pickupTime: '10:15',
      status: '수령완료',
    },
    {
      orderNumber: 'ORD12346',
      customerName: '김철수',
      pickupTime: '10:30',
      status: '수령대기',
    },
    {
      orderNumber: 'ORD12346',
      customerName: '김철수',
      pickupTime: '10:30',
      status: '수령대기',
    },
    {
      orderNumber: 'ORD12346',
      customerName: '김철수',
      pickupTime: '10:30',
      status: '주문취소',
    },
    {
      orderNumber: 'ORD12346',
      customerName: '김철수',
      pickupTime: '10:30',
      status: '수령대기',
    },
    {
      orderNumber: 'ORD12346',
      customerName: '김철수',
      pickupTime: '10:30',
      status: '수령대기',
    },
    {
      orderNumber: 'ORD12346',
      customerName: '김철수',
      pickupTime: '10:30',
      status: '수령대기',
    },
  ];

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '60px' }}>
        {/* 왼쪽 상단: "이 시각 예약 현황" */}
        <div style={{ minWidth: '300px', marginTop: '10px' }}>
          <Typography variant="h7">이 시각</Typography>
          <Typography variant="h4" style={{ marginBottom: '10px', marginTop: '10px' }}>
            {reservationStatus.currentVisitStartTime} ~ {reservationStatus.currentVisitEndTime}
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
                      {reservationStatus.entering}
                    </Typography>
                  </div>
                  <Divider orientation="vertical" flexItem />
                  <div style={{ flex: '1' }}>
                    <Typography variant="h7" gutterBottom>
                      대기 중인 인원 수
                    </Typography>
                    <Typography variant="h4" style={{ marginTop: '10px' }}>
                      {reservationStatus.waiting}
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
            <MoreButton />
          </div>
          <TableContainer
            style={{
              boxShadow: '0px 2px 4px 2px rgba(0, 0, 0, 0.1) , 0px -2px 4px -2px rgba(0, 0, 0, 0.1)',
              borderRadius: '15px',
              maxHeight: '500px', // 원하는 최대 높이로 조정
              overflowY: 'auto', // 세로 스크롤을 추가하기 위한 설정
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell colSpan={3} align="right">
                    <HelpIcon fontSize="small" />
                  </TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: '#F2F4F6' }}>
                  <TableCellCenter>시간</TableCellCenter>
                  <TableCellCenter>예약 받을 인원 수</TableCellCenter>
                  <TableCellCenter>입장/예약 상태</TableCellCenter>
                </TableRow>
              </TableHead>
              <TableBody>
                {reservationData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCellCenter>
                      {item.visitStartTime} ~ {item.visitEndTime}
                    </TableCellCenter>
                    <TableCellCenter>{item.capacity}</TableCellCenter>
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
            <MoreButton />
          </div>
          <TableContainer
            style={{
              boxShadow: '0px 2px 4px 2px rgba(0, 0, 0, 0.1) , 0px -2px 4px -2px rgba(0, 0, 0, 0.1)',
              borderRadius: '15px',
              maxHeight: '500px', // 원하는 최대 높이로 조정
              overflowY: 'auto', // 세로 스크롤을 추가하기 위한 설정
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell colSpan={4} align="right">
                    <FilterListIcon fontSize="small" />
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
                {orderData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCellCenter>{item.orderNumber}</TableCellCenter>
                    <TableCellCenter>{item.customerName}</TableCellCenter>
                    <TableCellCenter>{item.pickupTime}</TableCellCenter>
                    <TableCellCenter>
                      <StatusButton status={item.status} label={item.status} />
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
