import React, { useEffect, useState } from 'react';
import styles from './PopupList.module.css';
import {
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import JsonAxios from '../../api/jsonAxios';

function StoreListTable() {
  const columns = [
    { id: 'title', label: '팝업스토어명', minWidth: 170 },
    { id: 'title', label: '지점', minWidth: 100 },
    { id: 'closeDate', label: '기간', minWidth: 170 },
    { id: 'organizer', label: '주체기관', minWidth: 170 },
    { id: 'openDate', label: '등록일', minWidth: 170 },
  ];

  const [stores, _stores] = useState([]);
  const [query, _query] = useState('');

  const handleChange = (e) => {
    _query(e.target.value);
  };

  useEffect(() => {
    JsonAxios.get('popup-stores')
      .then((res) => {
        _stores(res.data.data.popupStores);
        console.log(res.data.data.popupStores);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={2} align={'center'}>
                <TextField label="분류" select fullWidth defaultValue={10} onChange={handleChange}>
                  <MenuItem value={10}>전체</MenuItem>
                  <MenuItem value={20}>팝업스토어명</MenuItem>
                  <MenuItem value={30}>지점</MenuItem>
                  <MenuItem value={40}>주체기관</MenuItem>
                </TextField>
              </TableCell>
              <TableCell colSpan={3} align={'center'}>
                <OutlinedInput
                  fullWidth
                  placeholder="Search.."
                  startAdornment={
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  }
                />
              </TableCell>
            </TableRow>
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
                <TableRow hover role="checkbox" tabIndex={-1} key={row.popupStoreId}>
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
    </Paper>
  );
}

export default StoreListTable;
