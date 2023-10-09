import React, { useRef, useState } from 'react';
import styles from '../features/admin/ReservationQr.module.css';
import QrCodeReader from 'react-qrcode-reader';
import JsonAxios from '../api/jsonAxios';
import EntryConfirmationDialog from '../features/dialog/EntryConfirmationDialog';

function ReservationQR() {
  const prevQRCode = useRef(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  // 다이얼로그 열기
  const handleOpenDialog = () => {
    setDialogOpen(true);
    setDialogMessage('입장 처리가 완료되었습니다.');
  };

  const handleOpenFailDialog = () => {
    setDialogOpen(true);
  };

  // 다이얼로그 닫기
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setDialogMessage(''); // 메시지 초기화
  };

  const handleRead = (code) => {
    const text = code.data;
    if (text === prevQRCode.current) {
      return; // 이미 인식한 QR 코드인 경우 처리 중지
    }
    prevQRCode.current = text;
    const keyValuePairs = text.split(',');
    const data = {};
    keyValuePairs.forEach((pair) => {
      const [key, value] = pair.split(':');
      data[key] = value;
    });
    if (data.reservationId && data.userId) {
      const reservationId = data.reservationId;
      const userId = data.userId;

      const apiUrl = `reservations/${reservationId}/entrance`;
      const params = {
        reservationUserId: userId,
      };

      JsonAxios.patch(apiUrl, params)
        .then((res) => {
          console.log(res.data);
          if (res.data.code === 'SUCCESS') {
            handleOpenDialog(); // 성공 시 다이얼로그 열기
          } else {
            setDialogMessage(res.data.data);
            handleOpenFailDialog(); // 실패 시 경고창 표시
          }
        })
        .catch((error) => {
          setDialogMessage(error.response.data.message);
          handleOpenFailDialog(); // 실패 시 경고창 표시
          // alert('입장 QR코드가 아닙니다.');
          console.error('API 호출 중 오류 발생:', error);
          console.log(error.response.data.message);
        });
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.title1}>팝업스토어 입장 QR 코드</div>
        </div>
        <div className={styles.outer}>
          <div style={{ width: '100%', height: '100%' }}>
            <QrCodeReader delay={100} width={900} height={700} onRead={handleRead} />
          </div>
        </div>
      </div>
      <EntryConfirmationDialog open={dialogOpen} onClose={handleCloseDialog} message={dialogMessage} />
    </>
  );
}

export default ReservationQR;
