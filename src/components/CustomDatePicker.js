import React, { useState } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { IconButton, TextField } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const DatePickerComponent = ({ todoObject, type }) => {
  const initialDate =
    todoObject && todoObject[type] && dayjs(todoObject[type]).isValid() ? dayjs(todoObject[type]) : dayjs();
  const [date, setDate] = useState(initialDate);

  const handleChange = (updatedDate) => {
    setDate(updatedDate);
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
          label={type === 't' ? 'Threshold' : '날짜'}
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
