import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

function EntryConfirmationDialog({ open, onClose, message }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>입장 처리 완료</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EntryConfirmationDialog;
