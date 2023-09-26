import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import JsonAxios from '../../api/jsonAxios';
import StyledButton from '../../components/StyledButton';

function ReportTable({ _selectedUser }) {
  const [reports, _reports] = useState([]);
  useEffect(() => {
    JsonAxios.get('chat/report').then((res) => {
      _reports(res.data.data);
    });
  }, []);
  return (
    <div>
      <Typography mb={'16px'} variant="h6" fontWeight="bold">
        최근 신고 내역
      </Typography>
      <TableContainer sx={{ width: '80vh', height: 'calc(100vh - 300px)' }} component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'rgb(242, 244, 246)' }}>
              <TableCell>작성자</TableCell>
              <TableCell align="center">메세지</TableCell>
              <TableCell align="right">누적 신고 횟수</TableCell>
              <TableCell align="center">처리 상태</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((data, index) => {
              let buttonText = '안녕';
              let buttonColor = 'info';
              if (data.status === 0) {
                buttonText = '신규 신고';
                buttonColor = 'yellow';
              }
              return (
                <TableRow
                  key={data.chatId}
                  onClick={() => {
                    _selectedUser(data);
                  }}
                >
                  <TableCell>{data.writerEmail}</TableCell>
                  <TableCell sx={{ maxWidth: '260px', overflowWrap: 'break-word' }}>{data.message}</TableCell>
                  <TableCell align="right">{data.reportCount}</TableCell>
                  <TableCell align="center">
                    <StyledButton
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('눌림');
                      }}
                      text={buttonText}
                      color={buttonColor}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ReportTable;
