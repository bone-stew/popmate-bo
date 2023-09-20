import React, { useEffect, useState } from 'react';
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  TableContainer,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import StatusButton from '../components/StatusButton';
import DatePickerComponent from '../components/CustomDatePicker';
import JsonAxios from '../api/jsonAxios';
import { formatToLocalTime } from '../app/dateTimeUtils';

const TableCellCenter = ({ children }) => (
  <TableCell align="center" style={{ height: '50px' }}>
    {children}
  </TableCell>
);

const DailyReservation = () => {
  const [dailyReservationData, _dailyReservationData] = useState([]);
  const [state, setState] = React.useState({
    completed: true,
  });
  const [selectedDate, _selectedDate] = useState('2023-09-22');

  useEffect(() => {
    const apiUrl = `popup-stores/1/reservations?date=${selectedDate}`;
    JsonAxios.get(apiUrl)
      .then((response) => {
        _dailyReservationData(response.data.data);
      })
      .catch((error) => {
        console.error('API 호출 중 오류 발생:', error);
      });
  }, [selectedDate]);

  const handleChange = (event) => {
    setState((prevState) => ({
      ...prevState,
      completed: !prevState.completed,
    }));
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table align="center">
          <TableHead>
            <TableRow>
              <TableCell colSpan={6}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
                  <div>
                    <FormControlLabel
                      control={<Switch checked={state.completed} onChange={handleChange} name="completed" />}
                      label="진행완료 여부"
                      labelPlacement="start"
                    />
                  </div>
                  <DatePickerComponent selectedDate={selectedDate} onDateChange={_selectedDate} />
                </div>
              </TableCell>
            </TableRow>
            <TableRow style={{ backgroundColor: '#F2F4F6' }}>
              <TableCellCenter style={{ fontSize: '1.2rem', padding: '8px' }}>예약 시간</TableCellCenter>
              <TableCellCenter style={{ fontSize: '1.2rem', padding: '8px' }}>입장 시간</TableCellCenter>
              <TableCellCenter style={{ fontSize: '1.2rem', padding: '8px' }}>예약 받을 인원 수</TableCellCenter>
              <TableCellCenter style={{ fontSize: '1.2rem', padding: '8px' }}>예약 인원 수</TableCellCenter>
              <TableCellCenter style={{ fontSize: '1.2rem', padding: '8px' }}>상태</TableCellCenter>
              <TableCellCenter style={{ fontSize: '1.2rem', padding: '8px' }}>수정여부</TableCellCenter>
            </TableRow>
          </TableHead>
          <TableBody>
            {dailyReservationData.map((item, index) => (
              <TableRow key={index}>
                <TableCellCenter>
                  {formatToLocalTime(item.startTime)} ~ {formatToLocalTime(item.endTime)}
                </TableCellCenter>
                <TableCellCenter>
                  {formatToLocalTime(item.visitStartTime)} ~ {formatToLocalTime(item.visitEndTime)}
                </TableCellCenter>
                <TableCellCenter>{item.guestLimit}</TableCellCenter>
                <TableCellCenter>{item.currentGuestCount}</TableCellCenter>
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
    </>
  );
};

export default DailyReservation;
