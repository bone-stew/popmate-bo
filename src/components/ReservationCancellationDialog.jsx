import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const ReservationCancellationDialog = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>예약 취소</DialogTitle>
      <DialogContent>예약을 중단하시겠습니까?</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        <Button onClick={onConfirm} color="error">
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReservationCancellationDialog;
