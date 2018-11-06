import React from 'react';
import { Link } from 'react-router-dom';
import styles from './style.scss';

export default (props) => {
  console.log(props)
  return (
    <div className={styles.container}>
      CONTACT
      <Link to="/">Home</Link>
    </div>
  );
};