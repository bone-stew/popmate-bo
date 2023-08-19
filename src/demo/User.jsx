import React, { useEffect } from 'react';
import 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, selectUser } from './userSlice';

function Users() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  if (user.loading) return <div>로딩중..</div>;
  return (
    <>
      <ul>
        {user.value.map((user) => (
          <li key={user.id}>
            {user.username} ({user.name})
          </li>
        ))}
      </ul>
      <button onClick={() => dispatch(fetchUser())}>다시 불러오기</button>
    </>
  );
}

export default Users;
