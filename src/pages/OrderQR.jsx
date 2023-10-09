import React, { useRef, useState } from 'react';
import styles from '../features/admin/OrderQr.module.css';
import QrCodeReader from 'react-qrcode-reader';
import JsonAxios from '../api/jsonAxios';
import { useParams } from 'react-router-dom';
import PickupConfirmationDialog from '../features/dialog/PickupConfirmationDialog';

function OrderQR() {
  const prevQRCode = useRef(null);
  const { storeId } = useParams();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  // 다이얼로그 열기
  const handleOpenDialog = () => {
    setDialogOpen(true);
    setDialogMessage('상품 픽업이 완료되었습니다.');
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
    if (data.orderId && data.userId) {
      const orderId = data.orderId;
      const userId = data.userId;
      const popupStoreId = storeId;
      const url = `orders/qrcode/${orderId}/${userId}/${popupStoreId}`;
      JsonAxios.get(url)
        .then((res) => {
          if (res.data.data === '이 스토어의 QR코드가 아닙니다.') {
            setDialogMessage(res.data.data);
            handleOpenFailDialog();
          } else {
            handleOpenDialog();
          }
        })
        .catch((error) => {
          setDialogMessage('상품 픽업 QR코드가 아닙니다.');
          handleOpenFailDialog();
        });
    } else {
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>팝업스토어 상품 픽업 QR 코드</div>
        <div className={styles.outer}>
          <QrCodeReader delay={100} width={900} height={700} onRead={handleRead} />
        </div>
      </div>
      <PickupConfirmationDialog open={dialogOpen} onClose={handleCloseDialog} message={dialogMessage} />
    </>
  );
}

export default OrderQR;
