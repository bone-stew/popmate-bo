import React, { useState, useEffect } from 'react';
import styles from '../order/OrderList.module.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Search from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import Table from '@mui/material/Table';
import InputAdornment from '@mui/material/InputAdornment';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import JsonAxios from '../../api/jsonAxios';
import StatusButton from '../../components/StatusButton';


function OrderList() {
  const [searchText, setSearchText] = useState('');
  const [filteredRows, setFilteredRows] = useState([]);
  
  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    try {
      const response = await JsonAxios.get('http://localhost:8080/api/v1/orders/backoffice/orderList/1');
      const orderListItemResponses = response.data;
      const orderList = orderListItemResponses.data.orderListItemResponses;
      
      const numberOfRows = orderList.length;
      const columns = ['orderId', 'name', 'orderList', 'totalCnt', 'status', 'pickupTime'];
      const rows = Array.from({ length: numberOfRows }, () => ({}));
      console.log(orderList);
      for (let i = 0; i < orderList.length; i++) {
        const order = orderList[i];
        
        rows[i][columns[0]] = order.orderTossId;
        rows[i][columns[1]] = order.name;
        const orderItemList = order.orderItemList
        let storename = '';
        for (let i = 0; i < orderItemList.length; i++) {
          const item = orderItemList[i].popupStoreItem.name + ' ' + orderItemList[i].totalQuantity + '개';
          storename += i === orderItemList.length - 1 ? item : item + ' + ';
        } 
        rows[i][columns[2]] = storename;
        rows[i][columns[3]] = order.orderItemList.length;
        if (order.status === 1) {
          rows[i][columns[4]] = "수령완료";
      } else if (order.status === 0) {
          rows[i][columns[4]] = "수령대기";
      } else if (order.status === -1) {
          rows[i][columns[4]] = "주문취소";
      }
        const formattedDateTime = addMinutesToDateTime(order.createdAt, 10);
        rows[i][columns[5]] = formattedDateTime
      }
      
      setFilteredRows(rows);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = () => {
    setSearchText('');
    const filteredData = filteredRows.filter((row) => row.orderId.includes(searchText));
    setFilteredRows(filteredData);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const onRefreshClick = () => {
    fetchdata(); // 데이터를 다시 불러옵니다.
  };

  return (
    <div>
      <div className={styles.orderListTop}>
        <div className={styles.roundretangle}>
          분류
        </div>
        <div className={styles.searchroundretangle}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <TextField 
              id="orders" 
              fullWidth
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyPress={handleKeyPress}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              label="Search.."  
            />
          </Box>
        </div>
        <div className={styles.refresh}>
          <RefreshIcon sx={{ color: 'action.active', mr: 1, my: 0.5 , fontSize: 28}} 
            className={styles.refresh}
            onClick={onRefreshClick}
          />
        </div>
      </div>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ width: '100%' }}>
          <TableHead sx={{ backgroundColor: '#F2F4F6' }}>
              <TableRow>
                <TableCell align="center">주문 번호</TableCell>
                <TableCell align="center">고객 이름</TableCell>
                <TableCell align="center">상품 내역</TableCell>
                <TableCell align="center">총 수량</TableCell>
                <TableCell align="center">상태</TableCell>
                <TableCell align="center">픽업 예정시간</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">{row.orderId}</TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.orderList}</TableCell>
                  <TableCell align="center">{row.totalCnt}개</TableCell>
                  <TableCell align="center"><StatusButton status={row.status} label={row.status} /></TableCell>
                  <TableCell align="center">{row.pickupTime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

function addMinutesToDateTime(dateTimeString, minutesToAdd) {
  const date = new Date(dateTimeString);
  date.setMinutes(date.getMinutes() + minutesToAdd);
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;
  return formattedDateTime;
}

export default OrderList;
