import React, { useState } from 'react';
import Table from '@mui/material/Table';
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

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ width: '100%' }} aria-label="simple table">
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
            {rows.map((row) => (
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
  );
}

export default OrderList;
