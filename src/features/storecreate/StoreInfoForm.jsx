import { Table, TableContainer, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { DatePicker, DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';

function StoreInfoForm() {
  return (
    <div>
      <h2>팝업스토어 상세정보를 입력하세요</h2>
      <Paper>
        <TableContainer>
          <Table>
            <TableRow>
              <TableCell>팝업스토어명</TableCell>
              <TableCell>
                <FormControl sx={{ width: '25ch' }}>
                  <OutlinedInput placeholder="Please enter text" />
                  {/* <MyFormHelperText /> */}
                </FormControl>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>팝업스토어 운영기간</TableCell>
              <TableCell>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker label="Uncontrolled picker" defaultValue={dayjs('2022-04-17')} />
                </LocalizationProvider>
                ~
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker label="Uncontrolled picker" defaultValue={dayjs('2022-04-17')} />
                </LocalizationProvider>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>팝업스토어 영업시간</TableCell>
              <TableCell>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker label="Uncontrolled picker" defaultValue={dayjs('2022-04-17T15:30')} />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker label="Uncontrolled picker" defaultValue={dayjs('2022-04-17T15:30')} />
                </LocalizationProvider>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>운영지점</TableCell>
              <TableCell>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={age}
                  label="Age"
                  // onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>입장료</TableCell>
              <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
                <FormControlLabel value="무료" control={<Radio />} label="Female" />
                <FormControlLabel value="유료" control={<Radio />} label="Male" />
              </RadioGroup>
              <FormControl sx={{ width: '25ch' }}>
                <OutlinedInput placeholder="Please enter text" />
                {/* <MyFormHelperText /> */}
              </FormControl>
            </TableRow>
            <TableRow>
              <TableCell>주최사</TableCell>
              <TableCell>
                <FormControl sx={{ width: '25ch' }}>
                  <OutlinedInput placeholder="Please enter text" />
                  {/* <MyFormHelperText /> */}
                </FormControl>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>스토어 이미지</TableCell>
              <TableCell>
                <input type="file" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>상세 설명</TableCell>
              <TableCell>
                <FormControl sx={{ width: '25ch' }}>
                  <OutlinedInput placeholder="Please enter text" />
                  {/* <MyFormHelperText /> */}
                </FormControl>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>이벤트 정보</TableCell>
              <TableCell>
                <FormControl sx={{ width: '25ch' }}>
                  <OutlinedInput placeholder="Please enter text" />
                  {/* <MyFormHelperText /> */}
                </FormControl>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>웹사이트 URL</TableCell>
              <TableCell>
                <FormControl sx={{ width: '25ch' }}>
                  <OutlinedInput placeholder="Please enter text" />
                  {/* <MyFormHelperText /> */}
                </FormControl>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>인스타그램 URL</TableCell>
              <TableCell>
                <FormControl sx={{ width: '25ch' }}>
                  <OutlinedInput placeholder="Please enter text" />
                  {/* <MyFormHelperText /> */}
                </FormControl>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>유튜브 URL</TableCell>
              <TableCell>
                <FormControl sx={{ width: '25ch' }}>
                  <OutlinedInput placeholder="Please enter text" />
                  {/* <MyFormHelperText /> */}
                </FormControl>
              </TableCell>
            </TableRow>
          </Table>
        </TableContainer>
      </Paper>
      <div>
        팝업스토어 예약 시스템을 이용하시겠습니까?
        <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
          <FormControlLabel value="네" control={<Radio />} label="네" />
          <FormControlLabel value="아니요" control={<Radio />} label="아니요" />
        </RadioGroup>
      </div>
      <div>
        팝업스토어 상품 판매 시스템을 이용하시겠습니까?
        <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
          <FormControlLabel value="네" control={<Radio />} label="네" />
          <FormControlLabel value="아니요" control={<Radio />} label="아니요" />
        </RadioGroup>
      </div>
      <Button type="submit" variant="contained" sx={{ borderRadius: 28 }}>
        다음보기
      </Button>
    </div>
  );
}

export default StoreInfoForm;
