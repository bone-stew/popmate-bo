import {
  InputAdornment,
  Table,
  TableContainer,
  TableCell,
  TextField,
  TableRow,
  Paper,
  IconButton,
  Stack,
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { DatePicker, TimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import styles from './StoreCreate.module.css';
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageIcon from '@mui/icons-material/Image';
import CancelIcon from '@mui/icons-material/Cancel';

function StoreInfoForm({
  viewInfo,
  testData,
  onUserChoice,
  addStore,
  notifyReservationChange,
  notifySalesChange,
  stepToggle,
}) {
  const today = dayjs();
  const midnight = dayjs().startOf('day');
  const [title, setStoreTitle] = useState('');
  const [openDate, setOpenDate] = useState(today);
  const [closeDate, setCloseDate] = useState(today.add(1, 'day'));
  const [openTime, setOpenTime] = useState(midnight.add(12, 'hour'));
  const [closeTime, setCloseTime] = useState(midnight.add(1, 'day'));
  const [department, setDepartment] = useState('');
  const [priceRadio, setPriceRadio] = useState('무료');
  const [entryFee, setEntryFee] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [placeDetail, setPlaceDetail] = useState('');
  const [description, setDescription] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [reservationEnabled, setReservationEnabled] = useState(true);
  const [storeImages, setStoreImages] = useState([]);
  const [storeImageFiles, setStoreImageFiles] = useState([]);
  const [website, setWebsite] = useState('');
  const [instagram, setInstagram] = useState('');
  const [youtube, setYoutube] = useState('');
  const [reservationSystem, setReservationSystem] = useState('yesReservation');
  const [salesSystem, setSalesSystem] = useState('yesSales');
  const [bannerImage, setBannerImage] = useState(null);
  const [bannerImageFile, setBannerImageFile] = useState(null);
  const [staffId, setStaffId] = useState('');
  const [storeImageObjects, setStoreImageObjects] = useState([]);

  useEffect(() => {
    if (Object.keys(viewInfo).length !== 0) {
      setStoreTitle(viewInfo.title);
      setOpenDate(dayjs(viewInfo.openDate));
      setCloseDate(dayjs(viewInfo.closeDate));
      setOpenTime(dayjs(viewInfo.openTime));
      setCloseTime(dayjs(viewInfo.closeTime));
      setPlaceDetail(viewInfo.placeDetail);
      setDepartment(viewInfo.department.departmentId);
      setStaffId(viewInfo.user.userId);
      setPriceRadio(viewInfo.entryFee === 0 ? '무료' : '유료');
      setEntryFee(viewInfo.setEntryFee);
      setOrganizer(viewInfo.organizer);
      let imgUrls = viewInfo.popupStoreImgResponse.map((item) => item.imgUrl);
      setBannerImage(viewInfo.bannerImgUrl);
      setStoreImages(imgUrls);
      setStoreImageObjects(viewInfo.popupStoreImgResponse);
      setDescription(viewInfo.description);
      setEventDescription(viewInfo.eventDescription !== null ? viewInfo.eventDescription : '');
      setReservationEnabled(viewInfo.reservationEnabled);
      setReservationSystem(viewInfo.reservationEnabled === true ? 'yesReservation' : 'noReservation');
      setSalesSystem(viewInfo.salesEnabled === true ? 'yesSales' : 'noSales');
      if (viewInfo.popupStoreSnsResponse.length > 0) {
        viewInfo.popupStoreSnsResponse.forEach((item) => {
          if (item.platform === 'Website') {
            setWebsite(item.url);
          } else if (item.platform === 'Youtube') {
            setYoutube(item.url);
          } else if (item.platform === 'Instagram') {
            setInstagram(item.url);
          }
        });
      }
    }
  }, [viewInfo]);

  useEffect(() => {
    if (Object.keys(testData).length !== 0) {
      setStoreTitle(testData.title);
      setOpenDate(dayjs(testData.openDate));
      setCloseDate(dayjs(testData.closeDate));
      setOpenTime(dayjs(testData.openTime));
      setCloseTime(dayjs(testData.closeTime));
      setPlaceDetail(testData.placeDetail);
      setDepartment(testData.department.departmentId);
      setStaffId(testData.user.userId);
      setPriceRadio(testData.entryFee === 0 ? '무료' : '유료');
      setEntryFee(testData.setEntryFee);
      setOrganizer(testData.organizer);
      setDescription(testData.description);
      setEventDescription(testData.eventDescription !== null ? testData.eventDescription : '');
      setReservationEnabled(testData.reservationEnabled);
      setReservationSystem(testData.reservationEnabled === true ? 'yesReservation' : 'noReservation');
      setSalesSystem(testData.salesEnabled === true ? 'yesSales' : 'noSales');
      if (testData.popupStoreSnsResponse.length > 0) {
        testData.popupStoreSnsResponse.forEach((item) => {
          if (item.platform === 'Website') {
            setWebsite(item.url);
          } else if (item.platform === 'Youtube') {
            setYoutube(item.url);
          } else if (item.platform === 'Instagram') {
            setInstagram(item.url);
          }
        });
      }
    }
  }, [testData]);

  StoreInfoForm.getData = () => {
    const storeImagesData = [bannerImage, ...storeImages];
    const storeImageFilesData = [bannerImageFile, ...storeImageFiles];
    var bannerImageObject = null;
    if (bannerImageFile == null) {
      bannerImageObject = bannerImage;
    } else {
      bannerImageObject = bannerImageFile;
    }
    const storeImageObjectsData = [bannerImageObject, ...storeImageObjects];
    const storeData = {
      title,
      openDate,
      closeDate,
      openTime,
      closeTime,
      department,
      staffId,
      priceRadio,
      entryFee,
      organizer,
      placeDetail,
      description,
      eventDescription,
      reservationEnabled,
      reservationSystem,
      storeImageFilesData,
      website,
      instagram,
      youtube,
      salesSystem,
      storeImagesData,
      storeImageObjectsData,
    };
    return storeData;
  };

  useEffect(() => {
    notifyReservationChange(reservationSystem);
    notifySalesChange(salesSystem);
  }, [reservationSystem, salesSystem, notifyReservationChange, notifySalesChange]);

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  const handleStoreNameChange = (event) => {
    setStoreTitle(event.target.value);
  };

  const handleOpenDateChange = (newValue) => {
    setOpenDate(newValue);
  };

  const handleCloseDateChange = (newValue) => {
    setCloseDate(newValue);
  };

  const handleOpenTimeChange = (newValue) => {
    setOpenTime(newValue);
  };

  const handleCloseTimeChange = (newValue) => {
    setCloseTime(newValue);
  };

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };

  const handleStaffChange = (event) => {
    setStaffId(event.target.value);
  };

  const handlePriceRadioChange = (event) => {
    setPriceRadio(event.target.value);
  };

  const handleEntryFeeChange = (event) => {
    setEntryFee(event.target.value);
  };

  const handleOrganizerChange = (event) => {
    setOrganizer(event.target.value);
  };
  const handlePlaceDetailChange = (event) => {
    setPlaceDetail(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleEventDescriptionChange = (event) => {
    setEventDescription(event.target.value);
  };
  const handleWebsiteChange = (event) => {
    setWebsite(event.target.value);
  };
  const handleInstagramChange = (event) => {
    setInstagram(event.target.value);
  };
  const handleYoutubeChange = (event) => {
    setYoutube(event.target.value);
  };

  const handleReservationChange = (event) => {
    setReservationSystem(event.target.value);
    if (event.target.value === 'yesReservation') {
      setReservationEnabled(true);
    } else {
      setReservationEnabled(false);
    }
  };

  const checkFileSize = (fileSize) => {
    const maxSize = 1024 * 1024; // 1MB (adjust as needed)
    if (fileSize > maxSize) {
      alert('파일 크기는 최대 1MB입니다');
      return false;
    }
    return true;
  };

  const handleSalesChange = (event) => {
    setSalesSystem(event.target.value);
  };

  const handleBannerImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage && checkFileSize(selectedImage.size)) {
      setBannerImage(URL.createObjectURL(selectedImage));
      setBannerImageFile(selectedImage);
    }
  };

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];

    if (selectedImage && checkFileSize(selectedImage.size)) {
      if (storeImages.length >= 6) {
        alert('스토어 이미지는 최대 6개만 업로드 할 수 있습니다.');
        return;
      }
      setStoreImageFiles([...storeImageFiles, selectedImage]);
      setStoreImages([...storeImages, URL.createObjectURL(selectedImage)]);
      setStoreImageObjects([...storeImageObjects, selectedImage]);
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    const updatedImageUrls = storeImages.filter((_, index) => index !== indexToRemove);
    const updatedImageFiles = storeImageFiles.filter((_, index) => index !== indexToRemove);
    const updatedImageObjects = storeImageObjects.filter((_, index) => index !== indexToRemove);
    setStoreImages(updatedImageUrls);
    setStoreImageFiles(updatedImageFiles);
    setStoreImageObjects(updatedImageObjects);
  };

  const handleNextButtonClick = () => {
    if (
      title === '' ||
      openDate === '' ||
      closeDate === '' ||
      openTime === '' ||
      closeTime === '' ||
      department === '' ||
      staffId === '' ||
      priceRadio === '' ||
      (priceRadio === '유료' && entryFee === '') ||
      organizer === '' ||
      placeDetail === '' ||
      description === '' ||
      (reservationSystem === 'yesReservation' && storeImages.length === 0) ||
      bannerImage === null
    ) {
      alert('필수 항목을 기입해주세요');
      return;
    }

    const columnSizeLimits = {
      small: 255,
      long: 2000,
    };

    const validationErrors = {};

    if (title.length > columnSizeLimits.small) {
      validationErrors.title = '팝업스토어명이 너무 깁니다.';
    }
    if (placeDetail.length > columnSizeLimits.small) {
      validationErrors.placeDetail = '상세 장소가 너무 깁니다.';
    }
    if (description.length > columnSizeLimits.long) {
      validationErrors.description = '상세 설명이 너무 깁니다.';
    }
    if (eventDescription.length > columnSizeLimits.long) {
      validationErrors.eventDescription = '이벤트 정보가 너무 깁니다.';
    }
    if (website.length > columnSizeLimits.small) {
      validationErrors.website = '웹사이트 URL이 너무 깁니다.';
    }
    if (instagram.length > columnSizeLimits.small) {
      validationErrors.instagram = '인스타그램 URL이 너무 깁니다.';
    }
    if (youtube.length > columnSizeLimits.small) {
      validationErrors.youtube = '유튜브 URL이 너무 깁니다.';
    }

    if (Object.keys(validationErrors).length > 0) {
      if (validationErrors.title) {
        alert(validationErrors.title);
      }
      if (validationErrors.placeDetail) {
        alert(validationErrors.placeDetail);
      }
      if (validationErrors.description) {
        alert(validationErrors.description);
      }
      if (validationErrors.eventDescription) {
        alert(validationErrors.eventDescription);
      }
      if (validationErrors.website) {
        alert(validationErrors.website);
      }
      if (validationErrors.instagram) {
        alert(validationErrors.instagram);
      }
      if (validationErrors.youtube) {
        alert(validationErrors.youtube);
      }
      return;
    }

    onUserChoice(reservationSystem, salesSystem);
    const storeImageFilesData = [bannerImageFile, ...storeImageFiles];

    const storeData = {
      title,
      openDate,
      closeDate,
      openTime,
      closeTime,
      department,
      staffId,
      priceRadio,
      entryFee,
      organizer,
      placeDetail,
      description,
      eventDescription,
      reservationEnabled,
      reservationSystem,
      storeImageFilesData,
      website,
      instagram,
      youtube,
      salesSystem,
    };
    addStore(storeData);
    stepToggle(1);
  };

  return (
    <div className="styles.container">
      <h2>팝업스토어 상세정보를 입력하세요</h2>
      <Paper variant="outlined" sx={{ padding: '2rem' }} square={false} elevation={1}>
        <TableContainer>
          <Table variant={'outlined'}>
            <TableRow>
              <TableCell className={styles.table}>
                팝업스토어명<span style={{ color: 'red' }}> *</span>
              </TableCell>
              <TableCell className={styles.table}>
                <FormControl fullWidth>
                  <OutlinedInput
                    value={title}
                    onChange={handleStoreNameChange}
                    placeholder="팝업스토어명을 입렵해주세요"
                  />
                </FormControl>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={styles.table}>
                팝업스토어 운영기간<span style={{ color: 'red' }}> *</span>
              </TableCell>
              <TableCell className={styles.table}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker value={openDate} onChange={handleOpenDateChange} />
                  </LocalizationProvider>
                  <span style={{ margin: '0 0.3rem' }}>~</span>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker value={closeDate} onChange={handleCloseDateChange} />
                  </LocalizationProvider>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={styles.table}>
                팝업스토어 영업시간<span style={{ color: 'red' }}> *</span>
              </TableCell>
              <TableCell className={styles.table}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker value={openTime} onChange={handleOpenTimeChange} />
                  </LocalizationProvider>
                  <span style={{ margin: '0 0.3rem' }}>~</span>
                  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="koKR">
                    <TimePicker value={closeTime} onChange={handleCloseTimeChange} />
                  </LocalizationProvider>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={styles.table}>
                운영지점<span style={{ color: 'red' }}> *</span>
              </TableCell>
              <TableCell className={styles.table}>
                <FormControl fullWidth>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={department}
                    onChange={handleDepartmentChange}
                    displayEmpty
                  >
                    <MenuItem value="">
                      <em>지점 선택 없음</em>
                    </MenuItem>
                    <MenuItem value={'1'}>더현대 서울</MenuItem>
                    <MenuItem value={'2'}>판교점</MenuItem>
                    <MenuItem value={'3'}>더현대 대구</MenuItem>
                    <MenuItem value={'4'}>천호점</MenuItem>
                    <MenuItem value={'5'}>신촌점</MenuItem>
                    <MenuItem value={'6'}>미아점</MenuItem>
                    <MenuItem value={'7'}>목동점</MenuItem>
                    <MenuItem value={'8'}>중동점</MenuItem>
                    <MenuItem value={'9'}>압구정본점</MenuItem>
                    <MenuItem value={'10'}>킨텍스점</MenuItem>
                    <MenuItem value={'11'}>디큐브시티</MenuItem>
                    <MenuItem value={'12'}>부산점</MenuItem>
                    <MenuItem value={'13'}>무역센터점</MenuItem>
                    <MenuItem value={'14'}>울산점</MenuItem>
                    <MenuItem value={'15'}>울산동구점</MenuItem>
                    <MenuItem value={'16'}>충청점</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={styles.table}>
                담당 스태프<span style={{ color: 'red' }}> *</span>
              </TableCell>
              <TableCell className={styles.table}>
                <FormControl fullWidth>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={staffId}
                    onChange={handleStaffChange}
                    displayEmpty
                  >
                    <MenuItem value="">
                      <em>스태프 선택 없음</em>
                    </MenuItem>
                    <MenuItem value={'75'}>staff_김우원</MenuItem>
                    <MenuItem value={'999'}>staff_조재룡</MenuItem>
                    <MenuItem value={'333'}>staff_조상원</MenuItem>
                    <MenuItem value={'555'}>staff_서명현</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={styles.table}>
                상세 장소<span style={{ color: 'red' }}> *</span>
              </TableCell>
              <TableCell className={styles.table}>
                <FormControl fullWidth>
                  <OutlinedInput
                    value={placeDetail}
                    onChange={handlePlaceDetailChange}
                    placeholder="상세장소를 입력해주세요"
                  />
                </FormControl>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={styles.table}>
                입장료<span style={{ color: 'red' }}> *</span>
              </TableCell>
              <TableCell className={styles.table}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <RadioGroup row value={priceRadio} onChange={handlePriceRadioChange}>
                    <FormControlLabel value="무료" control={<Radio />} label="무료" />
                    <FormControlLabel value="유료" control={<Radio />} label="유료" />
                  </RadioGroup>
                  <FormControl style={{ flex: '70%' }}>
                    <OutlinedInput
                      onChange={handleEntryFeeChange}
                      placeholder="금액을 입력해주세요"
                      type="number"
                      disabled={priceRadio === '무료'}
                      value={entryFee}
                      endAdornment={<InputAdornment position="end">원</InputAdornment>}
                    />
                  </FormControl>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={styles.table}>
                주최사<span style={{ color: 'red' }}> *</span>
              </TableCell>
              <TableCell className={styles.table}>
                <FormControl fullWidth>
                  <OutlinedInput
                    value={organizer}
                    onChange={handleOrganizerChange}
                    placeholder="주최사를 입력해주세요"
                  />
                </FormControl>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={styles.table}>
                대표 이미지<span style={{ color: 'red' }}> *</span>
              </TableCell>
              <TableCell className={styles.table}>
                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {bannerImage && (
                      <img
                        style={{ maxWidth: '10rem', maxHeight: '10rem', borderRadius: '10px' }}
                        src={bannerImage}
                        alt={`store item`}
                      />
                    )}
                    <Button
                      component="label"
                      variant="contained"
                      startIcon={<ImageIcon />}
                      sx={{
                        marginTop: '1em',
                      }}
                    >
                      이미지 첨부하기
                      <VisuallyHiddenInput type="file" onChange={handleBannerImageUpload} />
                    </Button>
                  </div>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ minWidth: '10rem' }} className={styles.table}>
                스토어 이미지<span style={{ color: 'red' }}> *</span>
              </TableCell>
              <TableCell className={styles.table}>
                <Paper
                  sx={{
                    maxWidth: '45rem',
                  }}
                >
                  <Stack direction="row" alignItems="flex-start">
                    <IconButton
                      component="label"
                      variant="contained"
                      className={styles.imageList}
                      sx={{
                        margin: '2em 0.2em',
                        marginLeft: '0.5em',
                        borderRadius: '5px',
                        border: '1px solid #C1BCC0',
                        padding: '2em',
                      }}
                    >
                      <AddRoundedIcon />
                      <VisuallyHiddenInput type="file" accept="image/*" onChange={handleImageUpload} />
                    </IconButton>
                    <ImageList
                      sx={{
                        margin: '2.5em 0.5em',
                        gridAutoFlow: 'column',
                        gridTemplateColumns: 'repeat(auto-fill,minmax(10rem,2fr)) !important',
                        gridAutoColumns: 'minmax(10rem, 2fr)',
                        overflowX: 'auto',
                      }}
                    >
                      {storeImages.map((userImage, index) => (
                        <ImageListItem
                          sx={{
                            marginRight: '0.5rem',
                            maxWidth: '10rem',
                            maxHeight: '10rem',
                          }}
                          key={index}
                        >
                          <img className={styles.image} src={userImage} alt={`store ${index}`} />
                          <CancelIcon
                            width="2rem"
                            className={styles.imgDeleteButton}
                            onClick={() => handleRemoveImage(index)}
                          />
                        </ImageListItem>
                      ))}
                    </ImageList>
                  </Stack>
                </Paper>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={styles.table}>
                상세 설명<span style={{ color: 'red' }}> *</span>
              </TableCell>
              <TableCell className={styles.table}>
                <FormControl fullWidth>
                  <TextField
                    onChange={handleDescriptionChange}
                    value={description}
                    placeholder="상세 설명을 입력해주세요"
                    multiline
                    rows={7}
                  />
                </FormControl>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={styles.table}>이벤트 정보</TableCell>
              <TableCell className={styles.table}>
                <FormControl fullWidth>
                  <TextField
                    onChange={handleEventDescriptionChange}
                    value={eventDescription}
                    placeholder="진행되는 이벤트 내용을 입력해주세요"
                    multiline
                    rows={7}
                  />
                </FormControl>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={styles.table}>웹사이트 URL</TableCell>
              <TableCell className={styles.table}>
                <FormControl fullWidth>
                  <OutlinedInput value={website} onChange={handleWebsiteChange} placeholder="URL을 입력해주세요" />
                </FormControl>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={styles.table}>인스타그램 URL</TableCell>
              <TableCell className={styles.table}>
                <FormControl fullWidth>
                  <OutlinedInput value={instagram} onChange={handleInstagramChange} placeholder="URL을 입력해주세요" />
                </FormControl>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={styles.table}>유튜브 URL</TableCell>
              <TableCell className={styles.table}>
                <FormControl fullWidth>
                  <OutlinedInput value={youtube} onChange={handleYoutubeChange} placeholder="URL을 입력해주세요" />
                </FormControl>
              </TableCell>
            </TableRow>
          </Table>
        </TableContainer>
      </Paper>

      <div style={{ marginTop: '3rem' }}>
        <div>
          <h3>팝업스토어 예약 시스템을 이용하시겠습니까?</h3>
          <RadioGroup row value={reservationSystem} onChange={handleReservationChange}>
            <FormControlLabel value="yesReservation" control={<Radio />} label="네" />
            <FormControlLabel value="noReservation" control={<Radio />} label="아니요" />
          </RadioGroup>
        </div>
        <div>
          <h3>팝업스토어 상품 판매 시스템을 이용하시겠습니까?</h3>
          <RadioGroup row value={salesSystem} onChange={handleSalesChange}>
            <FormControlLabel value="yesSales" control={<Radio />} label="네" />
            <FormControlLabel value="noSales" control={<Radio />} label="아니요" />
          </RadioGroup>
        </div>
        {Object.keys(viewInfo).length === 0 && (
          <div style={{ textAlign: 'center', marginTop: '5rem', marginBottom: '5rem' }}>
            <Button
              type="button"
              variant="contained"
              sx={{ borderRadius: 28, padding: '0.8rem 2rem' }}
              onClick={handleNextButtonClick}
            >
              {salesSystem === 'yesSales' || reservationSystem === 'yesReservation' ? '다음보기' : '팝업스토어 등록'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default StoreInfoForm;
