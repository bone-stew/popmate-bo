import React, { useEffect } from 'react';
import { useState } from 'react';
import MultipartAxios from '../../api/multipartAxios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styles from './StoreCreate.module.css';
import ImageListItem from '@mui/material/ImageListItem';
import ImageList from '@mui/material/ImageList';

import { Button, Table, TableHead, TableContainer, TableCell, TableRow, Paper, Stack } from '@mui/material';

function StoreInfo() {
  const [storeData, setStoreData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { storeId } = useParams();

  useEffect(() => {
    MultipartAxios.get(`popup-stores/${storeId}/edit`)
      .then((response) => {
        console.log(response);
        setStoreData(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [storeId]);

  const handleSubmit = () => {
    navigate(`/popup-stores/${storeId}/edit`);
  };

  if (!isLoading) {
    return (
      <div>
        <TableContainer>
          <Table variant={'outlined'}>
            <TableRow>
              <TableCell className={styles.table}>팝업스토어명</TableCell>
              <TableCell className={styles.table}>{storeData.title}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={styles.table}>팝업스토어 운영기간</TableCell>
              <TableCell className={styles.table}>
                {storeData.openDate} ~ {storeData.closeDate}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={styles.table}>팝업스토어 영업시간</TableCell>
              <TableCell className={styles.table}>
                {storeData.openTime} ~ {storeData.closeTime}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={styles.table}>운영지점</TableCell>
              <TableCell className={styles.table}>{storeData.department.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={styles.table}>상세 장소</TableCell>
              <TableCell className={styles.table}>{storeData.placeDetail}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={styles.table}>입장료</TableCell>
              <TableCell className={styles.table}>{storeData.entryFee}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={styles.table}>주최사</TableCell>
              <TableCell className={styles.table}>{storeData.organizer}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={styles.table}>예약 시간 간격</TableCell>
              <TableCell className={styles.table}>{storeData.reservationInterval}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={styles.table}>매장 수용 인원 수</TableCell>
              <TableCell className={styles.table}>{storeData.maxCapacity}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={styles.table}>시간대별 인원 수</TableCell>
              <TableCell className={styles.table}>{storeData.intervalCapacity}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={styles.table}>팀당 인원 수</TableCell>
              <TableCell className={styles.table}>{storeData.teamSizeLimit}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={styles.table}>대표 이미지</TableCell>
              <TableCell className={styles.table}>
                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img
                      style={{ maxWidth: '10rem', maxHeight: '10rem', borderRadius: '10px' }}
                      src={storeData.bannerImgUrl}
                      alt={`store item`}
                    />
                  </div>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ minWidth: '10rem' }} className={styles.table}>
                스토어 이미지
              </TableCell>
              <TableCell className={styles.table}>
                <Paper
                  sx={{
                    maxWidth: '45rem',
                  }}
                >
                  <Stack direction="row" alignItems="flex-start">
                    <ImageList
                      sx={{
                        margin: '2.5em 0.5em',
                        gridAutoFlow: 'column',
                        gridTemplateColumns: 'repeat(auto-fill,minmax(10rem,2fr)) !important',
                        gridAutoColumns: 'minmax(10rem, 2fr)',
                        overflowX: 'auto',
                      }}
                    >
                      {storeData.popupStoreImgResponse.map((imgObj, index) => (
                        <ImageListItem
                          sx={{
                            marginRight: '0.5rem',
                            maxWidth: '10rem',
                            maxHeight: '10rem',
                          }}
                          key={index}
                        >
                          <img className={styles.image} src={imgObj.imgUrl} alt={`store ${index}`} />
                        </ImageListItem>
                      ))}
                    </ImageList>
                  </Stack>
                </Paper>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={styles.table}>상세 설명</TableCell>
              <TableCell className={styles.table}>{storeData.description}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={styles.table}>이벤트 정보</TableCell>
              <TableCell className={styles.table}>{storeData.eventDescription}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={styles.table}>웹사이트 URL</TableCell>
              <TableCell className={styles.table}>
                {storeData.popupStoreSnsResponse.map((sns, index) => {
                  if (sns.platform === 'Website') {
                    return (
                      <a href={sns.url} target="_blank" rel="noopener noreferrer" key={index}>
                        {sns.url}
                      </a>
                    );
                  }
                  return null; // Render nothing when sns.platform is not 'Website'
                })}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={styles.table}>인스타그램 URL</TableCell>
              <TableCell className={styles.table}>
                {storeData.popupStoreSnsResponse.map((sns, index) => {
                  if (sns.platform === 'Website') {
                    return (
                      <a href={sns.url} target="_blank" rel="noopener noreferrer" key={index}>
                        {sns.url}
                      </a>
                    );
                  }
                  return null; // Render nothing when sns.platform is not 'Website'
                })}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={styles.table}>유튜브 URL</TableCell>
              <TableCell className={styles.table}>
                {storeData.popupStoreSnsResponse.map((sns, index) => {
                  if (sns.platform === 'Youtube') {
                    return (
                      <a href={sns.url} target="_blank" rel="noopener noreferrer" key={index}>
                        {sns.url}
                      </a>
                    );
                  }
                  return null; // Render nothing when sns.platform is not 'Website'
                })}
              </TableCell>
            </TableRow>
          </Table>
        </TableContainer>

        <TableContainer sx={{ marginTop: '10em', marginBottom: '10em' }}>
          <Table variant={'outlined'}>
            <TableHead sx={{ backgroundColor: '#F8F9FA' }}>
              <TableRow>
                <TableCell className={styles.table}>
                  <div>상품명</div>
                </TableCell>
                <TableCell className={styles.table}>
                  <div>상품 가격</div>
                </TableCell>
                <TableCell className={styles.table}>
                  <div>재고</div>
                </TableCell>
                <TableCell className={styles.table}>
                  <div>주문 가능수량(1인제한)</div>
                </TableCell>
                <TableCell className={styles.table}>
                  <div>상품 이미지</div>
                </TableCell>
              </TableRow>
            </TableHead>
            {storeData.popupStoreItemResponse.map((item, index) => (
              <TableRow>
                <TableCell className={styles.table}>
                  <div style={{ textAlign: 'center' }}>{item.name}</div>
                </TableCell>
                <TableCell className={styles.table}>
                  <div style={{ textAlign: 'center' }}>{item.stock}</div>
                </TableCell>
                <TableCell className={styles.table}>
                  <div style={{ textAlign: 'center' }}>{item.amount}</div>
                </TableCell>
                <TableCell className={styles.table}>
                  <div style={{ textAlign: 'center' }}>{item.orderLimit}</div>
                </TableCell>
                <TableCell className={styles.table}>
                  <div style={{ textAlign: 'center' }}>
                    <img style={{ maxWidth: '8rem', borderRadius: '10px' }} src={item.imgUrl} alt={`store item`} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </Table>
        </TableContainer>
        <div style={{ textAlign: 'center', margin: '5rem 0' }}>
          <Button type="submit" onClick={handleSubmit} variant="contained" sx={{ borderRadius: 28 }}>
            팝업스토어 수정
          </Button>
        </div>
      </div>
    );
  }
}

export default StoreInfo;
