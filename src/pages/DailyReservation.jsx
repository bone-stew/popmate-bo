import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Box,
  Grid,
  Avatar,
  TableContainer,
} from '@mui/material';
import {
  Edit as EditIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import StatusButton from '../components/StatusButton';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const TableCellCenter = ({ children }) => (
  <TableCell align="center" style={{ height: '50px' }}>
    {children}
  </TableCell>
);

const DailyReservation = () => {
  const [selectedDate, setSelectedDate] = useState('');

  const handlePrevDate = () => {
    // TODO: 이전 날짜 로직
  };

  const handleNextDate = () => {
    // TODO: 다음 날짜 로직
  };

  // TODO: 서버에서 받아온 데이터로 대체
  const data = [
    {
      reservationStartTime: '09:30',
      reservationEndTime: '09:45',
      visitStartTime: '10:00',
      visitEndTime: '10:15',
      totalCapacity: 20,
      reservedCapacity: 15,
      status: '진행완료',
    },
    {
      reservationStartTime: '09:45',
      reservationEndTime: '10:00',
      visitStartTime: '10:15',
      visitEndTime: '10:30',
      totalCapacity: 20,
      reservedCapacity: 12,
      status: '진행완료',
    },
    {
      reservationStartTime: '10:00',
      reservationEndTime: '10:15',
      visitStartTime: '10:30',
      visitEndTime: '10:45',
      totalCapacity: 20,
      reservedCapacity: 18,
      status: '입장 중',
    },
    {
      reservationStartTime: '10:15',
      reservationEndTime: '10:30',
      visitStartTime: '10:45',
      visitEndTime: '11:00',
      totalCapacity: 20,
      reservedCapacity: 10,
      status: '진행취소',
    },
  ];

  return (
    <Container>
      <Box my={3}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ textAlign: 'left', marginTop: '80px' }}>
                <Typography variant="h4" gutterBottom>
                  팝업스토어 제목
                </Typography>
                <Typography variant="h5" gutterBottom>
                  일일 예약 내역
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
      <div>
        <IconButton onClick={handlePrevDate}>
          <ChevronLeftIcon />
        </IconButton>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker />
        </LocalizationProvider>
        <IconButton onClick={handleNextDate}>
          <ChevronRightIcon />
        </IconButton>
      </div>
      <TableContainer component={Paper}>
        <Table align="center">
          <TableHead>
            <TableRow style={{ backgroundColor: '#F2F4F6' }}>
              <TableCellCenter style={{ fontSize: '1.2rem', padding: '8px' }}>예약 시간</TableCellCenter>
              <TableCellCenter style={{ fontSize: '1.2rem', padding: '8px' }}>입장 시간</TableCellCenter>
              <TableCellCenter style={{ fontSize: '1.2rem', padding: '8px' }}>예약 받을 인원 수</TableCellCenter>
              <TableCellCenter style={{ fontSize: '1.2rem', padding: '8px' }}>예약 인원 수</TableCellCenter>
              <TableCellCenter style={{ fontSize: '1.2rem', padding: '8px' }}>상태</TableCellCenter>
              <TableCellCenter style={{ fontSize: '1.2rem', padding: '8px' }}>상태</TableCellCenter>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCellCenter>
                  {item.reservationStartTime} ~ {item.reservationEndTime}
                </TableCellCenter>
                <TableCellCenter>
                  {item.visitStartTime} ~ {item.visitEndTime}
                </TableCellCenter>
                <TableCellCenter>{item.totalCapacity}</TableCellCenter>
                <TableCellCenter>{item.reservedCapacity}</TableCellCenter>
                <TableCellCenter>
                  <StatusButton status={item.status} label={item.status} />
                </TableCellCenter>
                <TableCellCenter>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                </TableCellCenter>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default DailyReservation;
