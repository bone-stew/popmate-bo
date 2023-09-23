import React from 'react';
import styles from '../features/order/OrderList.module.css';
import OrderList from '../features/order/OrderList';
import { useDispatch } from 'react-redux';
import { setHeaderTitle } from '../slices/headerSlice';

function Order() {
  const dispatch = useDispatch();
  dispatch(setHeaderTitle('주문목록'));
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
