import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import JsonAxios from '../../api/jsonAxios';
import StyledButton from '../../components/StyledButton';
import ReportModal from './ReportModal';

const buttonContent = {
  0: { buttonText: '신규 신고', buttonColor: 'yellow' },
  1: { buttonText: '반려', buttonColor: 'green' },
  2: { buttonText: '3일 정지', buttonColor: 'blue' },
  3: { buttonText: '1주일 정지', buttonColor: 'purple' },
  4: { buttonText: '1달 정지', buttonColor: 'orange' },
  5: { buttonText: '영구 정지', buttonColor: 'red' },
};
function ReportTable({ _selectedUser }) {
  const [reports, _reports] = useState([]);
  const [open, _open] = useState(false);
  const [defendant, _defendant] = useState();
  const [dicision, _dicision] = useState(1);

  useEffect(() => {
    JsonAxios.get('chat/report').then((res) => {
      _reports(res.data.data);
    });
  }, []);

  const handleReportModalOpen = (chat) => {
    _defendant(chat);
    _open(true);
  };

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
                  <TableCell sx={{ width: '100px' }} align="center">
                    <StyledButton
                      onClick={() => {
                        handleReportModalOpen(data);
                      }}
                      text={buttonContent[data.status].buttonText}
                      color={buttonContent[data.status].buttonColor}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <ReportModal
        _reports={_reports}
        open={open}
        dicision={dicision}
        _dicision={_dicision}
        defendant={defendant}
        _open={_open}
      />
    </div>
  );
}

export default ReportTable;
