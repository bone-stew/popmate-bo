import React, { useEffect } from 'react';
import StoreInfoForm from '../features/storecreate/StoreInfoForm';
import StoreReservationForm from '../features/storecreate/StoreReservationForm';
import StoreItemsForm from '../features/storecreate/StoreItemsForm';
import { useState, useCallback } from 'react';
import MultipartAxios from '../api/multipartAxios';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading.js';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';

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
  const [storeRequest, setStoreRequest] = useState({});
  const [storeImageList, setStoreImageList] = useState([]);
  const [storeItemImageList, setStoreItemImageList] = useState([]);
  const [readySend, setReadySend] = useState();

  const [activeStep, setActiveStep] = useState(0);

  const steps = ['팝업스토어 상세정보', '예약 시스템 정보', '판매 시스템 정보'];

  const isStepOptional = (step) => {
    return step === 1 || step === 2;
  };

  const navigate = useNavigate();

  const handleUserChoice = (reservationText, salesText) => {
    setReservation(reservationText);
    setSales(salesText);
  };

  const createStoreDetailRequest = useCallback(() => {
    const popupStoreRequest = {
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
        views: 0,
      },
      popupStoreSnsList: [],
      popupStoreItemList: [],
    };
    const snsPlatforms = ['website', 'youtube', 'instagram'];
    snsPlatforms.forEach((platform) => {
      if (storeInfo[platform] !== '') {
        popupStoreRequest.popupStoreSnsList.push({
          platform: platform.charAt(0).toUpperCase() + platform.slice(1),
          url: storeInfo[platform],
        });
      }
    });

    if (storeInfo.reservationEnabled) {
      popupStoreRequest.popupStore = {
        ...popupStoreRequest.popupStore,
        maxCapacity: reservationInfo.maxCapacity,
        reservationEnabled: storeInfo.reservationEnabled,
        reservationInterval: reservationInfo.reservationInterval,
        intervalCapacity: reservationInfo.intervalCapacity,
        teamSizeLimit: reservationInfo.teamSizeLimit,
      };
    } else {
      popupStoreRequest.popupStore = {
        ...popupStoreRequest.popupStore,
        reservationEnabled: 0,
      };
    }
    const itemImageList = [];
    if (storeInfo.salesSystem === 'yesSales') {
      popupStoreRequest.popupStoreItemList = salesInfo.map((item) => {
        const { imgUrl, ...itemWithoutImage } = item;
        itemImageList.push(imgUrl);
        return itemWithoutImage;
      });
    }
    setStoreRequest(popupStoreRequest);
    setStoreItemImageList(itemImageList);
    setStoreImageList(storeInfo.storeImageFilesData);
    setReadySend(true);
  }, [storeInfo, reservationInfo, salesInfo]);

  useEffect(() => {
    const formData = new FormData();
    formData.append(
      'storeInfo',
      new Blob([JSON.stringify(storeRequest)], {
        type: 'application/json',
      }),
    );

    storeItemImageList.forEach((image, index) => {
      formData.append('storeItemImageFiles', image);
    });
    storeImageList.forEach((image, index) => {
      formData.append('storeImageFiles', image);
    });

    if (readySend === true) {
      setCurrentForm('loading');

      MultipartAxios.post('popup-stores/new', formData)
        .then((response) => {
          console.log(response.data);
          setCurrentForm('complete');
          navigate('/overview/list');
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [readySend, storeImageList, storeItemImageList, storeRequest, navigate]);

  useEffect(() => {
    if (storeStatus && reservationStatus && salesStatus) {
      createStoreDetailRequest();
    }
  }, [storeStatus, reservationStatus, salesStatus, createStoreDetailRequest]);

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
      handleStepToggle(1);
    }
  }, [reservation, sales]);

  const handleStepToggle = (steps) => {
    setActiveStep((prevActiveStep) => prevActiveStep + steps);
  };
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
      navigate('/overview/list');
    }
  };

  const handleCancelSales = () => {
    setSalesStatus(true);
    setSales('noSales');
    navigate('/overview/list');
  };

  const handleSalesChange = () => {
    return;
  };

  const handleReservationChange = () => {
    return;
  };

  useEffect(() => {
    const confirmExit = (e) => {
      e.returnValue = '';
      return '';
    };
    window.addEventListener('beforeunload', confirmExit);
    return () => {
      window.removeEventListener('beforeunload', confirmExit);
    };
  }, []);

  return (
    <div>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = <Typography variant="caption">선택사항</Typography>;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {currentForm === 'loading' && <Loading />}
      {currentForm === 'info' && (
        <StoreInfoForm
          viewInfo={{}}
          onUserChoice={handleUserChoice}
          addStore={addStoreInfo}
          notifyReservationChange={handleReservationChange}
          notifySalesChange={handleSalesChange}
          stepToggle={handleStepToggle}
        />
      )}
      {currentForm === 'reservation' && (
        <StoreReservationForm
          viewInfo={{}}
          onUserChoice={reservationFormSubmitted}
          sales={sales}
          addReservation={addReservationInfo}
          cancelReservation={handleCancelReservation}
          isUsingReservation={reservationStatus}
          stepToggle={handleStepToggle}
        />
      )}
      {currentForm === 'items' && (
        <StoreItemsForm
          viewInfo={{}}
          addSales={addSalesInfo}
          cancelSales={handleCancelSales}
          isUsingSales={salesStatus}
          stepToggle={handleStepToggle}
        />
      )}
    </div>
  );
}

export default StoreCreate;
