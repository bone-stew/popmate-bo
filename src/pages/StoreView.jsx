import React, { useEffect } from 'react';
import styles from '../features/storecreate/StoreCreate.module.css';
import StoreInfoForm from '../features/storecreate/StoreInfoForm';
import StoreReservationForm from '../features/storecreate/StoreReservationForm';
import StoreItemsForm from '../features/storecreate/StoreItemsForm';
import { useState, useCallback } from 'react';
import StoreCreateComplete from '../features/storecreate/StoreCreateComplete';
import axios from 'axios';
import Button from '@mui/material/Button';
import { TrySharp } from '@mui/icons-material';
function StoreView({ popupStoreId }) {
  const [storeData, setStoreData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [isUsingReservation, setIsUsingReservation] = useState();
  const [isUsingSales, setIsUsingSales] = useState();
  const [storeImageList, setStoreImageList] = useState([]);
  const [storeItemImageList, setStoreItemImageList] = useState([]);
  const [sendUpdateRequest, setSendUpdateRequest] = useState(false);
  const [completeForm, setCompleteForm] = useState(false);

  const [newStore, setNewStore] = useState({
    popupStore: {
      user: {
        userId: 122,
      },
      department: {
        departmentId: '',
      },
      title: '',
      organizer: '',
      placeDetail: '',
      description: '',
      eventDescription: '',
      entryFee: '',
      openDate: '',
      closeDate: '',
      openTime: '',
      closeTime: '',
      views: '',
    },
    popupStoreSnsList: [],
    popupStoreItemList: [],
  });

  useEffect(() => {
    setViewInfo();
  }, []);

  const handleReservationChange = (reservationText) => {
    if (reservationText === 'noReservation') {
      setIsUsingReservation(false);
    } else if (reservationText === 'yesReservation') {
      setIsUsingReservation(true);
    }
  };

  const handleSalesChange = (salesText) => {
    if (salesText === 'noSales') {
      setIsUsingSales(false);
    } else if (salesText === 'yesSales') {
      setIsUsingSales(true);
    }
  };

  const setViewInfo = () => {
    axios
      .get(`http://localhost:8080/api/v1/popup-stores/${popupStoreId}/edit`, {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYW5nY2hvNjE3QGdtYWlsLmNvbSIsInVzZXJJZCI6NCwidXNlck5hbWUiOiLsobDsg4Hsm5AiLCJpYXQiOjE2OTQ0MTIyMjUsImV4cCI6MTY5NzAwMzU4N30.lvNMG3HRmODWotnAwyiBAXiBd8VEbR7Hs0H2Xjyj_wk',
        },
      })
      .then((response) => {
        console.log('VIEWINFO', response.data.data);
        setStoreData(response.data.data);
        setIsUsingReservation(response.data.data.reservationEnabled);
        setIsUsingSales(response.data.data.popupStoreItemResponse.length !== 0);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEditStore = async () => {
    const storeInfo = StoreInfoForm.getData();
    const newStoreImages = storeInfo.storeImageFiles;

    var storeTemp = {
      popupStore: {
        user: {
          userId: 122,
        },
        department: {
          departmentId: storeInfo.department,
        },
        title: storeInfo.title,
        organizer: storeInfo.organizer,
        placeDetail: storeInfo.placeDetail,
        description: storeInfo.description,
        eventDescription: storeInfo.eventDescription,
        entryFee: storeInfo.entryFee,
        openDate: storeInfo.openDate,
        closeDate: storeInfo.closeDate,
        openTime: storeInfo.openTime,
        closeTime: storeInfo.closeTime,
        views: storeInfo.views,
        popupStoreId: popupStoreId,
        storeImageList: [],
      },
      popupStoreSnsList: [],
      popupStoreItemList: [],
    };

    try {
      console.log('1');
      if (newStoreImages.length !== 0) {
        console.log('INSIDE NEWSTOREIMAGES');
        const formData = new FormData();
        newStoreImages.forEach((image, index) => {
          formData.append('storeImageFiles', image);
        });

        const response = await axios.post(
          `http://localhost:8080/api/v1/popup-stores/${popupStoreId}/images`,
          formData,
          {
            headers: {
              'content-type': 'multipart/form-data',
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYW5nY2hvNjE3QGdtYWlsLmNvbSIsInVzZXJJZCI6NCwidXNlck5hbWUiOiLsobDsg4Hsm5AiLCJpYXQiOjE2OTQ0MTIyMjUsImV4cCI6MTY5NzAwMzU4N30.lvNMG3HRmODWotnAwyiBAXiBd8VEbR7Hs0H2Xjyj_wk',
            },
          },
        );
        var storeImagesWithoutLocalImages = storeInfo.storeImages.filter((image) => !image.startsWith('blob:'));
        var updatedStoreImageList = storeImagesWithoutLocalImages.concat(response.data.data);
        storeTemp.storeImageList = updatedStoreImageList;
      } else {
        console.log('2');

        storeTemp.storeImageList = storeInfo.storeImages;
      }

      const snsPlatforms = ['website', 'youtube', 'instagram'];
      snsPlatforms.forEach((platform) => {
        if (storeInfo[platform] !== '') {
          storeTemp.popupStoreSnsList.push({
            platform: platform.charAt(0).toUpperCase() + platform.slice(1),
            url: storeInfo[platform],
          });
        }
      });

      if (storeInfo.reservationEnabled) {
        const reservationInfo = StoreReservationForm.getData();
        storeTemp.popupStore.reservationEnabled = 1;
        storeTemp.popupStore.maxCapacity = reservationInfo.maxCapacity;
        storeTemp.popupStore.reservationInterval = reservationInfo.reservationInterval;
        storeTemp.popupStore.intervalCapacity = reservationInfo.intervalCapacity;
        storeTemp.popupStore.teamSizeLimit = reservationInfo.teamSizeLimit;
      } else {
        storeTemp.popupStore.reservationEnabled = 0;
      }
      console.log('3');

      if (storeInfo.salesSystem === 'yesSales') {
        const { itemsList, itemFileList } = StoreItemsForm.getData();
        const fileIndices = [];
        const fileArray = [];

        const hasBlobUrl = itemsList.some((item) => item.imgUrl.startsWith('blob:'));

        if (hasBlobUrl) {
          console.log('INSIDE HASBLOBURL');

          itemFileList.forEach((item, index) => {
            if (item.imgUrl instanceof File) {
              fileIndices.push(index);
              fileArray.push(item.imgUrl);
            }
          });

          const imgFormData = new FormData();

          fileArray.forEach((image, index) => {
            imgFormData.append('storeImageFiles', image);
          });

          const response = await axios.post(
            `http://localhost:8080/api/v1/popup-stores/${popupStoreId}/images`,
            imgFormData,
            {
              headers: {
                'content-type': 'multipart/form-data',
                Authorization:
                  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYW5nY2hvNjE3QGdtYWlsLmNvbSIsInVzZXJJZCI6NCwidXNlck5hbWUiOiLsobDsg4Hsm5AiLCJpYXQiOjE2OTQ0MTIyMjUsImV4cCI6MTY5NzAwMzU4N30.lvNMG3HRmODWotnAwyiBAXiBd8VEbR7Hs0H2Xjyj_wk',
              },
            },
          );
          var updatedStoreItemImageList = response.data.data;
          updatedStoreItemImageList.forEach((updatedImgUrl, index) => {
            itemsList[fileIndices[index]].imgUrl = updatedImgUrl;
          });
        }
        console.log('4');

        storeTemp.popupStoreItemList = itemsList;
      } else {
        storeTemp.popupStoreItemList = [];
      }

      setNewStore(storeTemp);
    } catch (e) {
      console.error(e);
    }
    console.log('5');

    setSendUpdateRequest(true);
  };

  useEffect(() => {
    console.log('newStore', newStore);
    console.log('storeImageList', storeImageList);
    console.log('storeItemImageList', storeItemImageList);
  }, [newStore]);

  useEffect(() => {
    console.log('SENDING NEW STORE', newStore);
    if (sendUpdateRequest === true) {
      axios.put(`http://localhost:8080/api/v1/popup-stores/${popupStoreId}`, JSON.stringify(newStore), {
        headers: {
          'content-Type': 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYW5nY2hvNjE3QGdtYWlsLmNvbSIsInVzZXJJZCI6NCwidXNlck5hbWUiOiLsobDsg4Hsm5AiLCJpYXQiOjE2OTQ0MTIyMjUsImV4cCI6MTY5NzAwMzU4N30.lvNMG3HRmODWotnAwyiBAXiBd8VEbR7Hs0H2Xjyj_wk',
        },
      });
    }
  }, [sendUpdateRequest]);

  if (!isLoading) {
    return (
      <div>
        {storeData && (
          <StoreInfoForm
            viewInfo={storeData}
            notifyReservationChange={handleReservationChange}
            notifySalesChange={handleSalesChange}
          />
        )}
        {isUsingReservation && <StoreReservationForm viewInfo={storeData} />}
        {isUsingSales && <StoreItemsForm viewInfo={storeData} />}
        <div style={{ textAlign: 'center', margin: '5rem 0' }}>
          <div>
            <Button type="submit" onClick={handleEditStore} variant="contained" sx={{ borderRadius: 28 }}>
              팝업스토어 수정
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default StoreView;
