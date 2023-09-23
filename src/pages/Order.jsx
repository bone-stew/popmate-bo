import React from 'react';
import styles from '../features/order/OrderList.module.css';
import OrderList from '../features/order/OrderList';

function Order() {
  return (
    <div className={styles.container}>
      <div className={styles.orderListback}>
        <OrderList />
      </div>
    </div>
  );
}

export default Order;
