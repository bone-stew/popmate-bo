import React  from 'react';
import styles from '../features/admin/ReservationQr.module.css';
import QrCodeReader, { QRCode } from 'react-qrcode-reader';
import JsonAxios from '../api/jsonAxios';

function ReservationQR() {

  const handleRead = (code: QRCode) => {
    const text = code.data;
    const keyValuePairs = text.split(',');
    const data = {};
    keyValuePairs.forEach((pair) => {
      const [key, value] = pair.split(':');
      data[key] = value;
    });
    if(data.reservationId && data.userId){
      const reservationId = data.reservationId;
      const url = `reservations/${reservationId}/entry`;
      JsonAxios.patch(url).then((res) => {
        const message = res.data.data;
        alert(message);  
      }).catch((error) => {
        alert('입장 QR코드가 아닙니다.');
      });
    }
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.title1}>팝업스토어 입장 QR 코드</div>
      </div>
      <div className={styles.outer}>
        <div style={{ width: '100%', height : '100%'}}>
          <QrCodeReader delay={100} width={900} height={900} onRead={handleRead} />
        </div>
      </div>
    </div>
  );
}

export default ReservationQR;
