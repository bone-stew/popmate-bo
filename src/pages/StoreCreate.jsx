import React from 'react';
import styles from '../features/storecreate/StoreCreate.module.css';
import StoreCreateHeader from '../features/storecreate/StoreCreateHeader';
import StoreInfoForm from '../features/storecreate/StoreInfoForm';
import StoreReservationForm from '../features/storecreate/StoreReservationForm';
import StoreItemsForm from '../features/storecreate/StoreItemsForm';

function StoreCreate() {
  return (
    <div>
      <StoreCreateHeader />
      <div className={styles.container}>
        {/* <StoreInfoForm /> */}
        {/* <StoreReservationForm /> */}
        <StoreItemsForm />
      </div>
    </div>
  );
}

export default StoreCreate;
