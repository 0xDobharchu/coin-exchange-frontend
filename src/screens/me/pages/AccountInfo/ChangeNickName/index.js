import React from 'react';
import { LabelLang } from 'src/lang/components';
import style from './style.scss';

const ChangeNickName = () => (
  <div className={style.container}>
    <div className={style.col2}>
      <div className={style.col2_1}><LabelLang id="me.accountInfo.nickname" /></div>
      <div className={style.col2_2}><LabelLang id="me.accountInfo.nickname_note" /></div>
    </div>
    <div className={style.col3}>
      <input type="text" />
    </div>
  </div>
);

export const ChangeNickNameField = ({ input }) => (
  <div className={style.container}>
    <div className={style.col2}>
      <div className={style.col2_1}><LabelLang id="me.accountInfo.nickname" /></div>
      <div className={style.col2_2}><LabelLang id="me.accountInfo.nickname_note" /></div>
    </div>
    <div className={style.col3}>
      <input {...input} type="text" disabled="true" />
    </div>
  </div>
);

export default ChangeNickName;
