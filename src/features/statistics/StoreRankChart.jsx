import { List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
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
      <Typography mt={2} ml={1} fontWeight={'bold'} variant="h6">
        팝업 스토어 순위
      </Typography>
      {popupStoreRanks.map((item, index) => {
        return (
          <ListItem key={item.popupStoreId}>
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
