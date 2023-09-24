import React, { useState, useEffect } from 'react';
import {
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Paper,
  TextField,
} from '@mui/material';
import { Refresh, Search } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import JsonAxios from '../../api/jsonAxios';
import StatusButton from '../../components/StatusButton';
import { useParams } from 'react-router-dom';

function OrderList() {
  const [originalRows, setOriginalRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [category, setCategory] = useState(0);
  const [query, setQuery] = useState('');
  const { storeId } = useParams();
  useEffect(() => {
    fetchdata();
  },);

  const columns = [
    { field: 'orderId', headerName: '주문 번호', flex: 1, align: 'center', headerAlign: 'center'},
    { field: 'name', headerName: '고객 이름', flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'orderList', headerName: '상품 내역', flex: 2, align: 'center',minWidth: 500, headerAlign: 'center'},
    { field: 'totalCnt', headerName: '총 아이템 수', flex: 1, align: 'center', headerAlign: 'center'},
    {
      field: 'status',
      headerName: '상태',
      flex: 1,
      align: 'center',
      renderCell: (params) => (
        <StatusButton status={params.value} label={params.value} />
      )
      , headerAlign: 'center'
    },
    { field: 'pickupTime', headerName: '픽업 예정시간', flex: 1.5, align: 'center', headerAlign: 'center' },
  ];

  const fetchdata = async () => {
    try {
      const popupStoreId = storeId;
      const apiUrl = `orders/backoffice/orderList/${popupStoreId}`;
      const response = await JsonAxios.get(apiUrl);
      const orderListItemResponses = response.data;
      const orderList = orderListItemResponses.data.orderListItemResponses;

      const rows = orderList.map((order, index) => ({
        id: index,
        orderId: order.orderTossId,
        name: order.name,
        orderList: order.orderItemList
          .map(
            (item) => `${item.popupStoreItem.name} ${item.totalQuantity}개`
          )
          .join(' + '),
        totalCnt: order.orderItemList.length + '개',
        status:
          order.status === 1
            ? '수령완료'
            : order.status === 0
            ? '수령대기'
            : '주문취소',
        pickupTime: addMinutesToDateTime(order.createdAt, 10),
      }));

      setFilteredRows(rows);
      setOriginalRows(rows);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = () => {
    if (category === 1) {
      const filteredData = originalRows.filter((row) =>
        row.orderId.includes(query)
      );
      setFilteredRows(filteredData);
    } else if (category === 2) {
      const filteredData = originalRows.filter((row) =>
        row.name.includes(query)
      );
      setFilteredRows(filteredData);
    } else if (category === 3) {
      const filteredData = originalRows.filter((row) =>
        row.orderList.includes(query)
      );
      setFilteredRows(filteredData);
    } else if (category === 4) {
      const filteredData = originalRows.filter((row) =>
        row.status.includes(query)
      );
      setFilteredRows(filteredData);
    }
  };

  const onRefreshClick = () => {
    setQuery('');
    fetchdata();
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <div
        style={{
          display: 'flex',
          padding: '10px',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <TextField
          sx={{ width: '20%' }}
          label="분류"
          select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          size="small"
        >
          <MenuItem value={0}>전체</MenuItem>
          <MenuItem value={1}>주문 번호</MenuItem>
          <MenuItem value={2}>고객 이름</MenuItem>
          <MenuItem value={3}>상품 내역</MenuItem>
          <MenuItem value={4}>상태</MenuItem>
        </TextField>

        <OutlinedInput
          value={query}
          sx={{ width: '70%' }}
          size="small"
          fullWidth
          placeholder="Search.."
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleSearch();
            }
          }}
          startAdornment={
            <InputAdornment position="start">
              <IconButton onClick={handleSearch}>
                <Search />
              </IconButton>
            </InputAdornment>
          }
        />

        <IconButton onClick={onRefreshClick}>
          <Refresh />
        </IconButton>
      </div>

      <DataGrid
        sx={{
          width: '100%',
          height: 'calc(100vh - 300px)',
          '& .MuiDataGrid-columnHeaders': {
          backgroundColor: '#E0E0E0',
          },
          }}
          rows={filteredRows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 15 },
            },
          }}
          pageSizeOptions={[15, 25]}
          disableColumnMenu
          disableRowSelectionOnClick
        />
    </Paper>
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