import React, { useState } from 'react';
import { Button } from '@mui/material';
import styles from '../features/reservation/StatusButton.module.css';
import ReservationCancellationDialog from './ReservationCancellationDialog';
import ReservationStartDialog from './ReservationStartDialog';

import JsonAxios from '../api/jsonAxios';

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
  '예약 취소': {
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
  '예약 예정': {
    backgroundColor: '#E9E9E9',
    color: '#7F7F7F',
  },
};

const defaultStyle = {
  backgroundColor: '#E9E9E9',
  color: '#7F7F7F',
};

const StatusButton = ({ status, label, reservationId, successHandler }) => {
  const [hovered, _hovered] = useState(false);
  const [dialogOpen, _dialogOpen] = useState(false);
  const [restartDialogOpen, _restartDialogOpen] = useState(false);

  const handleMouseEnter = () => {
    _hovered(true);
  };

  const handleMouseLeave = () => {
    _hovered(false);
  };

  const buttonStyle = {
    ...(statusStyles[status] || defaultStyle),
    width: '100px',
  };

  const buttonClass = `${styles['status-button']} ${status === '예약 예정' ? styles.scheduled : ''}`;

  const buttonText = hovered && status === '예약 예정' ? '예약 중단' : label;

  const handleCancelButtonClick = () => {
    if (status === '예약 예정' && hovered === true) {
      _dialogOpen(true); // 다이얼로그 열기
    } else if (status === '예약 중단' && hovered === true) {
      _restartDialogOpen(true); // 다이얼로그 열기
    }
  };

  const handleConfirmCancellation = () => {
    if (dialogOpen === true) {
      // 예약 중단 API 호출
      const apiUrl = `reservations/${reservationId}/cancellation`;
      JsonAxios.patch(apiUrl)
        .then((response) => {
          console.log('예약이 중단되었습니다.');
          _dialogOpen(false);
          successHandler();
        })
        .catch((error) => {
          console.error('API 호출 중 오류 발생:', error);
        });
    } else if (restartDialogOpen === true) {
      // 예약 재개 API 호출
      const apiUrl = `reservations/${reservationId}/resume`;
      JsonAxios.patch(apiUrl)
        .then((response) => {
          console.log('예약이 재개되었습니다.');
          _restartDialogOpen(false);
          successHandler();
        })
        .catch((error) => {
          console.error('API 호출 중 오류 발생:', error);
        });
    }
  };

  const handleCloseDialog = () => {
    _dialogOpen(false); // 다이얼로그 닫기
    _restartDialogOpen(false); // 다이얼로그 닫기
  };

  return (
    <>
      <Button
        variant="text"
        className={buttonClass}
        style={buttonStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleCancelButtonClick}
      >
        {buttonText}
      </Button>
      <ReservationCancellationDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmCancellation}
      />
      <ReservationStartDialog
        open={restartDialogOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmCancellation}
      />
    </>
  );
};

export default StatusButton;
