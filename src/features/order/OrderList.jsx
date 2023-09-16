import React, { useState } from 'react';
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

function OrderList() {
  
  const rows = [
    { name: 'Frozen yoghurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0, time:'12:00' },
    { name: 'Ice cream sandwich', calories: 237, fat: 9.0, carbs: 37, protein: 4.3 , time:'12:11' },
    { name: 'Eclair', calories: 262, fat: 16.0, carbs: 24, protein: 6.0 , time:'11:00' },
    { name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3 , time:'13:00' },
    { name: 'Gingerbread', calories: 356, fat: 16.0, carbs: 49, protein: 3.9 , time:'14:00' },
  ];
  
  // 여기서 rows를 Axios로 받아서 처리하면 된다.
  const [searchText, setSearchText] = useState('');
  const [filteredRows, setFilteredRows] = useState(rows);

  const handleSearch = () => {
    setSearchText('');
    const filteredData = rows.filter((row) => row.name.includes(searchText));
    setFilteredRows(filteredData);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const onRefreshClick = () => {
    setFilteredRows(rows);
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
            }}label="Search.."  />
            </Box>
        </div>
      <div className={styles.refresh}>
      <RefreshIcon sx={{ color: 'action.active', mr: 1, my: 0.5 , fontSize: 28}} 
                  className={styles.refresh}
                  onClick={onRefreshClick}/>
      </div>
      </div>
      <div>
      <TableContainer component={Paper}>
        <Table sx={{ width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell align="center">주문 번호</TableCell>
              <TableCell align="center">고객 이름</TableCell>
              <TableCell align="center">상품 내역</TableCell>
              <TableCell align="center">총 수량</TableCell>
              <TableCell align="center">상태</TableCell>
              <TableCell align="center">픽업 시간</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.calories}</TableCell>
                <TableCell align="center">{row.fat}</TableCell>
                <TableCell align="center">{row.carbs}</TableCell>
                <TableCell align="center">{row.protein}</TableCell>
                <TableCell align="center">{row.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
    </div>
  );
}

export default OrderList;
