import React from 'react';
import style from './style.scss';

const ChangePassword = () => (
  <div className={style.container}>
    <div className={style.col2}>
      <div className={style.col2_1}>Change password</div>
      <div className={style.col2_2}>Max file size is 20mb</div>
    </div>
    <div className={style.col3}>
      <button type="button">Change password</button>
    </div>
  </div>
);

export default ChangePassword;
