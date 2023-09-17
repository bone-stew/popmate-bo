import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  TextField,
} from '@mui/material';
import {
  Edit as EditIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import StatusButton from '../components/StatusButton';

const TableCellCenter = ({ children }) => <TableCell align="center">{children}</TableCell>;

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
      reservationTime: '09:30 ~ 09:45',
      visitTime: '10:00 ~ 10 : 15',
      totalCapacity: 20,
      reservedCapacity: 15,
      status: '진행완료',
    },
    {
      reservationTime: '09:45 ~ 10 : 00',
      visitTime: '10:15 ~ 10:30',
      totalCapacity: 20,
      reservedCapacity: 12,
      status: '진행완료',
    },
    {
      reservationTime: '10:00 ~ 10 : 15',
      visitTime: '10:30 ~ 10:45',
      totalCapacity: 20,
      reservedCapacity: 18,
      status: '입장 중',
    },
    {
      reservationTime: '10:15 ~ 10:30',
      visitTime: '10:45 ~ 11:00',
      totalCapacity: 20,
      reservedCapacity: 10,
      status: '진행취소',
    },
  ];

  return (
    <Container>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ textAlign: 'left' }}>
          <Typography variant="h4" gutterBottom>
            팝업스토어 제목
          </Typography>
          <Typography variant="h5" gutterBottom>
            일일 예약 내역
          </Typography>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <div>
          <IconButton onClick={handlePrevDate}>
            <ChevronLeftIcon />
          </IconButton>
          <TextField
            label="날짜"
            type="date"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <IconButton onClick={handleNextDate}>
            <ChevronRightIcon />
          </IconButton>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table align="center">
          <TableHead>
            <TableRow>
              <TableCellCenter>예약 시간</TableCellCenter>
              <TableCellCenter>입장 시간</TableCellCenter>
              <TableCellCenter>예약 받을 인원 수</TableCellCenter>
              <TableCellCenter>예약 인원 수</TableCellCenter>
              <TableCellCenter>상태</TableCellCenter>
              <TableCellCenter>작업</TableCellCenter>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCellCenter>{item.reservationTime}</TableCellCenter>
                <TableCellCenter>{item.visitTime}</TableCellCenter>
                <TableCellCenter>{item.totalCapacity}</TableCellCenter>
                <TableCellCenter>{item.reservedCapacity}</TableCellCenter>
                <TableCellCenter>
                  {item.status === '진행완료' && <StatusButton status="진행완료" label="진행완료" />}
                  {item.status === '입장 중' && <StatusButton status="입장 중" label="입장 중" />}
                  {item.status === '진행취소' && <StatusButton status="진행취소" label="진행취소" />}
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
