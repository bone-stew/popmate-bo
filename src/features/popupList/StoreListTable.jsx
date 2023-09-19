/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from '@mui/material';
import { Refresh, Search } from '@mui/icons-material';
import JsonAxios from '../../api/jsonAxios';
import { useNavigate } from 'react-router-dom';

function StoreListTable() {
  const columns = [
    { id: 'title', label: '팝업스토어명', minWidth: 170 },
    { id: 'departmentName', label: '지점', minWidth: 100 },
    { id: 'duration', label: '기간', minWidth: 170 },
    { id: 'organizer', label: '주체기관', minWidth: 170 },
    { id: 'createdAt', label: '등록일', minWidth: 100 },
  ];

  const navigate = useNavigate();

  const [stores, _stores] = useState([]);
  const [category, _category] = useState(0);
  const [query, _query] = useState('');
  const [page, _page] = useState(0);
  const [rowsPerPage, _rowsPerPage] = useState(15);
  const [totalPage, _totalPage] = useState(0);
  const [flag, _flag] = useState(false);

  const handleItemClick = (popupStoreId) => {
    navigate(`/store/${popupStoreId}`);
  };

  function updateList() {
    console.log('update');
    JsonAxios.get('popup-stores/search', {
      params: {
        query: query,
        type: category,
        page: page,
        size: rowsPerPage,
      },
    })
      .then((res) => {
        const list = res.data.data.popupStores;
        list.forEach((element) => {
          element.duration = `${element.openDate.split('T')[0]} ~ ${element.closeDate.split('T')[0]}`;
          element.createdAt = element.createdAt.split('T')[0];
        });
        _totalPage(list[0] != null ? list[0].total : 0);
        _stores(res.data.data.popupStores);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const initList = () => {
    _query('');
    _category(0);
    _page(0);
    _flag(!flag);
  };

  useEffect(() => {
    updateList();
  }, [flag]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <div style={{ display: 'flex', padding: '10px', justifyContent: 'space-around', alignItems: 'center' }}>
        <TextField
          sx={{ width: '20%' }}
          label="분류"
          select
          value={category}
          onChange={(e) => {
            _category(e.target.value);
          }}
          size="small"
        >
          <MenuItem value={0}>전체</MenuItem>
          <MenuItem value={1}>팝업스토어명</MenuItem>
          <MenuItem value={2}>지점</MenuItem>
          <MenuItem value={3}>주체기관</MenuItem>
        </TextField>
        <form
          style={{ width: '70%' }}
          onSubmit={(e) => {
            e.preventDefault();
            updateList();
          }}
        >
          <OutlinedInput
            value={query}
            size="small"
            fullWidth
            placeholder="Search.."
            onChange={(e) => {
              _query(e.target.value);
            }}
            startAdornment={
              <InputAdornment position="start">
                <IconButton>
                  <Search />
                </IconButton>
              </InputAdornment>
            }
          />
        </form>
        <IconButton onClick={initList}>
          <Refresh />
        </IconButton>
      </div>
      <TableContainer sx={{ maxHeight: 'calc(100vh - 300px)' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={'center'}
                  style={{ minWidth: column.minWidth, backgroundColor: '#F4F6F8' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {stores.map((row) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.popupStoreId}
                  onClick={() => handleItemClick(row.popupStoreId)}
                >
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={'center'}>
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[15, 25]}
        component="div"
        count={totalPage}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, newPage) => {
          _page(newPage);
          _flag(!flag);
        }}
        onRowsPerPageChange={(event) => {
          _rowsPerPage(event.target.value);
          _flag(!flag);
        }}
      />
    </Paper>
  );
}

export default StoreListTable;
