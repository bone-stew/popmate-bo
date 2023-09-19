import React from 'react';
import { Button } from '@mui/material';

const statusStyles = {
  /* 초록색 */
  '입장 중': {
    backgroundColor: '#D2F3E8',
    color: '#00A76F',
  },
  /* 파란색 */
  진행완료: {
    backgroundColor: '#EAEBFF',
    color: '#1273E4',
  },
  '예약 완료': {
    backgroundColor: '#EAEBFF',
    color: '#1273E4',
  },
  수령완료: {
    backgroundColor: '#EAEBFF',
    color: '#1273E4',
  },
  /* 빨간색 */
  진행취소: {
    backgroundColor: '#FFDDDD',
    color: '#FF6D6D',
  },
  예약취소: {
    backgroundColor: '#FFDDDD',
    color: '#FF6D6D',
  },
  주문취소: {
    backgroundColor: '#FFDDDD',
    color: '#FF6D6D',
  },
  /* 노란색 */
  '예약 중': {
    backgroundColor: '#FEF0D2',
    color: '#FFAB00',
  },
  수령대기: {
    backgroundColor: '#FEF0D2',
    color: '#FFAB00',
  },
};

const defaultStyle = {
  backgroundColor: '#E9E9E9',
  color: '#7F7F7F',
};

const StatusButton = ({ status, label }) => {
  const buttonStyle = {
    ...(statusStyles[status] || defaultStyle),
    width: '100px',
  };

  return (
    <Button variant="text" style={buttonStyle}>
      {label}
    </Button>
  );
};

export default StatusButton;
