import React  from 'react';
import styles from '../features/admin/OrderQr.module.css';
import QrCodeReader, { QRCode } from 'react-qrcode-reader';
import JsonAxios from '../api/jsonAxios';

function OrderQR() {



  const handleRead = (code: QRCode) => {
    const text = code.data;
    const keyValuePairs = text.split(',');
    const data = {};
    keyValuePairs.forEach((pair) => {
      const [key, value] = pair.split(':');
      data[key] = value;
    });
    const orderId = data.orderId;
    const userId = data.userId;
    const url = `orders/qrcode/${orderId}/${userId}`;
    JsonAxios.get(url).then((res) => {
      alert('픽업완료하였습니다.');  
    }).catch((error) => {
      console.log(error)
    });
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.title1}>팝업스토어 QR 코드</div>
      </div>
      <div className={styles.outer}>
        <div style={{ width: '100%', height : '100%'}}>
          <QrCodeReader delay={100} width={900} height={900} onRead={handleRead} />
        </div>
      </div>
    </div>
  );
}

export default OrderQR;
