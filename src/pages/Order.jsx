import React from 'react';
import styles from '../features/order/OrderList.module.css';
import OrderList from '../features/order/OrderList'

function Order() {
  return (
    <div className={styles.container}>
      <h3>주문목록</h3>
      <div className={styles.orderListback}>
        <OrderList />
      </div>
      
    </div>
  );
}

export default Order;
