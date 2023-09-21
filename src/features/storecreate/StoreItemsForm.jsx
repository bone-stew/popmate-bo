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
import { useState, useEffect } from 'react';

function StoreItemsForm({ viewInfo, addSales, cancelSales, isUsingSales }) {
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
  const [disableInput, setDisableInput] = useState(isUsingSales);

  useEffect(() => {
    if (Object.keys(viewInfo).length !== 0) {
      setItemsList(viewInfo.popupStoreItemResponse);
      setItemFileList(JSON.parse(JSON.stringify(viewInfo.popupStoreItemResponse)));
    }
  }, [viewInfo]);

  useEffect(() => {
    if (Object.keys(viewInfo).length !== 0) {
      if (isUsingSales) {
        setDisableInput(false);
      } else {
        setDisableInput(true);
      }
    }
  }, [isUsingSales, viewInfo]);

  StoreItemsForm.getData = () => {
    return { itemsList, itemFileList };
  };

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
      amount: itemPrice,
      stock: itemTotal,
      orderLimit: orderLimit,
      imgUrl: userImage,
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
    setEditImage(null);
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
    setEditingItemIndex(index);

    setEditItemName(itemsList[index].name);
    setEditItemPrice(itemsList[index].amount);
    setEditItemTotal(itemsList[index].stock);
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
      amount: editItemPrice,
      stock: editItemTotal,
      orderLimit: editOrderLimit,
      imgUrl: editImage,
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
    <div className={disableInput ? styles.containerDisabled : styles.container}>
      <h2 style={{ textAlign: 'center', marginBottom: '3em' }}>판매하실 상품들을 입력해주세요</h2>
      <Paper variant="outlined" sx={{ padding: '2rem' }} square={false} elevation={1}>
        <TableContainer>
          <Table variant={'outlined'}>
            <TableRow>
              <TableCell className={styles.table}>
                <div className={disableInput && styles.disabled}>
                  상품명<span className={disableInput ? styles.disabled : styles.redSpan}> (*)</span>
                </div>
              </TableCell>
              <TableCell className={styles.table}>
                <FormControl fullWidth>
                  <OutlinedInput
                    required
                    value={itemName}
                    onChange={handleItemNameChange}
                    placeholder="상품명을 입력해주세요"
                    disabled={disableInput}
                  />
                </FormControl>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={styles.table}>
                <div className={disableInput && styles.disabled}>
                  상품가격<span className={disableInput ? styles.disabled : styles.redSpan}> (*)</span>
                </div>
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
                      disabled={disableInput}
                    />
                  </FormControl>
                  <div className={disableInput && styles.disabled}>
                    <Box ml={1}>원</Box>
                  </div>
                </Stack>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={styles.table}>
                <div className={disableInput && styles.disabled}>
                  재고<span className={disableInput ? styles.disabled : styles.redSpan}> (*)</span>
                </div>
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
                      disabled={disableInput}
                    />
                  </FormControl>
                </Stack>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={styles.table}>
                <div className={disableInput && styles.disabled}>
                  주문가능 수량<span className={disableInput ? styles.disabled : styles.redSpan}> (*)</span>
                </div>
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
                      disabled={disableInput}
                    />
                  </FormControl>
                </Stack>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={styles.table}>
                <div className={disableInput && styles.disabled}>
                  상품 이미지<span className={disableInput ? styles.disabled : styles.redSpan}> (*)</span>
                </div>
              </TableCell>
              <TableCell className={styles.table}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {userImage && (
                    <img style={{ maxWidth: '10rem', borderRadius: '10px' }} src={userImage} alt={`store item`} />
                  )}
                  <Button
                    component="label"
                    variant="contained"
                    startIcon={<ImageIcon />}
                    sx={{
                      marginTop: '1em',
                    }}
                    disabled={disableInput}
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
            disabled={disableInput}
          >
            상품 추가하기
          </Button>
        </div>
      </Paper>
      <div>
        <h3 style={{ marginTop: '4rem', textAlign: 'center' }}>추가된 상품 목록</h3>
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: '#F8F9FA' }}>
              <TableRow>
                <TableCell className={styles.table}>
                  <div className={disableInput && styles.disabled}>상품명</div>
                </TableCell>
                <TableCell className={styles.table}>
                  <div className={disableInput && styles.disabled}>상품 가격</div>
                </TableCell>
                <TableCell className={styles.table}>
                  <div className={disableInput && styles.disabled}>재고</div>
                </TableCell>
                <TableCell className={styles.table}>
                  <div className={disableInput && styles.disabled}>주문 가능수량(1인제한)</div>
                </TableCell>
                <TableCell className={styles.table}>
                  <div className={disableInput && styles.disabled}>상품 이미지</div>
                </TableCell>
                <TableCell className={styles.table}></TableCell>
              </TableRow>
            </TableHead>
            {itemsList.map((item, index) => (
              <TableRow key={index}>
                <TableCell className={styles.table}>
                  {editingItemIndex === index ? (
                    <TextField value={editItemName} onChange={handleEditItemNameChange} />
                  ) : (
                    <div style={{ textAlign: 'center' }} className={disableInput && styles.disabled}>
                      {item.name}
                    </div>
                  )}
                </TableCell>
                <TableCell className={styles.table}>
                  {editingItemIndex === index ? (
                    <TextField value={editItemPrice} onChange={handleEditItemPriceChange} />
                  ) : (
                    <div style={{ textAlign: 'center' }} className={disableInput && styles.disabled}>
                      {item.amount}
                    </div>
                  )}
                </TableCell>
                <TableCell className={styles.table}>
                  {editingItemIndex === index ? (
                    <TextField value={editItemTotal} onChange={handleEditTotalChange} />
                  ) : (
                    <div style={{ textAlign: 'center' }} className={disableInput && styles.disabled}>
                      {item.stock}
                    </div>
                  )}
                </TableCell>
                <TableCell className={styles.table}>
                  {editingItemIndex === index ? (
                    <TextField value={editOrderLimit} onChange={handleEditOrderLimitChange} />
                  ) : (
                    <div style={{ textAlign: 'center' }} className={disableInput && styles.disabled}>
                      {item.orderLimit}
                    </div>
                  )}
                </TableCell>
                <TableCell className={styles.table}>
                  {editingItemIndex === index ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      {userImage && (
                        <img style={{ maxWidth: '5rem', borderRadius: '10px' }} src={userImage} alt={`store item`} />
                      )}
                      {editImage && (
                        <img style={{ maxWidth: '5rem', borderRadius: '10px' }} src={editImage} alt={`store item`} />
                      )}
                      <Button
                        component="label"
                        variant="contained"
                        startIcon={<ImageIcon />}
                        sx={{
                          marginTop: '1em',
                        }}
                      >
                        이미지 수정하기
                        <VisuallyHiddenInput type="file" onChange={handleEditImageUpload} />
                      </Button>
                    </div>
                  ) : (
                    <div
                      style={{ textAlign: 'center' }}
                      className={disableInput ? `${styles.disabled} ${styles.shaded}` : styles.disabled}
                    >
                      {item.imgUrl && (
                        <img style={{ maxWidth: '8rem', borderRadius: '10px' }} src={item.imgUrl} alt={`store item`} />
                      )}
                    </div>
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
                      <IconButton disabled={disableInput} aria-label="delete" onClick={() => handleDeleteItem(index)}>
                        <DeleteIcon />
                      </IconButton>
                      <IconButton disabled={disableInput} aria-label="edit" onClick={() => handleEditItem(index)}>
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

      {Object.keys(viewInfo).length === 0 && (
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
      )}
    </div>
  );
}

export default StoreItemsForm;
