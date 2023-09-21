import React from 'react';
import { Button } from '@mui/material';

const statusStyles = {
  /* 초록색 */
  '입장 중': {
    backgroundColor: '#D2F3E8',
    color: '#00A76F',
  },
  /* 파란색 */
  '입장 완료': {
    backgroundColor: '#EAEBFF',
    color: '#1273E4',
  },
  수령완료: {
    backgroundColor: '#EAEBFF',
    color: '#1273E4',
  },
  /* 보라색 */
  '예약 중': {
    backgroundColor: '#F1EDFF',
    color: '#9071C3',
  },
  /* 빨간색 */
  진행취소: {
    backgroundColor: '#FFDDDD',
    color: '#FF6D6D',
  },
  '예약 중단': {
    backgroundColor: '#FFDDDD',
    color: '#FF6D6D',
  },
  주문취소: {
    backgroundColor: '#FFDDDD',
    color: '#FF6D6D',
  },
  /* 노란색 */
  '예약 마감': {
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
