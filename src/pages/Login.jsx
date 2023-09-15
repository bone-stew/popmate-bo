import React from 'react';
import styles from '../features/login/Login.module.css';
import LoginForm from '../features/login/LoginForm';

function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.title_box}>Sign in</div>
      <LoginForm />
    </div>
  );
}

export default Login;
