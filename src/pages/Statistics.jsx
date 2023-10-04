/* eslint-disable react-hooks/exhaustive-deps */
import { Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import RevenueChart from '../features/statistics/RevenueChart';
import ReservationChart from '../features/statistics/ReservationChart';
import styles from '../features/statistics/Statistics.module.css';
import JsonAxios from '../api/jsonAxios';
import StoreRankChart from '../features/statistics/StoreRankChart';
function Statistics() {
  const [popupStoreRanks, _popupStoreRanks] = useState([]);
  const [reservationCounts, _reservationCounts] = useState([]);
  const [storeRevenues, _storeRevenues] = useState([]);

  useEffect(() => {
    JsonAxios.get('/chart').then((res) => {
      console.log(res.data);
      _popupStoreRanks(res.data.data.popupStoreRanks);
      _reservationCounts(res.data.data.reservationCounts);
      _storeRevenues(res.data.data.storeRevenues);
      console.log(storeRevenues);
    });
  }, []);

  return (
    <div className={styles.container}>
      <Paper className={styles.revenueContainer}>
        <RevenueChart storeRevenues={storeRevenues} />
      </Paper>
      <Paper className={styles.reservationContainer}>
        <ReservationChart reservationCounts={reservationCounts} />
      </Paper>
      <Paper className={styles.rankContainer}>
        <StoreRankChart popupStoreRanks={popupStoreRanks} />
      </Paper>
    </div>
  );
}

export default Statistics;
