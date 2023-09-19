import React, { useEffect } from 'react';
import styles from '../features/storecreate/StoreCreate.module.css';
import StoreInfoForm from '../features/storecreate/StoreInfoForm';
import StoreReservationForm from '../features/storecreate/StoreReservationForm';
import StoreItemsForm from '../features/storecreate/StoreItemsForm';
import { useState, useCallback } from 'react';
import StoreCreateComplete from '../features/storecreate/StoreCreateComplete';
import axios from 'axios';

function StoreView({ popupStoreId }) {
  // let storeData = {};
  let storeInfo;
  const [storeData, setStoreData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setViewInfo();
  }, []);

  const setViewInfo = () => {
    axios
      .get(`http://localhost:8080/api/v1/popup-stores/${popupStoreId}/edit`, {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYW5nY2hvNjE3QGdtYWlsLmNvbSIsInVzZXJJZCI6NCwidXNlck5hbWUiOiLsobDsg4Hsm5AiLCJpYXQiOjE2OTQ0MTIyMjUsImV4cCI6MTY5NzAwMzU4N30.lvNMG3HRmODWotnAwyiBAXiBd8VEbR7Hs0H2Xjyj_wk',
        },
      })
      .then((response) => {
        setStoreData(response.data.data);
        setLoading(false);

        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (!isLoading) {
    return (
      <div>
        {storeData && <StoreInfoForm viewInfo={storeData} />}
        {storeData && <StoreReservationForm viewInfo={storeData} />}
        {storeData && <StoreItemsForm viewInfo={storeData} />}
      </div>
    );
  }
}

export default StoreView;
