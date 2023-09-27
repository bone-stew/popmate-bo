import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import React from 'react';
import JsonAxios from '../../api/jsonAxios';

function ReportModal({ _reports, defendant, open, _open, dicision, _dicision }) {
  const handleClose = () => {
    _open(false);
  };

  const handleConfirm = () => {
    JsonAxios.post('/chat/ban-user', { userId: defendant.writer, type: dicision })
      .then((res) => {
        _reports(res.data.data);
      })
      .finally(() => {
        _open(false);
      });
  };

  const handleOnChange = (e) => {
    _dicision(e.target.value);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>처리 상태</DialogTitle>
      <DialogContent>
        <DialogContentText>대상: {defendant && defendant.writerEmail}</DialogContentText>
      </DialogContent>
      <DialogContent>
        <FormControl fullWidth>
          <InputLabel id="select-lable">처분</InputLabel>
          <Select labelId='id="select-lable' value={dicision} label="처분" onChange={handleOnChange}>
            <MenuItem value={1}>반려</MenuItem>
            <MenuItem value={2}>3일 정지</MenuItem>
            <MenuItem value={3}>1주일 정지</MenuItem>
            <MenuItem value={4}>1달 정지</MenuItem>
            <MenuItem value={5}>영구 정지</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleConfirm}>확인</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ReportModal;
