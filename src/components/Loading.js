import React from 'react';
import styles from './Components.module.css';

function Spinner() {
  return (
    <div className={styles.customLoaderContainer}>
      <div className={styles.customLoader}></div>
    </div>
  );
}

export default Spinner;
