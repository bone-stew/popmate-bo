import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

const CustomDialog = ({ open, onClose, onSave, title, id, value }) => {
  const [inputValue, _inputValue] = useState();

  const handleSave = () => {
    console.log('보낸 inputValue : ' + inputValue);
    onSave(inputValue);
  };

  useEffect(() => {
    _inputValue(value);
  }, []);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField label={title} value={inputValue} onChange={(e) => _inputValue(e.target.value)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        <Button onClick={handleSave}>저장</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
