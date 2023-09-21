import React, { useState, useEffect } from 'react';
import styles from '../features/admin/MainBanner.module.css';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import imgLogo from '../img/Image.png'
import JsonAxios from '../api/jsonAxios';
import multipartJsonAxios from '../api/multipartAxios';
import deleteBtn from '../img/deletebtn.png'
import Button from '@mui/material/Button'


function MainBanner() {
  
  const [popupStoreId, setPopupStoreId] = useState(0);
  const [title, setTitle] = useState('');
  const [menuItems, setMenuItems] = useState([]);
  const [list, setList] = useState([]);
  const [banners, setBanners] = useState([]);
  const [fileName, setFileName] = React.useState('이미지 첨부하기');
  const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
      fetchdata();
    }, []);

    useEffect(() => {
      JsonAxios.get('http://localhost:8080/api/v1/admin/banners').then((res) => {
          setBanners(res.data.data.bannerResponses);
        }).catch((error) => {
          console.log(error)
        });
      }, []);

    // 여긴 맞게 들어오는지 확인하고싶을때 실제로는 그냥 fileName을 쓰면 된다.
    // useEffect(() => {
    //   console.log(fileName);
    // }, [fileName]);
    

    const fetchdata = async () => {
      try{
        const response = await JsonAxios.get('http://localhost:8080/api/v1/admin/title');
        const list = response.data.data.backOfficePopupStoreResponse
        setList(list);
        const newMenuItems = list.map((item) => (
          <MenuItem key={item.popupStoreId} value={item.popupStoreId}>
            {item.title}
          </MenuItem>
        ));
          setMenuItems(newMenuItems);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    const handleChange = (event) => {
      const selectedPopupStoreId = event.target.value;
      setPopupStoreId(selectedPopupStoreId);
      const selectedTitle = findTitleByPopupStoreId(selectedPopupStoreId);
      setTitle(selectedTitle);
    };
    const findTitleByPopupStoreId = (popupStoreId) => {
      const foundItem = list.find(item => item.popupStoreId === popupStoreId);
      return foundItem ? foundItem.title : '';
    };

    const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        setSelectedFile(selectedFile);
        setFileName(selectedFile.name);
      } else {
        setSelectedFile(null);
        setFileName('이미지 첨부하기');
      }
    };

    const postBanner = () => {
      console.log(fileName)
      console.log(popupStoreId)
      if(banners.length===5){
        alert('등록할 수 있는 최대 사진 수 입니다.')
      }else{
        if(fileName ==='이미지 첨부하기' || popupStoreId===0){
          alert('팝업스토어와 이미지를 다 선택해주세요')
      }else{
        const formData = new FormData();
        formData.append('multipartFile', selectedFile);
        formData.append('popupStoreId', popupStoreId);
        // for (const pair of formData.entries()) {
        //   console.log(pair[0], pair[1]);
        // }
        multipartJsonAxios.post('http://localhost:8080/api/v1/admin/banners/new',formData).then((res) => {
            setSelectedFile(null);
            setFileName('이미지 첨부하기');
            setTitle('');
            setPopupStoreId(0);
            console.log(title);
            const bannerInfo = res.data.data;
            const newBanner = {
              bannerId : bannerInfo.bannerId,
              bannerImgUrl : bannerInfo.bannerImgUrl,
              closeDate : bannerInfo.closeDate,
              imgUrl : bannerInfo.imgUrl,
              openDate : bannerInfo.openDate,
              organizer : bannerInfo.organizer,
              placeDetail : bannerInfo.placeDetail,
              popupStoreId : bannerInfo.popupStoreId,
              title : bannerInfo.title
            };
            const updatedBanners = [...banners, newBanner];
            setBanners(updatedBanners);
          }).catch((error) => {
            console.log(error)
          });
        }
      }
    }

    const handleDeleteImage = (banner) => {
      // banner 객체에서 필요한 정보에 접근
      const bannerId = banner.bannerId;
      console.log(bannerId);
      const url = `http://localhost:8080/api/v1/admin/banners/${bannerId}`;
      JsonAxios.delete(url).then((res) => {
          console.log(res.data)
          const updatedBanners = banners.filter((b) => b.bannerId !== bannerId);
          setBanners(updatedBanners);
        }).catch((error) => {
          console.log(error)
        });
      
    };
    
    function formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}.${month}.${day}`;
    }

  return (
    <div className={styles.container}>
      <h3>메인 배너 등록</h3>
      <div className= {styles.bottom}>
        <div className= {styles.bottomfirst}>
          <div className= {styles.bottomfirsttitle}>
              <div>팝업스토어&nbsp;</div>
              <div className= {styles.red}>(*)</div>
          </div>
          
          <div className= {styles.bottomfirstcontent}>
            <FormControl sx={{ m: 1, minWidth: 390}}>
                  <Select
                    value={popupStoreId || ''}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    sx={{ height: '53px' }} // 세로 크기 조절
                  >
                    {menuItems}
                  </Select>
              </FormControl>
          </div>
        </div>
        
        <div className= {styles.bottomsecond}>
          <div className= {styles.bottomsecondtitle}>
              <div>배너 이미지&nbsp;</div>
              <div className= {styles.red}>(*)</div>
          </div>
          <div className= {styles.bottomsecondImg}>
              <div className= {styles.labelContainer }>
                <label htmlFor="profile-upload" className={styles.customFileInput}>
                  <div><img src={imgLogo} alt="이미지" width='20px'/></div>
                  <div className={styles.bottomImgtxt}>{fileName}</div>
                </label>
                <input type="file" 
                id="profile-upload" 
                accept="image/*" 
                className={styles.fileInput}
                onChange={handleFileChange}
                />
              </div>
          </div>
        </div>
        
        <div className={styles.bottombuttton}>
          <Button className={styles.bottombuttton1} variant="contained" onClick={postBanner}>등록</Button>
        </div>
      </div>

      <h3>등록된 배너</h3>
      <div className={styles.mainbanner}>
        {banners.map((banner, index) => (
            <div key={index} className={styles.imageContainer}>
              <img src={banner.imgUrl} alt={`이미지 ${index + 1}`} className={styles.image} />
              <img src={deleteBtn} alt="삭제" width='25px' className={styles.imgdeletebuttton} onClick={() => handleDeleteImage(banner)}/>
              <div className={styles.imagebottom}>
                <div className={styles.imagebottomfirst}>
                  <div className={styles.imagebottomfirstimage}>
                  <img src={banner.bannerImgUrl} alt={`이미지 ${index + 1}`}/>
                  </div>
                </div>
                <div className={styles.imagebottomsecond}>
                  <div className={styles.imagebottomtitle}>{banner.title}</div>
                  <div className={styles.imagebottomtext}>{banner.placeDetail}</div>
                  <div className={styles.imagebottomtext}>{formatDate(banner.openDate)} ~ {formatDate(banner.closeDate)}</div>
                  <div className={styles.imagebottomtext}>{banner.organizer}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
    </div>
  );
}

export default MainBanner;
