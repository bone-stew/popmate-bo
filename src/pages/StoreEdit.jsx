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

function StoreEdit() {
  const [storeData, setStoreData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [isUsingReservation, setIsUsingReservation] = useState();
  const [isUsingSales, setIsUsingSales] = useState();
  const navigate = useNavigate();

  const { storeId } = useParams();

  useEffect(() => {
    MultipartAxios.get(`popup-stores/${storeId}/edit`)
      .then((response) => {
        setStoreData(response.data.data);
        setIsUsingReservation(response.data.data.reservationEnabled);
        setIsUsingSales(response.data.data.popupStoreItemResponse.length !== 0);
        setLoading(false);
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
    const storeInfo = StoreInfoForm.getData();
    const newStoreImages = storeInfo.storeImageFilesData;

    var storeTemp = {
      popupStore: {
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
        popupStoreId: storeId,
        storeImageList: [],
      },
      popupStoreSnsList: [],
      popupStoreItemList: [],
    };

    const formData = new FormData();
    if (newStoreImages.length !== 0) {
      console.log(newStoreImages);
      newStoreImages.forEach((image, index) => {
        formData.append('storeImageFiles', image);
      });
    } else {
      storeTemp.storeImageList = storeInfo.storeImagesData;
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
    console.log('SNSLIST', storeTemp.popupStoreSnsList);

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

    const { itemsList, itemFileList } = StoreItemsForm.getData();
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
    } else {
      storeTemp.popupStoreItemList = [];
    }
    MultipartAxios.post(`popup-stores/${storeId}/images`, formData)
      .then((response) => {
        const responseObj = response.data;
        var storeImagesWithoutLocalImages = storeInfo.storeImagesData.filter((image) => !image.startsWith('blob:'));
        var updatedStoreImageList = storeImagesWithoutLocalImages.concat(responseObj.data.popupStoreImageList);
        if (responseObj.data.popupStoreImageList !== null) {
          storeTemp.storeImageList = updatedStoreImageList;
        } else {
          storeTemp.storeImageList = storeInfo.storeImagesData;
        }
        if (responseObj.data.popupStoreItemImageList !== null) {
          var updatedStoreItemImageList = responseObj.data.popupStoreItemImageList;
          updatedStoreItemImageList.forEach((updatedImgUrl, index) => {
            itemsList[fileIndices[index]].imgUrl = updatedImgUrl;
          });
          storeTemp.popupStoreItemList = itemsList;
        }

        JsonAxios.put(`popup-stores/${storeId}`, JSON.stringify(storeTemp))
          .then((response) => {
            console.log(response.data);
            navigate('/overview/list');
          })
          .catch((e) => {
            console.error(e);
          });
      })
      .catch((e) => {
        console.error(e);
      });
  };

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
