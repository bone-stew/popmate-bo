import React from 'react';
import styles from '../features/order/OrderList.module.css';
import OrderList from '../features/order/OrderList'

function Order() {
  return (
    <div className={styles.container}>
      <h1>주문목록</h1>
      <div className={styles.orderListback}>
        <OrderList />
      </div>
      
    </div>
  );
}

export default Order;
