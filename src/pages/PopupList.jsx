import React from 'react';
import StoreListTable from '../features/popupList/StoreListTable';
import { useDispatch } from 'react-redux';
import { setHeaderTitle } from '../slices/headerSlice';

function PopupList() {
  const dispatch = useDispatch();
  dispatch(setHeaderTitle('팝업스토어 목록'));
  return <StoreListTable />;
}

export default PopupList;
