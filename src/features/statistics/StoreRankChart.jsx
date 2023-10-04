import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import React from 'react';

function StoreRankChart({ popupStoreRanks }) {
  return (
    <List
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
      }}
    >
      {popupStoreRanks.map((item, index) => {
        return (
          <ListItem sx={{ flex: '0 0 calc(20% - 10px)', marginBottom: '10px' }} key={item.popupStoreId} disablePadding>
            <ListItemButton>
              <ListItemText primary={`${index + 1}. ${item.title}`}></ListItemText>
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}

export default StoreRankChart;
