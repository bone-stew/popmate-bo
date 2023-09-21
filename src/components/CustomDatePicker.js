import React, { useState } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { IconButton, TextField } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const DatePickerComponent = ({ selectedDate, onDateChange }) => {
  const [date, setDate] = useState(() => dayjs(selectedDate).locale('ko'));

  const handleChange = (updatedDate) => {
    setDate(updatedDate);
    console.log('updatedDate : ' + updatedDate);
    console.log(updatedDate.format('YYYY-MM-DD'));
    onDateChange(updatedDate.format('YYYY-MM-DD'));
  };

  const handlePrevDate = () => {
    const newDate = date.subtract(1, 'day');
    handleChange(newDate);
  };

  const handleNextDate = () => {
    const newDate = date.add(1, 'day');
    handleChange(newDate);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} locale="en">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <IconButton onClick={handlePrevDate}>
          <ChevronLeftIcon />
        </IconButton>
        <DatePicker
          className="datePicker"
          format="YYYY-MM-DD"
          value={date}
          onChange={(updatedDate) => handleChange(updatedDate)}
          renderInput={(props) => <TextField {...props} variant="standard" />}
        />
        <IconButton onClick={handleNextDate}>
          <ChevronRightIcon />
        </IconButton>
      </div>
    </LocalizationProvider>
  );
};

export default DatePickerComponent;
