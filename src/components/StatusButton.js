import React from 'react';
import { Button } from '@mui/material';

const StatusButton = ({ status, label }) => {
  const getStatusStyle = (status) => {
    switch (status) {
      case '진행완료':
        return {
          backgroundColor: '#D2F3E8',
          color: '#00A76F',
        };
      case '입장 중':
        return {
          backgroundColor: '#EAEBFF',
          color: '#1273E4',
        };
      case '진행취소':
        return {
          backgroundColor: '#FFDDDD',
          color: '#FF6D6D',
        };
      default:
        return {};
    }
  };

  const buttonStyle = {
    ...getStatusStyle(status),
    width: '100px',
  };

  return (
    <Button variant="text" style={buttonStyle}>
      {label}
    </Button>
  );
};

export default StatusButton;
