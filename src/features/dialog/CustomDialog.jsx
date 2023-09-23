import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

const CustomDialog = ({ open, onClose, onSave, title, value }) => {
  const [inputValue, _inputValue] = useState(value);

  const handleSave = () => {
    console.log('저장할때 : ' + inputValue);
    onSave(inputValue);
    onClose();
  };

  return (
    console.log('넘겨준 값 : ' + value),
    console.log('inputValue : ' + inputValue),
    (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <TextField label="최대 인원수 제한" value={inputValue} onChange={(e) => _inputValue(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>취소</Button>
          <Button onClick={handleSave}>저장</Button>
        </DialogActions>
      </Dialog>
    )
  );
};

export default CustomDialog;
