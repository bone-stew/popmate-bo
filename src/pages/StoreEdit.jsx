import React, { useEffect } from 'react';
import StoreInfoForm from '../features/storecreate/StoreInfoForm';
import StoreReservationForm from '../features/storecreate/StoreReservationForm';
import StoreItemsForm from '../features/storecreate/StoreItemsForm';
import { useState } from 'react';
import MultipartAxios from '../api/multipartAxios';
import JsonAxios from '../api/jsonAxios';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading.js';

function StoreEdit() {
  const [storeData, setStoreData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUsingReservation, setIsUsingReservation] = useState();
  const [isUsingSales, setIsUsingSales] = useState();
  const navigate = useNavigate();

  const { storeId } = useParams();

  useEffect(() => {
    MultipartAxios.get(`popup-stores/${storeId}/edit`)
      .then((response) => {
        setStoreData(response.data.data);
        setIsUsingReservation(response.data.data.reservationEnabled);
        setIsUsingSales(response.data.data.salesEnabled);
        // setIsUsingSales(response.data.data.popupStoreItemResponse.length !== 0);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [storeId]);

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

  const handleEditStore = async () => {
    setIsLoading(true);
    const storeInfo = StoreInfoForm.getData();
    const storeImageObjects = storeInfo.storeImageObjectsData;

    var storeTemp = {
      popupStore: {
        department: {
          departmentId: storeInfo.department,
        },
        user: {
          userId: storeInfo.staffId,
        },
        title: storeInfo.title,
        organizer: storeInfo.organizer,
        placeDetail: storeInfo.placeDetail,
        description: storeInfo.description,
        eventDescription: storeInfo.eventDescription,
        entryFee: storeInfo.entryFee,
        openDate: storeInfo.openDate,
        closeDate: storeInfo.closeDate,
        openTime: storeInfo.openTime.format('YYYY-MM-DDTHH:mm:ss'),
        closeTime: storeInfo.closeTime.format('YYYY-MM-DDTHH:mm:ss'),
        views: storeInfo.views,
        popupStoreId: storeId,
        storeImageList: [],
        reservationEnabled: storeInfo.reservationEnabled,
        salesEnabled: storeInfo.salesSystem === 'yesSales' ? 1 : 0,
      },
      popupStoreSnsList: [],
      popupStoreItemList: [],
    };

    const formData = new FormData();

    const snsPlatforms = ['website', 'youtube', 'instagram'];
    snsPlatforms.forEach((platform) => {
      if (storeInfo[platform] !== '') {
        storeTemp.popupStoreSnsList.push({
          platform: platform.charAt(0).toUpperCase() + platform.slice(1),
          url: storeInfo[platform],
        });
      } else {
        storeTemp.popupStoreSnsList.push({
          platform: platform.charAt(0).toUpperCase() + platform.slice(1),
          url: '',
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

    const { itemsList, itemFileList, itemsToDelete } = StoreItemsForm.getData();
    const fileIndices = [];
    const fileArray = [];
    if (storeInfo.salesSystem === 'yesSales') {
      const hasBlobUrl = itemsList.some((item) => item.imgUrl.startsWith('blob:'));
      if (hasBlobUrl) {
        itemFileList.forEach((item, index) => {
          if (item.imgUrl instanceof File) {
            fileIndices.push(index);
            fileArray.push(item.imgUrl);
          }
        });
        fileArray.forEach((image, index) => {
          formData.append('storeItemImageFiles', image);
        });
      }
      storeTemp.popupStoreItemList = itemsList;
      storeTemp.popupStoreItemsToDelete = itemsToDelete;
    } else {
      storeTemp.popupStoreItemList = [];
    }

    const bannerImageObj = storeImageObjects[0];
    const storeImagesNotToDelete = [];
    var updatedPopupStoreImageList = null;

    var isBannerImgNew = false;
    var isStoreImgNew = false;
    if (bannerImageObj instanceof File) {
      isBannerImgNew = true;
      formData.append('storeImageFiles', bannerImageObj);
    }

    for (let index = 1; index < storeImageObjects.length; index++) {
      const storeImageObj = storeImageObjects[index];
      if (storeImageObj instanceof File) {
        isStoreImgNew = true;
        formData.append('storeImageFiles', storeImageObj);
      } else if (storeImageObj.hasOwnProperty('popupStoreImgId')) {
        storeImagesNotToDelete.push(storeImageObj.popupStoreImgId);
      }
    }

    MultipartAxios.post(`popup-stores/${storeId}/images`, formData)
      .then((response) => {
        updatedPopupStoreImageList = response.data.data.popupStoreImageList;
        if (isBannerImgNew) {
          storeTemp.popupStore.bannerImgUrl = updatedPopupStoreImageList.shift();
        }
        if (isStoreImgNew) {
          storeTemp.storeImageList = updatedPopupStoreImageList;
        }
        if (!isBannerImgNew && !isStoreImgNew) {
          storeTemp.storeImageList = [];
        }
        storeTemp.storeImagesNotToDelete = storeImagesNotToDelete;

        if (response.data.data.popupStoreItemImageList !== null) {
          var updatedStoreItemImageList = response.data.data.popupStoreItemImageList;
          updatedStoreItemImageList.forEach((updatedImgUrl, index) => {
            itemsList[fileIndices[index]].imgUrl = updatedImgUrl;
          });
          storeTemp.popupStoreItemList = itemsList;
        }
        JsonAxios.put(`popup-stores/${storeId}`, JSON.stringify(storeTemp))
          .then((response) => {
            navigate(`/popup-stores/${storeId}/detail`);
          })
          .catch((e) => {
            console.error(e);
          })
          .finally(() => {
            setIsLoading(false);
          });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <div>
        {storeData && (
          <StoreInfoForm
            viewInfo={storeData}
            notifyReservationChange={handleReservationChange}
            notifySalesChange={handleSalesChange}
          />
        )}
        <StoreReservationForm viewInfo={storeData} isUsingReservation={isUsingReservation} />
        <StoreItemsForm viewInfo={storeData} isUsingSales={isUsingSales} />
        <div style={{ textAlign: 'center', margin: '5rem 0' }}>
          <div>
            <Button type="submit" onClick={handleEditStore} variant="contained" sx={{ borderRadius: 28 }}>
              팝업스토어 저장
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default StoreEdit;
