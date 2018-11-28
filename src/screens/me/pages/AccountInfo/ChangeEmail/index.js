import React from 'react';
import { MyMessage } from 'src/lang/components';
import style from './style.scss';

const ChangeEmail = () => (
  <div className={style.container}>
    <div className={style.col2}>
      <div className={style.col2_1}><MyMessage id="me.accountInfo.email" /></div>
      {/* <div className={style.col2_2}>This name will be shown in your preview</div> */}
    </div>
    <div className={style.col3}>
      <input type="text" />
    </div>
  </div>
);

export const ChangeEmailField = ({ input }) => (
  <div className={style.container}>
    <div className={style.col2}>
      <div className={style.col2_1}><MyMessage id="me.accountInfo.email" /></div>
      {/* <div className={style.col2_2}>This name will be shown in your preview</div> */}
    </div>
    <div className={style.col3}>
      <input {...input} type="text" />
    </div>
  </div>
);

export default ChangeEmail;
