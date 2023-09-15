import React from 'react';
import styles from '../order/OrderList.module.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Search from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';

function OrderTop() {
  
  return (
    <div className={styles.orderListTop}>

      <div className={styles.roundretangle}>
        분류
      </div>
      <div className={styles.searchroundretangle}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <Search sx={{ color: 'action.active', mr: 1, my: 0.5, fontSize: 28 }} />
          <TextField id="input-with-sx" label="Search.." variant="standard" />
          </Box>
      </div>
      <RefreshIcon sx={{ color: 'action.active', mr: 1, my: 0.5 , fontSize: 28}} />
    </div>
  );
}

export default OrderTop;
