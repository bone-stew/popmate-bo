import { Edit as EditIcon } from '@mui/icons-material';
import HelpIcon from '@mui/icons-material/Help';
import {
  FormControlLabel,
  IconButton,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { formatToLocalTime, getCurrentDate } from '../../app/dateTimeUtils';
import JsonAxios from '../../api/jsonAxios';
import DatePickerComponent from '../../components/CustomDatePicker';
import StatusButton from '../../components/StatusButton';
import CustomDialog from '../dialog/CustomDialog';

const TableCellCenter = ({ children }) => (
  <TableCell align="center" style={{ height: '50px' }}>
    {children}
  </TableCell>
);

function DailyReservationTable() {
  const location = useLocation();
  const navigate = useNavigate();

  const popupStoreId = location.pathname.split('/').filter((x) => x)[1];
  const [dailyReservationData, _dailyReservationData] = useState([]);
  const [state, _state] = React.useState({ includeEntered: true });
  const [selectedDate, _selectedDate] = useState(getCurrentDate());
  const [editableGuestLimit, _editableGuestLimit] = useState(0);
  const [editDialogOpen, _editDialogOpen] = useState(false);
  const [selectedItem, _selectedItem] = useState(null);

  useEffect(() => {
    const apiUrl = `popup-stores/${popupStoreId}/reservations?date=${selectedDate}`;
    JsonAxios.get(apiUrl)
      .then((response) => {
        _dailyReservationData(response.data.data);
      })
      .catch((error) => {
        console.error('API 호출 중 오류 발생:', error);
      });
  }, [selectedDate, popupStoreId]);

  const handleChange = (event) => {
    _state((prevState) => ({
      ...prevState,
      includeEntered: !prevState.includeEntered,
    }));
  };

  const handleEditClick = (guestLimit, item) => {
    if (item.status !== '입장 완료') {
      _editableGuestLimit(guestLimit);
      _selectedItem(item);
      _editDialogOpen(true);
    }
  };

  const handleEditComplete = (editedValue) => {
    if (selectedItem && selectedItem.status !== '입장 완료') {
      selectedItem.guestLimit = parseInt(editableGuestLimit);
      _dailyReservationData([...dailyReservationData]);
      _editableGuestLimit(0);
      _editDialogOpen(false);

      const apiUrl = `reservations/${selectedItem.reservationId}/guest-limit`;
      JsonAxios.patch(apiUrl, { guestLimit: editedValue })
        .then((response) => {
          if (response.data.code === 'SUCCESS') {
            console.log('업데이트되었습니다.');
            if (editedValue !== editableGuestLimit) {
              const updatedData = dailyReservationData.map((item) =>
                item.reservationId === selectedItem.reservationId
                  ? {
                      ...item,
                      guestLimit: editedValue,
                    }
                  : item,
              );
              _dailyReservationData(updatedData);
            }
            _editDialogOpen(false);
            _editableGuestLimit(0); // 수정값 초기화
          } else {
            console.error('업데이트 실패');
          }
        })
        .catch((error) => {
          console.error('API 호출 중 오류 발생:', error);
        });
    }
  };

  const handleTableRowClick = (reservationId) => {
    const detailPageURL = `/reservations/${reservationId}/detail`;
    navigate(detailPageURL);
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
                      control={<Switch checked={state.includeEntered} onChange={handleChange} name="completed" />}
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
            </TableRow>
          </TableHead>
          <TableBody>
            {dailyReservationData.map((item, index) => {
              if (!state.includeEntered && item.status === '입장 완료') {
                return null;
              }
              return (
                <TableRow key={index} onClick={() => handleTableRowClick(item.reservationId)}>
                  <TableCellCenter>
                    {formatToLocalTime(item.startTime)} ~ {formatToLocalTime(item.endTime)}
                  </TableCellCenter>
                  <TableCellCenter>
                    {formatToLocalTime(item.visitStartTime)} ~ {formatToLocalTime(item.visitEndTime)}
                  </TableCellCenter>
                  <TableCellCenter>
                    {item.guestLimit}
                    {item.status !== '입장 완료' && (
                      <IconButton onClick={() => handleEditClick(item.guestLimit, item)}>
                        <EditIcon />
                      </IconButton>
                    )}
                  </TableCellCenter>
                  <TableCellCenter>{item.currentGuestCount}</TableCellCenter>
                  <TableCellCenter>
                    <StatusButton status={item.status} label={item.status} reservationId={item.reservationId} />
                  </TableCellCenter>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <CustomDialog
        open={editDialogOpen}
        onClose={() => _editDialogOpen(false)}
        onSave={handleEditComplete}
        title="예약 인원 수 수정"
        value={editableGuestLimit}
      />
    </>
  );
}

export default DailyReservationTable;
