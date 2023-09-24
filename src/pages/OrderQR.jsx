import React  from 'react';
import styles from '../features/admin/OrderQr.module.css';
import QrCodeReader, { QRCode } from 'react-qrcode-reader';
import JsonAxios from '../api/jsonAxios';
import { useParams } from 'react-router-dom';

function OrderQR() {

  const { storeId } = useParams();

  const handleRead = (code: QRCode) => {
    const text = code.data;
    const keyValuePairs = text.split(',');
    const data = {};
    keyValuePairs.forEach((pair) => {
      const [key, value] = pair.split(':');
      data[key] = value;
    });
    if(data.orderId && data.userId){
      const orderId = data.orderId;
      const userId = data.userId;
      const popupStoreId = storeId;
      const url = `orders/qrcode/${orderId}/${userId}/${popupStoreId}`;
      JsonAxios.get(url).then((res) => {
        const message = res.data.data;
        alert(message);  
      }).catch((error) => {
         alert('상품 픽업 QR코드가 아닙니다.');
      });
    }else{
    }
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.title1}>팝업스토어 상품 픽업 QR 코드</div>
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
