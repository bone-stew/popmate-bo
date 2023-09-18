import React from 'react';
import styles from '../features/storecreate/StoreCreate.module.css';
import StoreCreateHeader from '../features/storecreate/StoreCreateHeader';
import StoreInfoForm from '../features/storecreate/StoreInfoForm';
import StoreReservationForm from '../features/storecreate/StoreReservationForm';
import StoreItemsForm from '../features/storecreate/StoreItemsForm';
import { useState } from 'react';

function StoreCreate() {
  const [currentForm, setCurrentForm] = useState('info'); // Start with 'info'
  const [setReservation] = useState(''); // Track reservation choice
  const [sales, setSales] = useState(''); // Track sales choice

  const handleUserChoice = (reservationText, salesText) => {
    setReservation(reservationText);
    setSales(salesText);

    if (reservationText === 'yesReservation') {
      setCurrentForm('reservation');
    } else if (salesText === 'yesSales') {
      setCurrentForm('items');
    }
  };

  const reservationFormSubmitted = () => {
    if (sales === 'yesSales') {
      setCurrentForm('items');
    }
  };

  return (
    <div>
      <StoreCreateHeader />
      <div className={styles.container}>
        {currentForm === 'info' && <StoreInfoForm onUserChoice={handleUserChoice} />}
        {currentForm === 'reservation' && (
          <StoreReservationForm onUserChoice={reservationFormSubmitted} sales={sales} />
        )}
        {currentForm === 'items' && <StoreItemsForm />}
      </div>
    </div>
  );
}

export default StoreCreate;
