import { TextField, Box, TableContainer, Paper, Table, TableCell, TableHead, TableRow } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import styles from './StoreCreate.module.css';
import ImageIcon from '@mui/icons-material/Image';
import { styled } from '@mui/material/styles';

function StoreItemsForm() {
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
  const handleItemAdd = (event) => {};
  return (
    <div className="styles.container">
      <h3 style={{ textAlign: 'center', marginBottom: '3em' }}>판매하실 상품들을 입력해주세요</h3>
      <Paper variant="outlined" sx={{ padding: '2rem' }} square={false} elevation={0.5}>
        <TableContainer>
          <Table variant={'outlined'}>
            <TableRow>
              <TableCell className={styles.table}>
                상품명<span style={{ color: 'red' }}> (*)</span>
              </TableCell>
              <TableCell className={styles.table}>
                <FormControl fullWidth>
                  <OutlinedInput placeholder="상품명을 입력해주세요" />
                </FormControl>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={styles.table}>
                상품가격<span style={{ color: 'red' }}> (*)</span>
              </TableCell>
              <TableCell className={styles.table}>
                <Stack direction="row" alignItems="center">
                  <FormControl fullWidth>
                    <TextField
                      placeholder="상품 가격을 입려해주세요"
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
                  <Box ml={1}>원</Box>
                </Stack>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={styles.table}>
                재고<span style={{ color: 'red' }}> (*)</span>
              </TableCell>
              <TableCell className={styles.table}>
                <Stack direction="row" alignItems="center">
                  <FormControl fullWidth>
                    <TextField
                      placeholder="재고량을 입려해주세요"
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
                </Stack>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={styles.table}>
                주문가능 수량<span style={{ color: 'red' }}> (*)</span>
              </TableCell>
              <TableCell className={styles.table}>
                <Stack direction="row" alignItems="center">
                  <FormControl fullWidth>
                    <TextField
                      placeholder="주문가능 수량을 입려해주세요"
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
                </Stack>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={styles.table}>
                상품 이미지<span style={{ color: 'red' }}> (*)</span>
              </TableCell>
              <TableCell className={styles.table}>
                <Button component="label" variant="contained" startIcon={<ImageIcon />} className={styles.customButton}>
                  이미지 첨부하기
                  <VisuallyHiddenInput type="file" />
                </Button>
              </TableCell>
            </TableRow>
          </Table>
        </TableContainer>
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '1rem 0' }}>
          <Button
            sx={{ backgroundColor: '#000000', borderRadius: 5 }}
            type="button"
            variant="contained"
            onClick={handleItemAdd}
          >
            상품 추가하기
          </Button>
        </div>
      </Paper>
      <div>
        <h4 style={{ marginTop: '4rem' }}>추가된 상품 목록</h4>
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: '#F8F9FA' }}>
              <TableRow>
                <TableCell className={styles.table}>상품명</TableCell>
                <TableCell className={styles.table}>상품 가격</TableCell>
                <TableCell className={styles.table}>재고</TableCell>
                <TableCell className={styles.table}>주문 가능수량(1인제한)</TableCell>
                <TableCell className={styles.table}>상품 이미지</TableCell>
                <TableCell className={styles.table}></TableCell>
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
        </TableContainer>
      </div>
      <div style={{ textAlign: 'center', marginTop: '5rem' }}>
        <div>
          <Button type="submit" variant="contained" sx={{ borderRadius: 28 }}>
            다음보기
          </Button>
        </div>
        <div>
          <a href="/">팝업스토어 상품 판매 기능을 이용하지 않으시겠어요?</a>
        </div>
      </div>
    </div>
  );
}

export default StoreItemsForm;
