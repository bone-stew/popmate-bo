import React from 'react';
import styles from '../features/admin/MainBanner.module.css';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import imgLogo from '../img/Image.png'
import deleteBtn from '../img/deletebtn.png'
import Button from '@mui/material/Button'


function MainBanner() {
  
    const [age, setAge] = React.useState('');
    const [fileName, setFileName] = React.useState('이미지 첨부하기');
    const [imageUrls, setImageUrls] = React.useState([]);


    const handleChange = (event) => {
      setAge(event.target.value);
    };

    const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        setFileName(selectedFile.name);
        console.log(fileName)
      } else {
        setFileName('이미지 첨부하기');
      }
    };

    const fetchImageUrls = () => {
      // 이미지 URL을 받아오는 로직을 구현하고, 결과를 setImageUrls를 통해 상태에 설정합니다.
      const fetchedImageUrls = ['https://popmate-bucket.s3.ap-northeast-2.amazonaws.com/banner_imgs/39c38f5d-1bf4-47ac-9930-312b338fc97e-b1.jpg', 'https://popmate-bucket.s3.ap-northeast-2.amazonaws.com/store_imgs/b0b32941-9298-4933-85ce-042b43fb3f3d-b4.png','https://popmate-bucket.s3.ap-northeast-2.amazonaws.com/store_imgs/b0b32941-9298-4933-85ce-042b43fb3f3d-b4.png'
    , 'https://popmate-bucket.s3.ap-northeast-2.amazonaws.com/banner_imgs/39c38f5d-1bf4-47ac-9930-312b338fc97e-b1.jpg'];
      setImageUrls(fetchedImageUrls);
    };

    const handleRemoveImage = (indexToRemove) => {
      // 이미지 URL 배열에서 해당 인덱스의 URL을 제거합니다.
      const updatedImageUrls = imageUrls.filter((_, index) => index !== indexToRemove);
      setImageUrls(updatedImageUrls);
    };

    React.useEffect(() => {
      fetchImageUrls();
    }, []); // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때만 실행되도록 설정
    
    
  

  return (
    <div className={styles.container}>
      <h1>메인 배너 등록</h1>
      <div className={styles.mainbanner}>
        <div className={styles.mainbannertop}>
        {imageUrls.map((imageUrl, index) => (
            <div key={index} className={styles.imageContainer}>
              <img src={imageUrl} alt={`이미지 ${index + 1}`} className={styles.image} />
              <img src={deleteBtn} alt="삭제" width='25px' className={styles.imgdeletebuttton} onClick={() => handleRemoveImage(index)}/>
            </div>
          ))}
        </div>
        <div className={styles.mainbannerbottom}>
          <div>- 첫번째 등록하신 사진은 대표이미지가 됩니다.</div>
          <div>- 사진은 최대 5장까지 등록 가능합니다.</div>
        </div>
      </div>

      <div className= {styles.bottom}>
        <div className= {styles.bottomfirst}>
          <div>팝업스토어&nbsp;</div>
          <div className= {styles.red}>(*)</div>
        </div>
        <Divider orientation="vertical" flexItem />

        <div className= {styles.selectpopupstore}>
          <FormControl sx={{ m: 1, minWidth: 440}}>
              <Select
                value={age}
                onChange={handleChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                sx={{ height: '53px' }} // 세로 크기 조절
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
          </FormControl>
        </div>

        <div className= {styles.bottomsecond}>
          <div>배너 이미지&nbsp;</div>
          <div className= {styles.red}>(*)</div>
        </div>

        <Divider orientation="vertical" flexItem />

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
        
        <div className={styles.bottombuttton}>
          <Button className={styles.bottombuttton1} variant="contained">등록</Button>
        </div>

      </div>
      
      

    </div>
  );
}

export default MainBanner;
