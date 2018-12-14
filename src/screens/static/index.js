import React from 'react';
import style from './styles.scss';

const StaticPage = ({ match }) => (
  <div className={style.container}>
    <div className={style.title}>Static Page {match.params.id}</div> 
    <div className={style.content}>
      fasdfasdfasdf
    </div>
  </div>
);

export default StaticPage;