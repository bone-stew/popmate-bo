import { TextField, Paper, Stack, Box } from '@mui/material';

import Button from '@mui/material/Button';
import styles from './StoreCreate.module.css';
import FormControl from '@mui/material/FormControl';
import { useState, useEffect } from 'react';

function StoreReservationForm({
  viewInfo,
  onUserChoice,
  sales,
  addReservation,
  cancelReservation,
  isUsingReservation,
  stepToggle,
}) {
  const [reservationInterval, setReservationInterval] = useState(0);
  const [maxCapacity, setMaxCapacity] = useState(0);
  const [intervalCapacity, setIntervalCapacity] = useState(15);
  const [teamSizeLimit, setTeamSizeLimit] = useState(5);
  const [disableInput, setDisableInput] = useState(isUsingReservation);
  useEffect(() => {
    if (Object.keys(viewInfo).length !== 0) {
      setReservationInterval(viewInfo.reservationInterval);
      setMaxCapacity(viewInfo.maxCapacity);
      setIntervalCapacity(viewInfo.intervalCapacity);
      setTeamSizeLimit(viewInfo.teamSizeLimit);
    }
  }, [viewInfo]);

  useEffect(() => {
    if (Object.keys(viewInfo).length !== 0) {
      if (isUsingReservation) {
        setDisableInput(false);
      } else {
        setDisableInput(true);
      }
    }
  }, [isUsingReservation, viewInfo]);

  StoreReservationForm.getData = () => {
    const reservationData = { reservationInterval, maxCapacity, intervalCapacity, teamSizeLimit };
    return reservationData;
  };

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
    if (reservationInterval === 0 || maxCapacity === 0 || intervalCapacity === 0 || teamSizeLimit === 0) {
      alert('모든 입력 필드를 작성해주세요');
      return;
    }

    const reservationData = { reservationInterval, maxCapacity, intervalCapacity, teamSizeLimit };
    addReservation(reservationData);
    onUserChoice();
    stepToggle(1);
  };

  const handleCancelReservation = () => {
    const userConfirmed = window.confirm('얘약 시스템을 사용하지 않고 스토어를 등록하시겠습니까?');
    if (userConfirmed) {
      cancelReservation('noReservation');
    } else {
      return;
    }
  };

  return (
    <div className={disableInput ? styles.reservationContainerDisabled : styles.reservationContainer}>
      {Object.keys(viewInfo).length !== 0 && <div style={{ marginTop: '5rem' }}></div>}

      <h2 style={{ textAlign: 'center', marginBottom: '3em' }}>팝업스토어 예약정보를 적어주세요</h2>
      <Paper sx={{ padding: 5 }}>
        <div className={disableInput && styles.disabled}>
          <p>예약받을 시간의 간격을 설정해주세요</p>
          <Stack direction="row" alignItems="center">
            <FormControl fullWidth>
              <TextField
                onChange={handleReservationChange}
                id="outlined-number"
                type="number"
                value={reservationInterval}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  inputProps: {
                    min: 0,
                  },
                }}
                disabled={disableInput}
              />
            </FormControl>
            <Box ml={1}>분</Box>
          </Stack>
        </div>
        <div className={disableInput && styles.disabled}>
          <p>매장에 몇 명까지 수용 가능한가요?</p>
          <Stack direction="row" alignItems="center">
            <FormControl fullWidth>
              <TextField
                onChange={handleMaxCapacityChange}
                id="outlined-number"
                type="number"
                value={maxCapacity}
                disabled={disableInput}
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
        <div className={disableInput && styles.disabled}>
          <p>예약 시간대별로 받을 예약 인원은 몇 명인가요?</p>
          <Stack direction="row" alignItems="center">
            <FormControl fullWidth>
              <TextField
                onChange={handleIntervalCapacityChange}
                id="outlined-number"
                type="number"
                value={intervalCapacity}
                disabled={disableInput}
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
        <div className={disableInput && styles.disabled}>
          <p>한 팀당 예약받을 수 있는 최대 인원은 몇 명인가요?</p>
          <Stack direction="row" alignItems="center">
            <FormControl fullWidth>
              <TextField
                onChange={handleTeamSizeLimitChange}
                id="outlined-number"
                type="number"
                value={teamSizeLimit}
                disabled={disableInput}
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

        {Object.keys(viewInfo).length === 0 && (
          <div>
            <div style={{ textAlign: 'center', marginTop: '5rem' }}>
              <Button
                type="button"
                variant="contained"
                sx={{ borderRadius: 28, padding: '0.8rem 2rem' }}
                onClick={handleNextButtonClick}
              >
                {sales === 'yesSales' ? '다음보기' : '팝업스토어 등록'}
              </Button>
            </div>
            <span
              style={{ textDecoration: 'none', textAlign: 'center', display: 'block', marginTop: '1rem' }}
              onClick={handleCancelReservation}
            >
              팝업스토어 예약 가능을 이용하지 않으시겠어요?
            </span>{' '}
          </div>
        )}
      </Paper>
      {Object.keys(viewInfo).length !== 0 && <div style={{ marginBottom: '5rem' }}></div>}
    </div>
  );
}

export default StoreReservationForm;
