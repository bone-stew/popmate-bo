import { Button } from '@mui/material';
import React from 'react';

const colors = {
  /* 초록색 */
  green: {
    backgroundColor: '#D2F3E8',
    color: '#00A76F',
  },
  /* 파란색 */
  blue: {
    backgroundColor: '#EAEBFF',
    color: '#1273E4',
  },
  /* 보라색 */
  purple: {
    backgroundColor: '#F1EDFF',
    color: '#9071C3',
  },
  /* 빨간색 */
  red: {
    backgroundColor: '#FFDDDD',
    color: '#FF6D6D',
  },
  /* 노란색 */
  yellow: {
    backgroundColor: '#FEF0D2',
    color: '#FFAB00',
  },
  /* 노란색 */
  orange: {
    backgroundColor: '#FFDAB9',
    color: '#eb8621',
  },
};

function StyledButton({ color, text, onClick }) {
  return (
    <Button fullWidth onClick={onClick} sx={{ ...colors[color] }}>
      {text}
    </Button>
  );
}

export default StyledButton;
