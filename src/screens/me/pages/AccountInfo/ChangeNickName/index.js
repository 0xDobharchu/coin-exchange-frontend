import React from 'react';
import style from './style.scss';

const ChangeNickName = () => (
  <div className={style.container}>
    <div className={style.col2}>
      <div className={style.col2_1}>Nickname</div>
      <div className={style.col2_2}>This name will be shown in your preview</div>
    </div>
    <div className={style.col3}>
      <input type="text" />
    </div>
  </div>
);

export const ChangeNickNameField = ({ input }) => (
  <div className={style.container}>
    <div className={style.col2}>
      <div className={style.col2_1}>Nickname</div>
      <div className={style.col2_2}>This name will be shown in your preview</div>
    </div>
    <div className={style.col3}>
      <input {...input} type="text" />
    </div>
  </div>
);

export default ChangeNickName;
