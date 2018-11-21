import React from 'react';
import ChangePicture from './ChangePicture';
import ChangePassword from './ChangePassword';
import ChangeNickName from './ChangeNickName';
import ChangeEmail from './ChangeEmail';
import style from './style.scss';

const AccountInfo = () => (
  <div className={style.container}>
    <label className={style.title}>User profile</label>
    <div className={style.lineTitle} />
    <div className={style.block1}>
      <div className={style.col}><ChangePicture /></div>
      <div className={style.col}><ChangePassword /></div>
    </div>
    <div className={style.lineTitle} />
    <div className={style.block1}>
      <ChangeNickName />
    </div>
    <div className={style.block1}>
      <ChangeEmail />
    </div>
    <div className={style.lineTitle} />
  </div>
);

export default AccountInfo;
