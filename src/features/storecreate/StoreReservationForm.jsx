import { TextField, Paper } from '@mui/material';

import Button from '@mui/material/Button';

function StoreInfoForm() {
  return (
    <Paper>
      <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />

      <h2>팝업스토어 예약정보를 적어주세요</h2>
      <div>
        <p>예약받을 시간의 간격을 설정해주세요</p>
        <TextField
          id="outlined-number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        명
      </div>
      <div>
        <p>매장에 몇 명까지 수용 가능한가요?</p>
        <TextField
          id="outlined-number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        명
      </div>
      <div>
        <p>예약 시간대별로 받을 예약 인원은 몇 명명인가요?</p>
        <TextField
          id="outlined-number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        명
      </div>
      <div>
        <p>한 팀당 예약받을 수 있는 최대 인원은 몇 명인가요?</p>
        <TextField
          id="outlined-number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        명
      </div>
      <Button type="submit" variant="contained" sx={{ borderRadius: 28 }}>
        다음보기
      </Button>
      <a href="">팝업스토어 예약 가능을 이용하지 않으시겠어요?</a>
    </Paper>
  );
}

export default StoreInfoForm;
