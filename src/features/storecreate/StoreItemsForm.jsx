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
import { useState } from 'react';

function StoreItemsForm({ addSales, cancelSales }) {
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

  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('상품 가격을 입려해주세요');
  const [itemTotal, setItemTotal] = useState('재고량을 입려해주세요');
  const [orderLimit, setOrderLimit] = useState('주문가능 수량을 입려해주세요');
  const [userImage, setUserImage] = useState(null);
  const [userImageFile, setUserImageFile] = useState('');
  const [itemsList, setItemsList] = useState([]);
  const [itemFileList, setItemFileList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const [editItemName, setEditItemName] = useState('');
  const [editItemPrice, setEditItemPrice] = useState(0);
  const [editItemTotal, setEditItemTotal] = useState(0);
  const [editOrderLimit, setEditOrderLimit] = useState(0);
  const [editImage, setEditImage] = useState(null);
  const [editImageFile, setEditImageFile] = useState('');

  const [editingItemIndex, setEditingItemIndex] = useState(-1);

  const handleItemNameChange = (event) => {
    setItemName(event.target.value);
  };

  const handleItemPriceChange = (event) => {
    setItemPrice(event.target.value);
  };

  const handleTotalChange = (event) => {
    setItemTotal(event.target.value);
  };

  const handleOrderLimitChange = (event) => {
    setOrderLimit(event.target.value);
  };

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      setUserImageFile(selectedImage);
      setUserImage(URL.createObjectURL(selectedImage));
    }
  };

  const handleEditItemNameChange = (event) => {
    setEditItemName(event.target.value);
  };

  const handleEditItemPriceChange = (event) => {
    setEditItemPrice(event.target.value);
  };

  const handleEditTotalChange = (event) => {
    setEditItemTotal(event.target.value);
  };

  const handleEditOrderLimitChange = (event) => {
    setEditOrderLimit(event.target.value);
  };

  const handleEditImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      setEditImageFile(selectedImage);
      setEditImage(URL.createObjectURL(selectedImage));
    }
  };

  const handleItemAdd = (event) => {
    if (
      itemName === '' ||
      itemPrice === '' ||
      itemPrice === '상품 가격을 입려해주세요' ||
      itemTotal === '' ||
      itemTotal === '재고량을 입려해주세요' ||
      orderLimit === '' ||
      orderLimit === '주문가능 수량을 입려해주세요' ||
      userImage === null
    ) {
      alert('필수 항목을 기입해주세요');
      return;
    }
    const newItem = {
      name: itemName,
      price: itemPrice,
      total: itemTotal,
      orderLimit: orderLimit,
      image: userImage,
    };
    const newItemImageWithFile = {
      name: itemName,
      amount: itemPrice,
      stock: itemTotal,
      orderLimit: orderLimit,
      imgUrl: userImageFile,
    };
    setItemsList([...itemsList, newItem]);
    setItemFileList([...itemFileList, newItemImageWithFile]);
    clearForm();
  };

  const clearForm = () => {
    setItemName('');
    setItemPrice('상품 가격을 입려해주세요');
    setItemTotal('재고량을 입려해주세요');
    setOrderLimit('주문가능 수량을 입려해주세요');
    setUserImage(null);
    setUserImageFile(null);
  };

  const handleDeleteItem = (index) => {
    const updatedItemsList = [...itemsList];
    const updatedImageFilesList = [...itemFileList];
    updatedItemsList.splice(index, 1);
    updatedImageFilesList.splice(index, 1);
    setItemsList(updatedItemsList);
    setItemFileList(updatedImageFilesList);
  };

  const handleEditItem = (index) => {
    if (isEditing) {
      alert('현재 수정 하고 있는 아이템을 저장해주세요');
      return;
    }
    // setEditingItem(itemsList[index]);
    setEditingItemIndex(index);

    setEditItemName(itemsList[index].name);
    setEditItemPrice(itemsList[index].price);
    setEditItemTotal(itemsList[index].total);
    setEditOrderLimit(itemsList[index].orderLimit);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingItemIndex(-1);
  };

  const handleSaveEdit = () => {
    const updatedItemsList = [...itemsList];
    const updatedItemsFileList = [...itemFileList];
    updatedItemsList[editingItemIndex] = {
      name: editItemName,
      price: editItemPrice,
      total: editItemTotal,
      orderLimit: editOrderLimit,
      image: editImage,
    };
    updatedItemsFileList[editingItemIndex] = {
      name: editItemName,
      amount: editItemPrice,
      stock: editItemTotal,
      orderLimit: editOrderLimit,
      imgUrl: editImageFile,
    };
    setItemsList(updatedItemsList);
    setItemFileList(updatedItemsFileList);
    setIsEditing(false);
    setEditingItemIndex(-1);
    clearForm();
  };

  const handleSubmit = () => {
    addSales(itemFileList);
  };

  const handleCancelSales = () => {
    cancelSales('noReservation');
  };

  return (
    <div className="styles.container">
      <h3 style={{ textAlign: 'center', marginBottom: '3em' }}>판매하실 상품들을 입력해주세요</h3>
      <Paper variant="outlined" sx={{ padding: '2rem' }} square={false} elevation={1}>
        <TableContainer>
          <Table variant={'outlined'}>
            <TableRow>
              <TableCell className={styles.table}>
                상품명<span style={{ color: 'red' }}> (*)</span>
              </TableCell>
              <TableCell className={styles.table}>
                <FormControl fullWidth>
                  <OutlinedInput
                    required
                    value={itemName}
                    onChange={handleItemNameChange}
                    placeholder="상품명을 입력해주세요"
                  />
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
                      value={itemPrice}
                      onChange={handleItemPriceChange}
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
                      value={itemTotal}
                      onChange={handleTotalChange}
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
                      value={orderLimit}
                      onChange={handleOrderLimitChange}
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
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {userImage && (
                    <img style={{ maxWidth: '200px', borderRadius: '10px' }} src={userImage} alt={`store item`} />
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
                    <VisuallyHiddenInput type="file" accept="image/*" onChange={handleImageUpload} />
                  </Button>
                </div>
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
            {itemsList.map((item, index) => (
              <TableRow key={index}>
                <TableCell className={styles.table}>
                  {editingItemIndex === index ? (
                    <TextField value={editItemName} onChange={handleEditItemNameChange} />
                  ) : (
                    item.name
                  )}
                </TableCell>
                <TableCell className={styles.table}>
                  {editingItemIndex === index ? (
                    <TextField value={editItemPrice} onChange={handleEditItemPriceChange} />
                  ) : (
                    item.price
                  )}
                </TableCell>
                <TableCell className={styles.table}>
                  {editingItemIndex === index ? (
                    <TextField value={editItemTotal} onChange={handleEditTotalChange} />
                  ) : (
                    item.total
                  )}
                </TableCell>
                <TableCell className={styles.table}>
                  {editingItemIndex === index ? (
                    <TextField value={editOrderLimit} onChange={handleEditOrderLimitChange} />
                  ) : (
                    item.orderLimit
                  )}
                </TableCell>
                <TableCell className={styles.table}>
                  {editingItemIndex === index ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      {userImage && (
                        <img style={{ maxWidth: '100px', borderRadius: '10px' }} src={userImage} alt={`store item`} />
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
                        <VisuallyHiddenInput type="file" onChange={handleEditImageUpload} />
                      </Button>
                    </div>
                  ) : (
                    item.image && (
                      <img style={{ maxWidth: '100px', borderRadius: '10px' }} src={item.image} alt={`store item`} />
                    )
                  )}
                </TableCell>
                <TableCell>
                  {editingItemIndex === index ? (
                    <Stack direction="row" spacing={1}>
                      <Button variant="outlined" onClick={() => handleCancelEdit()}>
                        취소
                      </Button>
                      <Button variant="contained" onClick={handleSaveEdit}>
                        저장
                      </Button>
                    </Stack>
                  ) : (
                    <Stack direction="row" spacing={1}>
                      <IconButton aria-label="delete" onClick={() => handleDeleteItem(index)}>
                        <DeleteIcon />
                      </IconButton>
                      <IconButton aria-label="edit" onClick={() => handleEditItem(index)}>
                        <EditIcon />
                      </IconButton>
                    </Stack>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </Table>
        </TableContainer>
      </div>
      <div style={{ textAlign: 'center', margin: '5rem 0' }}>
        <div>
          <Button type="submit" onClick={handleSubmit} variant="contained" sx={{ borderRadius: 28 }}>
            팝업스토어 등록
          </Button>
        </div>
        <div style={{ marginTop: '1rem' }}>
          <span style={{ textDecoration: 'none' }} onClick={handleCancelSales}>
            팝업스토어 상품 판매 기능을 이용하지 않으시겠어요?
          </span>
        </div>
      </div>
    </div>
  );
}

export default StoreItemsForm;
