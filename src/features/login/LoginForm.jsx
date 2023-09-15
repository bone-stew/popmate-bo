import React, { useState } from 'react';
import styles from './Login.module.css';
import { Button, Divider, TextField } from '@mui/material';

function LoginForm() {
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
    console.log(inputs);
  };

  return (
    <div className={styles.login_container}>
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
