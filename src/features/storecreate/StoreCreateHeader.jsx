import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

function StoreCreateHeader() {
  return (
    <div style={{ marginLeft: '5%', marginBottom: '5em' }}>
      <h1>팝업스토어 등록</h1>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          OVERVIEW
        </Link>
        <Link underline="hover" color="inherit" href="/manage">
          팝업스토어 관리
        </Link>
        <Typography color="text.primary">팝업스토어 등록</Typography>
      </Breadcrumbs>
    </div>
  );
}

export default StoreCreateHeader;
