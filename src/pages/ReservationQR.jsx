import React, { useRef, useState } from 'react';
import styles from '../features/admin/ReservationQr.module.css';
import QrCodeReader, { QRCode } from 'react-qrcode-reader';
import JsonAxios from '../api/jsonAxios';

function ReservationQR() {
  const prevQRCode = useRef(null);

  const handleRead = (code: QRCode) => {
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
          if (res.data.code === 'SUCCESS') {
            alert('입장 처리 완료'); // 성공 시 경고창 표시
          } else {
            alert('입장 처리 실패'); // 실패 시 경고창 표시
          }
        })
        .catch((error) => {
          alert('입장 QR코드가 아닙니다.');
          console.error('API 호출 중 오류 발생:', error);
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
            <QrCodeReader delay={100} width={900} height={900} onRead={handleRead} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ReservationQR;
