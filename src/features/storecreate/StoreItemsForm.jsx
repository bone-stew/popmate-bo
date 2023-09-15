import { Table, TableCell, TableHead, TableRow } from '@mui/material';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function StoreItemsForm() {
  return (
    <div>
      <h2>판매하실 상품들을 입력해주세요</h2>
      <div>
        <Table>
          <tr>
            <TableCell>상품명</TableCell>
            <TableCell>
              <FormControl sx={{ width: '25ch' }}>
                <OutlinedInput placeholder="Please enter text" />
                {/* <MyFormHelperText /> */}
              </FormControl>
            </TableCell>
          </tr>
          <tr>
            <TableCell>상품가격</TableCell>
            <TableCell>
              <FormControl sx={{ width: '25ch' }}>
                <OutlinedInput placeholder="Please enter text" />
                {/* <MyFormHelperText /> */}
              </FormControl>
            </TableCell>
          </tr>
          <tr>
            <TableCell>재고</TableCell>
            <TableCell>
              <FormControl sx={{ width: '25ch' }}>
                <OutlinedInput placeholder="Please enter text" />
                {/* <MyFormHelperText /> */}
              </FormControl>
            </TableCell>
          </tr>
          <tr>
            <TableCell>주문가능 수량</TableCell>
            <TableCell>
              <FormControl sx={{ width: '25ch' }}>
                <OutlinedInput placeholder="Please enter text" />
                {/* <MyFormHelperText /> */}
              </FormControl>
            </TableCell>
          </tr>
          <tr>
            <TableCell>상품 이미지</TableCell>
            <TableCell>
              <FormControl sx={{ width: '25ch' }}>
                <OutlinedInput placeholder="Please enter text" />
                {/* <MyFormHelperText /> */}
              </FormControl>
            </TableCell>
          </tr>
        </Table>
        <input type="button" value="상품 추가하기" />
      </div>
      <div>
        <h1>추가된 상품 목록</h1>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>상품명</TableCell>
              <TableCell>상품 가격</TableCell>
              <TableCell>재고</TableCell>
              <TableCell>주문 가능수량(1인제한)</TableCell>
              <TableCell>상품 이미지</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableRow>
            <TableCell>상품명</TableCell>
            <TableCell>상품명</TableCell>
            <TableCell>상품명</TableCell>
            <TableCell>상품명</TableCell>
            <TableCell>상품명</TableCell>
            <TableCell>
              <Stack direction="row" spacing={1}></Stack>
              <IconButton aria-label="delete">
                <DeleteIcon />
              </IconButton>
              <IconButton aria-label="delete">
                <EditIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        </Table>
      </div>
      <Button type="submit" variant="contained" sx={{ borderRadius: 28 }}>
        다음보기
      </Button>
      <a href="">팝업스토어 상품 판매 기능을 이용하지 않으시겠어요?</a>
    </div>
  );
}

export default StoreItemsForm;
