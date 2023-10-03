/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { IconButton, InputAdornment, MenuItem, OutlinedInput, Paper, TextField } from '@mui/material';
import { Refresh, Search } from '@mui/icons-material';
import JsonAxios from '../../api/jsonAxios';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'title', headerName: '팝업스토어명', minWidth: 240, headerAlign: 'center', align: 'center', flex: 2 },
  {
    field: 'name',
    headerName: '지점',
    minWidth: 180,
    headerAlign: 'center',
    align: 'center',
    flex: 1,
    valueGetter: (params) => {
      return params.row.departmentName.split('T')[0];
    },
  },
  {
    field: 'close_date',
    headerName: '기간',
    minWidth: 240,
    valueGetter: (params) => {
      return `${params.row.openDate.split('T')[0]} ~ ${params.row.closeDate.split('T')[0]}`;
    },
    headerAlign: 'center',
    align: 'center',
    flex: 2,
  },
  { field: 'organizer', headerName: '주체기관', minWidth: 180, headerAlign: 'center', align: 'center', flex: 1 },
  {
    field: 'created_at',
    headerName: '등록일',
    minWidth: 100,
    valueGetter: (params) => {
      return params.row.createdAt.split('T')[0];
    },
    headerAlign: 'center',
    align: 'center',
    flex: 2,
  },
];

function StoreListTable() {
  const navigate = useNavigate();
  const [stores, _stores] = useState([]);
  const [category, _category] = useState(0);
  const [query, _query] = useState('');
  const [paginationModel, _paginationModel] = useState({
    page: 0,
    pageSize: 15,
  });
  const [sortModel, _sortModel] = useState(null);
  const [totalPage, _totalPage] = useState(0);
  const [flag, _flag] = useState(false);

  const handleItemClick = (popupStoreId) => {
    navigate(`/popup-stores/${popupStoreId}/detail`);
  };

  function updateList() {
    JsonAxios.get('popup-stores/search', {
      params: {
        query: query,
        type: category,
        page: paginationModel.page,
        size: paginationModel.pageSize,
        sort: sortModel != null ? `${sortModel.field},${sortModel.sort}` : null,
      },
    })
      .then((res) => {
        const list = res.data.data.popupStores;
        list.forEach((element) => {
          element.id = element.popupStoreId;
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
    _sortModel(null);
    _paginationModel({ page: 0, pageSize: 15 });
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
            _paginationModel({ ...paginationModel, page: 0 });
            _flag(!flag);
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

      <DataGrid
        sx={{
          width: '100%',
          height: 'calc(100vh - 300px)',
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: 'rgb(242, 244, 246)',
          },
        }}
        onRowClick={(params) => {
          handleItemClick(params.id);
        }}
        rows={stores}
        columns={columns}
        rowCount={totalPage}
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={(model) => {
          _paginationModel(model);
          _flag(!flag);
        }}
        sortingMode="server"
        sortModel={[sortModel == null ? { field: '', sore: '' } : sortModel]}
        onSortModelChange={(model) => {
          _sortModel(...model);
          _flag(!flag);
        }}
        pageSizeOptions={[15, 25]}
        disableColumnMenu
        disableRowSelectionOnClick
      />
    </Paper>
  );
}

export default StoreListTable;
