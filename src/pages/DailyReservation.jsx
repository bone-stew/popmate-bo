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
import HelpIcon from '@mui/icons-material/Help';
import StatusButton from '../components/StatusButton';
import DatePickerComponent from '../components/CustomDatePicker';
import JsonAxios from '../api/jsonAxios';
import { formatToLocalTime, getCurrentDate } from '../app/dateTimeUtils';
import { useLocation } from 'react-router';

const TableCellCenter = ({ children }) => (
  <TableCell align="center" style={{ height: '50px' }}>
    {children}
  </TableCell>
);

const DailyReservation = () => {
  const location = useLocation();
  const popupStoreId = location.pathname.split('/').filter((x) => x)[1];

  const [dailyReservationData, _dailyReservationData] = useState([]);
  const [state, setState] = React.useState({
    completed: true,
  });
  const [selectedDate, _selectedDate] = useState(getCurrentDate());

  useEffect(() => {
    const apiUrl = `popup-stores/${popupStoreId}/reservations?date=${selectedDate}`;
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
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ flex: 1 }}>
                    <FormControlLabel
                      control={<Switch checked={state.completed} onChange={handleChange} name="completed" />}
                      label="입장완료 포함"
                      labelPlacement="start"
                    />
                  </div>
                  <div style={{ flex: 2 }}>
                    <DatePickerComponent selectedDate={selectedDate} onDateChange={_selectedDate} />
                  </div>
                  <div style={{ flex: 1, textAlign: 'end' }}>
                    <IconButton aria-label="더보기" size="small" edge="end">
                      <HelpIcon fontSize="small" />
                    </IconButton>
                  </div>
                </div>
              </TableCell>
            </TableRow>
            <TableRow style={{ backgroundColor: '#F2F4F6' }}>
              <TableCellCenter style={{ fontSize: '1.2rem', padding: '8px' }}>예약 시간</TableCellCenter>
              <TableCellCenter style={{ fontSize: '1.2rem', padding: '8px' }}>입장 시간</TableCellCenter>
              <TableCellCenter style={{ fontSize: '1.2rem', padding: '8px' }}>최대 예약 인원 수</TableCellCenter>
              <TableCellCenter style={{ fontSize: '1.2rem', padding: '8px' }}>예약한 인원 수</TableCellCenter>
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
