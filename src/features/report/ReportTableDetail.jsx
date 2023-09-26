import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import JsonAxios from '../../api/jsonAxios';

function ReportTableDetail({ selectedUser }) {
  const [chats, _chats] = useState([]);
  useEffect(() => {
    if (selectedUser != null) {
      JsonAxios.get(`/chat/report/${selectedUser.writer}`).then((res) => {
        _chats(res.data.data);
      });
    }
  }, [selectedUser]);
  return (
    <div>
      <Typography mb={'16px'} variant="h6" fontWeight="bold">
        {selectedUser == null ? '채팅을 선택해 주세요' : `${selectedUser.writerEmail} 채팅 목록`}
      </Typography>
      <TableContainer sx={{ width: '50vh', height: 'calc(100vh - 300px)' }} component={Paper}>
        <Table sx={{}} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: 'rgb(242, 244, 246)' }}>
              <TableCell>메세지</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {chats.map((data, index) => {
              return (
                <TableRow key={data.chatId}>
                  <TableCell>{data.message}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ReportTableDetail;
