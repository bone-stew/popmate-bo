import React from 'react';
import {
  Container,
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
  Avatar,
  Divider,
} from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Box } from '@mui/system';

const TableCellCenter = ({ children }) => (
  <TableCell align="center" style={{ height: '30px' }}>
    {children}
  </TableCell>
);

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
      time: '10:00 ~ 10:15',
      capacity: 20,
      status: '진행 중',
    },
    {
      time: '10:15 ~ 10:30',
      capacity: 20,
      status: '완료',
    },
    {
      time: '10:15 ~ 10:30',
      capacity: 20,
      status: '완료',
    },
    {
      time: '10:15 ~ 10:30',
      capacity: 20,
      status: '완료',
    },
    {
      time: '10:15 ~ 10:30',
      capacity: 20,
      status: '완료',
    },
  ];

  // 주문 목록 데이터
  const orderData = [
    {
      orderNumber: 'ORD12345',
      customerName: '홍길동',
      pickupTime: '10:15',
      status: '접수 중',
    },
    {
      orderNumber: 'ORD12346',
      customerName: '김철수',
      pickupTime: '10:30',
      status: '완료',
    },
    {
      orderNumber: 'ORD12346',
      customerName: '김철수',
      pickupTime: '10:30',
      status: '완료',
    },
    {
      orderNumber: 'ORD12346',
      customerName: '김철수',
      pickupTime: '10:30',
      status: '완료',
    },
    {
      orderNumber: 'ORD12346',
      customerName: '김철수',
      pickupTime: '10:30',
      status: '완료',
    },
  ];

  return (
    <Container>
      <Box my={5}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ textAlign: 'left', marginTop: '100px', marginBottom: '50px' }}>
                <Typography variant="h4" gutterBottom>
                  팝업스토어 제목
                </Typography>
                <Typography variant="h7" gutterBottom>
                  OVERVIEW / POPUP STORE / 빵빵이의 생일 파티
                </Typography>
              </div>
            </div>
          </Grid>
          <Grid item xs={4}>
            <Box display="flex" alignItems="center" justifyContent="flex-end">
              <Avatar alt="프로필 사진" src="/path/to/profile.jpg" style={{ marginRight: '8px' }} />
              <Typography variant="subtitle1">사용자 이름</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '80px' }}>
        {/* 왼쪽 상단: "이 시각 예약 현황" */}
        <div style={{ minWidth: '300px' }}>
          <Typography variant="h7" gutterBottom>
            이 시각
          </Typography>
          <Typography variant="h4" gutterBottom>
            {reservationStatus.currentVisitStartTime} ~ {reservationStatus.currentVisitEndTime}
          </Typography>
          <Typography variant="h7" gutterBottom>
            예약 현황이예요
          </Typography>
        </div>

        {/* 오른쪽 상단: 카드 레이아웃 */}
        <Grid container spacing={2} style={{ textAlign: 'center' }}>
          <Grid container justifyContent="flex-end">
            <Grid item xs={10}>
              <Card style={{ height: '100px' }}>
                <CardContent
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}
                >
                  <div style={{ flex: '1' }}>
                    <Typography variant="h7" gutterBottom>
                      이 시각 입장할 인원 수
                    </Typography>
                    <Typography variant="h4">{reservationStatus.entering}</Typography>
                  </div>
                  <Divider orientation="vertical" flexItem />
                  <div style={{ flex: '1' }}>
                    <Typography variant="h7" gutterBottom>
                      대기 중인 인원 수
                    </Typography>
                    <Typography variant="h4">{reservationStatus.waiting}</Typography>
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
          <Typography variant="h6" gutterBottom style={{ marginBottom: '20px' }}>
            이 시각 이후 예약 인원을 관리하세요
          </Typography>
          <TableContainer
            style={{
              boxShadow: '0px 2px 4px 2px rgba(0, 0, 0, 0.1) , 0px -2px 4px -2px rgba(0, 0, 0, 0.1)',
              borderRadius: '15px',
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell align="right">
                    <HelpIcon fontSize="small" />
                  </TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: '#F2F4F6' }}>
                  <TableCellCenter>시간</TableCellCenter>
                  <TableCellCenter>예약 받을 인원 수</TableCellCenter>
                  <TableCellCenter>예약 상태</TableCellCenter>
                </TableRow>
              </TableHead>
              <TableBody>
                {reservationData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCellCenter>{item.time}</TableCellCenter>
                    <TableCellCenter>{item.capacity}</TableCellCenter>
                    <TableCellCenter>{item.status}</TableCellCenter>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        {/* 하단 오른쪽: 주문 목록 확인 */}
        <div style={{ flex: 1 }}>
          <Typography variant="h6" gutterBottom style={{ marginBottom: '20px' }}>
            오늘의 주문 목록을 확인하세요
          </Typography>
          <TableContainer
            style={{
              boxShadow: '0px 2px 4px 2px rgba(0, 0, 0, 0.1) , 0px -2px 4px -2px rgba(0, 0, 0, 0.1)',
              borderRadius: '15px',
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell align="right">
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
                    <TableCellCenter>{item.status}</TableCellCenter>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </Container>
  );
};

export default ReservationMain;
