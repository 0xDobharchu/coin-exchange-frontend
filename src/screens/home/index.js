import React from 'react';
import photo from 'src/assets/images/1.png';
import { Link } from 'react-router-dom';
import style from './style.scss';

export default () => {
  return (
    <div className={style.container}>
      <h1>HOME</h1>
      <Link to="contact">Contact</Link>
      <img className={style.photo} src={photo} />
    </div>
  );
};