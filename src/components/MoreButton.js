import React from 'react';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function MoreButton({ handler }) {
  return (
    <IconButton onClick={handler} aria-label="더보기" size="small" edge="end">
      <MoreVertIcon />
    </IconButton>
  );
}

export default MoreButton;
