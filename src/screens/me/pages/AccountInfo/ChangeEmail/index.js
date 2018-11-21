import React from 'react';
import style from './style.scss';

const ChangeEmail = () => (
  <div className={style.container}>
    <div className={style.col2}>
      <div className={style.col2_1}>Email</div>
      {/* <div className={style.col2_2}>This name will be shown in your preview</div> */}
    </div>
    <div className={style.col3}>
      <input type="text" />
    </div>
  </div>
);

export default ChangeEmail;
