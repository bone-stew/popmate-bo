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
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp';

function StoreInfoForm({ onUserChoice }) {
  const today = dayjs();
  const [title, setStoreTitle] = useState('');
  const [openDate, setOpenDate] = useState(today);
  const [closeDate, setCloseDate] = useState(today);
  const [openTime, setOpenTime] = useState(today);
  const [closeTime, setCloseTime] = useState(today);
  const [department, setDepartment] = useState('');
  const [priceRadio, setPriceRadio] = useState('무료');
  const [entryFee, setEntryFee] = useState('금액을 입력해주세요');
  const [organizer, setOrganizer] = useState('');
  const [placeDetail, setPlaceDetail] = useState('');
  const [description, setDescription] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [reservationEnabled, setReservationEnabled] = useState(false);
  const [userImages, setUserImage] = useState([]);
  const [website, setWebsite] = useState('');
  const [instagram, setInstagram] = useState('');
  const [youtube, setYoutube] = useState('');
  const [reservationSystem, setReservationSystem] = useState('yesReservation');
  const [salesSystem, setSalesSystem] = useState('yesSales');

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

  // const handleOpenDateChange = (event) => {
  //   setOpenDate(event.target.value);
  // };

  // const handleCloseDateChange = (event) => {
  //   setCloseDate(event.target.value);
  // };

  // const handleOpenTimeChange = (event) => {
  //   setOpenTime(event.target.value);
  // };

  // const handleCloseTimeChange = (event) => {
  //   setCloseTime(event.target.value);
  // };

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
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
    setReservationEnabled(true);
  };

  const handleSalesChange = (event) => {
    setSalesSystem(event.target.value);
  };

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      setUserImage([...userImages, URL.createObjectURL(selectedImage)]);
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    const updatedImageUrls = userImages.filter((_, index) => index !== indexToRemove);
    setUserImage(updatedImageUrls);
  };

  const handleNextButtonClick = () => {
    onUserChoice(reservationSystem, salesSystem);
  };

  return (
    <div className="styles.container">
      <h2>팝업스토어 상세정보를 입력하세요</h2>
      <Paper variant="outlined" sx={{ padding: '2rem' }} square={false} elevation={0.5}>
        <TableContainer>
          <Table variant={'outlined'}>
            <TableRow>
              <TableCell className={styles.table}>
                팝업스토어명<span style={{ color: 'red' }}> (*)</span>
              </TableCell>
              <TableCell className={styles.table}>
                <FormControl fullWidth>
                  <OutlinedInput onChange={handleStoreNameChange} placeholder="팝업스토어명을 입렵해주세요" />
                </FormControl>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={styles.table}>
                팝업스토어 운영기간<span style={{ color: 'red' }}> (*)</span>
              </TableCell>
              <TableCell className={styles.table}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker value={openDate} onChange={(newValue) => setOpenDate(newValue)} />
                  </LocalizationProvider>
                  <span style={{ margin: '0 8px' }}>~</span>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker value={closeDate} onChange={(newValue) => setCloseDate(newValue)} />
                  </LocalizationProvider>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={styles.table}>
                팝업스토어 영업시간<span style={{ color: 'red' }}> (*)</span>
              </TableCell>
              <TableCell className={styles.table}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker value={openTime} onChange={(newValue) => setOpenTime(newValue)} />
                  </LocalizationProvider>
                  <span style={{ margin: '0 8px' }}>~</span>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker value={closeTime} onChange={(newValue) => setCloseTime(newValue)} />
                  </LocalizationProvider>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={styles.table}>
                운영지점<span style={{ color: 'red' }}> (*)</span>
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
                    <MenuItem value={'더현대서울'}>더현대 서울</MenuItem>
                    <MenuItem value={'압구정본점'}>압구정본점</MenuItem>
                    <MenuItem value={'무역센터점'}>무역센터점</MenuItem>
                    <MenuItem value={'천호점'}>천호점</MenuItem>
                    <MenuItem value={'신촌점'}>신촌점</MenuItem>
                    <MenuItem value={'미아점'}>미아점</MenuItem>
                    <MenuItem value={'목동점'}>목동점</MenuItem>
                    <MenuItem value={'중동점'}>중동점</MenuItem>
                    <MenuItem value={'판교점'}>판교점</MenuItem>
                    <MenuItem value={'킨텍스점'}>킨텍스점</MenuItem>
                    <MenuItem value={'디큐브시티'}>디큐브시티</MenuItem>
                    <MenuItem value={'부산점'}>부산점</MenuItem>
                    <MenuItem value={'더현대대구'}>더현대 대구</MenuItem>
                    <MenuItem value={'울산점'}>울산점</MenuItem>
                    <MenuItem value={'울산동구점'}>울산동구점</MenuItem>
                    <MenuItem value={'충청점'}>충청점</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={styles.table}>
                상세 장소<span style={{ color: 'red' }}> (*)</span>
              </TableCell>
              <TableCell className={styles.table}>
                <FormControl fullWidth>
                  <OutlinedInput onChange={handlePlaceDetailChange} placeholder="상세장소를 입력해주세요" />
                </FormControl>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={styles.table}>
                입장료<span style={{ color: 'red' }}> (*)</span>
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
                주최사<span style={{ color: 'red' }}> (*)</span>
              </TableCell>
              <TableCell className={styles.table}>
                <FormControl fullWidth>
                  <OutlinedInput onChange={handleOrganizerChange} placeholder="주최사를 입력해주세요" />
                </FormControl>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={styles.table}>
                스토어 이미지<span style={{ color: 'red' }}> (*)</span>
              </TableCell>
              <TableCell className={styles.table}>
                <Paper
                  sx={{
                    maxWidth: '45rem',
                  }}
                >
                  <Stack direction="row" alignItems="flex-start">
                    <ImageList
                      sx={{
                        gridAutoFlow: 'column',
                        gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr)) !important',
                        gridAutoColumns: 'minmax(160px, 1fr)',
                        overflowX: 'auto',
                      }}
                    >
                      {userImages.map((userImage, index) => (
                        <ImageListItem sx={{ maxWidth: 200 }} key={index}>
                          <img src={userImage} alt={`store ${index}`} />
                          <HighlightOffSharpIcon
                            width="25px"
                            className={styles.imgDeleteButton}
                            onClick={() => handleRemoveImage(index)}
                          />
                        </ImageListItem>
                      ))}
                    </ImageList>
                    <IconButton
                      component="label"
                      variant="contained"
                      className={styles.imageList}
                      sx={{
                        margin: '2em 0.5em',
                        marginLeft: 'auto',
                        borderRadius: '5px',
                        border: '1px solid #C1BCC0',
                        padding: '2em',
                      }}
                    >
                      <AddRoundedIcon />
                      <VisuallyHiddenInput type="file" onChange={handleImageUpload} />
                    </IconButton>
                  </Stack>
                </Paper>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={styles.table}>
                상세 설명<span style={{ color: 'red' }}> (*)</span>
              </TableCell>
              <TableCell className={styles.table}>
                <FormControl fullWidth>
                  <TextField
                    onChange={handleDescriptionChange}
                    placeholder="상세 설명을 입력해주세요"
                    multiline
                    rows={7}
                    maxRows={7}
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
                    placeholder="진행되는 이벤트 내용을 입력해주세요"
                    multiline
                    rows={7}
                    maxRows={7}
                  />
                </FormControl>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={styles.table}>웹사이트 URL</TableCell>
              <TableCell className={styles.table}>
                <FormControl fullWidth>
                  <OutlinedInput onChange={handleWebsiteChange} placeholder="URL을 입력해주세요" />
                </FormControl>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={styles.table}>인스타그램 URL</TableCell>
              <TableCell className={styles.table}>
                <FormControl fullWidth>
                  <OutlinedInput onChange={handleInstagramChange} placeholder="URL을 입력해주세요" />
                </FormControl>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={styles.table}>유튜브 URL</TableCell>
              <TableCell className={styles.table}>
                <FormControl fullWidth>
                  <OutlinedInput onChange={handleYoutubeChange} placeholder="URL을 입력해주세요" />
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
        <div style={{ textAlign: 'center', marginTop: '5rem' }}>
          <Button type="button" variant="contained" sx={{ borderRadius: 28 }} onClick={handleNextButtonClick}>
            {salesSystem === 'yesSales' || reservationSystem === 'yesReservation' ? '다음보기' : '팝업스토어 등록'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default StoreInfoForm;
