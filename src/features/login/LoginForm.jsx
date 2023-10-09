import React, { useState } from 'react';
import styles from './Login.module.css';
import { Alert, Button, Divider, TextField } from '@mui/material';
import JsonAxios from '../../api/jsonAxios';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../../slices/userSlice';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [alert, _alert] = useState(false);
  const [inputs, _inputs] = useState({
    id: '',
    password: '',
  });

  const onChange = (e) => {
    const { value, name } = e.target;
    _inputs({
      ...inputs,
      [name]: value,
    });
  };

  const onClick = () => {
    JsonAxios.post('/oauth/office', { id: inputs.id, password: inputs.password })
      .then(async ({ data }) => {
        sessionStorage.setItem('accessToken', data.data.token);
        console.log(data);
        dispatch(fetchUser()).then(() => {
          navigate('/');
        });
      })
      .catch(() => {
        _alert(true);
      });
  };

  return (
    <div className={styles.login_container}>
      {alert && (
        <Alert sx={{ marginTop: '50px', marginBottom: '10px' }} severity="warning">
          Incorrect username or password.
        </Alert>
      )}
      <TextField
        name="id"
        className={styles.input}
        onChange={onChange}
        margin="dense"
        label="ID"
        size="small"
        value={inputs.id}
      />
      <TextField
        name="password"
        className={styles.input}
        onChange={onChange}
        margin="dense"
        type="password"
        label="PASSWORD"
        size="small"
        value={inputs.password}
      />
      <Divider sx={{ margin: '20px' }} width="100%" />
      <Button
        sx={{ backgroundColor: '#233044' }}
        className={styles.input}
        onClick={onClick}
        variant="contained"
        size="small"
      >
        sign in
      </Button>
      <div className={styles.find_account}>
        <span>Did you forgot password?</span>
        <span> find account</span>
      </div>
    </div>
  );
}

export default LoginForm;
