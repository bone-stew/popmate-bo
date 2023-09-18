import { TextField, Paper, Stack, Box } from '@mui/material';

import Button from '@mui/material/Button';
import styles from './StoreCreate.module.css';
import FormControl from '@mui/material/FormControl';
import { useState } from 'react';

function StoreReservationForm({ onUserChoice, sales, addReservation, cancelReservation }) {
  const [reservationInterval, setReservationInterval] = useState(0);
  const [maxCapacity, setMaxCapacity] = useState(0);
  const [intervalCapacity, setIntervalCapacity] = useState(15);
  const [teamSizeLimit, setTeamSizeLimit] = useState(5);

  const handleReservationChange = (event) => {
    setReservationInterval(event.target.value);
  };

  const handleMaxCapacityChange = (event) => {
    setMaxCapacity(event.target.value);
  };

  const handleIntervalCapacityChange = (event) => {
    setIntervalCapacity(event.target.value);
  };

  const handleTeamSizeLimitChange = (event) => {
    setTeamSizeLimit(event.target.value);
  };

  const handleNextButtonClick = () => {
    console.log(reservationInterval, maxCapacity, intervalCapacity, teamSizeLimit);
    // if (sales === 'yesSales') {
    const reservationData = [reservationInterval, maxCapacity, intervalCapacity, teamSizeLimit];
    addReservation(reservationData);
    // } else {
    // send to server
    // }
    onUserChoice();
  };

  const handleCancelReservation = () => {
    cancelReservation('noReservation');
  };

  return (
    <div className={styles.reservationContainer}>
      <h2>팝업스토어 예약정보를 적어주세요</h2>
      <Paper sx={{ padding: 5 }}>
        <div>
          <p>예약받을 시간의 간격을 설정해주세요</p>
          <Stack direction="row" alignItems="center">
            <FormControl fullWidth>
              <TextField
                onChange={handleReservationChange}
                id="outlined-number"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  inputProps: {
                    min: 0,
                  },
                }}
              />
            </FormControl>
            <Box ml={1}>분</Box>
          </Stack>
        </div>
        <div>
          <p>매장에 몇 명까지 수용 가능한가요?</p>
          <Stack direction="row" alignItems="center">
            <FormControl fullWidth>
              <TextField
                onChange={handleMaxCapacityChange}
                id="outlined-number"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  inputProps: {
                    min: 0,
                  },
                }}
              />
            </FormControl>
            <Box ml={1}>명</Box>
          </Stack>
        </div>
        <div>
          <p>예약 시간대별로 받을 예약 인원은 몇 명명인가요?</p>
          <Stack direction="row" alignItems="center">
            <FormControl fullWidth>
              <TextField
                onChange={handleIntervalCapacityChange}
                id="outlined-number"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  inputProps: {
                    min: 0,
                  },
                }}
              />
            </FormControl>
            <Box ml={1}>명</Box>
          </Stack>
        </div>
        <div>
          <p>한 팀당 예약받을 수 있는 최대 인원은 몇 명인가요?</p>
          <Stack direction="row" alignItems="center">
            <FormControl fullWidth>
              <TextField
                onChange={handleTeamSizeLimitChange}
                id="outlined-number"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  inputProps: {
                    min: 0,
                  },
                }}
              />
            </FormControl>
            <Box ml={1}>명</Box>
          </Stack>
        </div>
        <div style={{ textAlign: 'center', marginTop: '5rem' }}>
          <Button type="button" variant="contained" sx={{ borderRadius: 28 }} onClick={handleNextButtonClick}>
            {sales === 'yesSales' ? '다음보기' : '팝업스토어 등록'}
          </Button>
        </div>

        <span
          style={{ textDecoration: 'none', textAlign: 'center', display: 'block', marginTop: '1rem' }}
          onClick={handleCancelReservation}
        >
          팝업스토어 예약 가능을 이용하지 않으시겠어요?
        </span>
      </Paper>
    </div>
  );
}

export default StoreReservationForm;
