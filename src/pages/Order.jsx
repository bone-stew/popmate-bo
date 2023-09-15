import React from 'react';
import styles from '../features/order/OrderList.module.css';
import OrderList from '../features/order/OrderList'
import OrderTop from '../features/order/OrderTop';

function Order() {
  return (
    <div className={styles.container}>
      <h1>주문목록</h1>
      <div className={styles.orderListback}>
        <OrderTop/>
        <OrderList />
      </div>
      
    </div>
  );
}

export default Order;
