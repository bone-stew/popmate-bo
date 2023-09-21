import React from 'react';
import styles from '../features/admin/OrderQr.module.css';
import { QrReader } from 'react-qr-reader';
import JsonAxios from '../api/jsonAxios';

function OrderQR() {

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.title1}>팝업스토어 QR 코드</div>
      </div>
      <div className={styles.outer}>
        <div style={{ width: '100%', height : '100%'}}>
          <QrReader
            onResult={(result, error) => {
              if (!!result) {
                const text = result?.text;
                const keyValuePairs = text.split(',');
                const data = {};
                keyValuePairs.forEach((pair) => {
                  const [key, value] = pair.split(':');
                  data[key] = value;
                });
                const orderId = data.orderId;
                const userId = data.userId;
                const url = `http://localhost:8080/api/v1/orders/qrcode/${orderId}/${userId}`;
                JsonAxios.get(url).then((res) => {
                  alert('픽업완료하였습니다.');  
                }).catch((error) => {
                  console.log(error)
                });
              }
              if (!!error) {
                console.info(error);
              }
            }}
            style={{ width: '100%', height: '100%', position: 'relative', top: '-40%' }}
          />
        </div>
      </div>
    </div>
  );
}

export default OrderQR;
