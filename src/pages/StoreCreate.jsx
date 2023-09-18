import React, { useEffect } from 'react';
import styles from '../features/storecreate/StoreCreate.module.css';
import StoreInfoForm from '../features/storecreate/StoreInfoForm';
import StoreReservationForm from '../features/storecreate/StoreReservationForm';
import StoreItemsForm from '../features/storecreate/StoreItemsForm';
import { useState } from 'react';
import StoreCreateComplete from '../features/storecreate/StoreCreateComplete';

function StoreCreate() {
  const [currentForm, setCurrentForm] = useState('info');
  const [reservation, setReservation] = useState('');
  const [sales, setSales] = useState('');
  const [storeInfo, setStoreInfo] = useState([]);
  const [reservationInfo, setReservationInfo] = useState([]);
  const [salesInfo, setSalesInfo] = useState([]);
  const [storeStatus, setStoreStatus] = useState(false);
  const [reservationStatus, setReservationStatus] = useState(false);
  const [salesStatus, setSalesStatus] = useState(false);

  const handleUserChoice = (reservationText, salesText) => {
    setReservation(reservationText);
    setSales(salesText);
  };

  useEffect(() => {
    console.log('WHATUP', storeStatus, reservationStatus, salesStatus);
    if (storeStatus && reservationStatus && salesStatus) {
      console.log('SEND DATA');
      // create data
      // send to server
      setCurrentForm('complete');
    }
  }, [storeStatus, reservationStatus, salesStatus]);

  useEffect(() => {
    if (reservation === 'noReservation' && sales === 'noSales') {
      setStoreStatus(true);
      setReservationStatus(true);
      setSalesStatus(true);
    }
    if (reservation === 'yesReservation') {
      setCurrentForm('reservation');
    } else if (reservation === 'noReservation' && sales === 'yesSales') {
      setCurrentForm('items');
    }
  }, [reservation, sales]);

  const reservationFormSubmitted = () => {
    if (sales === 'yesSales') {
      setCurrentForm('items');
    }
  };

  const addStoreInfo = (submittedStoreInfo) => {
    setStoreInfo(submittedStoreInfo);
    setStoreStatus(true);
    if (reservation === 'noReservation' && sales === 'noSales') {
      setReservationStatus(true);
      setSalesStatus(true);
    }
    console.log(storeInfo);
  };

  const addReservationInfo = (submittedReservationInfo) => {
    setReservationInfo(submittedReservationInfo);
    setReservationStatus(true);
    if (sales === 'noSales') {
      setSalesStatus(true);
    }
  };

  const addSalesInfo = (submittedSalesInfo) => {
    setSalesInfo(submittedSalesInfo);
    setSalesStatus(true);
    if (reservation === 'noReservation') {
      setReservationStatus(true);
    }
  };

  const handleCancelReservation = () => {
    setReservationStatus(true);
    setReservation('noReservation');
    if (sales === 'yesSales') {
      setCurrentForm('items');
    } else {
      setCurrentForm('complete');
    }
  };

  const handleCancelSales = () => {
    setSalesStatus(true);
    setSales('noSales');
    setCurrentForm('complete');
  };

  return (
    <div>
      <div className={styles.container}>
        {currentForm === 'info' && <StoreInfoForm onUserChoice={handleUserChoice} addStore={addStoreInfo} />}
        {currentForm === 'reservation' && (
          <StoreReservationForm
            onUserChoice={reservationFormSubmitted}
            sales={sales}
            addReservation={addReservationInfo}
            cancelReservation={handleCancelReservation}
          />
        )}
        {currentForm === 'items' && <StoreItemsForm addSales={addSalesInfo} cancelSales={handleCancelSales} />}
        {currentForm === 'complete' && <StoreCreateComplete />}
      </div>
    </div>
  );
}

export default StoreCreate;
