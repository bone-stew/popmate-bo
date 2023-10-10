import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TableSortLabel,
} from '@mui/material';
import StatusButton from '../../components/StatusButton';
import JsonAxios from '../../api/jsonAxios';
import { useParams } from 'react-router';
import { formatToLocalDateTime } from '../../app/dateTimeUtils';

function ReservationDetailTable() {
  const { reservationId } = useParams();
  const [order, setOrder] = useState('asc'); // 정렬 방향 (asc 또는 desc)
  const [orderBy, setOrderBy] = useState('member'); // 정렬 기준 열
  const [page, setPage] = useState(0); // 현재 페이지
  const [rowsPerPage, setRowsPerPage] = useState(5); // 페이지당 표시할 행 수
  const [enteranceData, _enteranceData] = useState([]);

  useEffect(() => {
    const apiUrl = `reservations/${reservationId}/entrance-info`;
    JsonAxios.get(apiUrl)
      .then((response) => {
        _enteranceData(response.data.data);
      })
      .catch((error) => {
        console.error('API 호출 중 오류 발생:', error);
      });
  }, [reservationId]);

  // 정렬 함수
  const handleRequestSort = (property) => (event) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // 페이지 변경 핸들러
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // 페이지당 행 수 변경 핸들러
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function stableSort(array, compareFn) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = compareFn(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  // 데이터 정렬 및 페이지네이션을 적용한 행 데이터 가져오기
  const sortedAndPaginatedData = () => {
    const sortedData = stableSort(enteranceData, getComparator(order, orderBy));
    return sortedData.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  };

  // 정렬 함수
  const getComparator = (order, orderBy) => {
    if (orderBy === 'status') {
      // "entered" 필드에 대한 정렬
      return order === 'desc'
        ? (a, b) => (a[orderBy] > b[orderBy] ? -1 : 1)
        : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
    }

    // 다른 필드에 대한 정렬
    return order === 'desc'
      ? (a, b) => descendingComparator(a[orderBy], b[orderBy])
      : (a, b) => -descendingComparator(a[orderBy], b[orderBy]);
  };

  const descendingComparator = (a, b) => {
    if (b < a) {
      return -1;
    }
    if (b > a) {
      return 1;
    }
    return 0;
  };

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'userReservationId'}
                  direction={orderBy === 'userReservationId' ? order : 'asc'}
                  onClick={handleRequestSort('userReservationId')}
                >
                  예약 번호
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'userName'}
                  direction={orderBy === 'userName' ? order : 'asc'}
                  onClick={handleRequestSort('userName')}
                >
                  회원
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'email'}
                  direction={orderBy === 'email' ? order : 'asc'}
                  onClick={handleRequestSort('email')}
                >
                  이메일
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'guestCount'}
                  direction={orderBy === 'guestCount' ? order : 'asc'}
                  onClick={handleRequestSort('guestCount')}
                >
                  예약 인원
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'status'}
                  direction={orderBy === 'status' ? order : 'asc'}
                  onClick={handleRequestSort('status')}
                >
                  입장 여부
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'reservationTime'}
                  direction={orderBy === 'reservationTime' ? order : 'asc'}
                  onClick={handleRequestSort('reservationTime')}
                >
                  예약한 시간
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedAndPaginatedData().map((row) => (
              <TableRow key={row.userReservationId}>
                <TableCell>{row.userReservationId}</TableCell>
                <TableCell>{row.userName}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.guestCount}</TableCell>
                <TableCell>
                  <StatusButton status={row.status} label={row.status} reservationId={row.userReservationId} />
                </TableCell>
                <TableCell>{formatToLocalDateTime(row.reservationTime)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={enteranceData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default ReservationDetailTable;
