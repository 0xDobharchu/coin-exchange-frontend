import React from 'react';
import style from './style.scss';

const LocalCurrency = () => (
  <div className={style.container}>
    <div className={style.col2}>
      <div className={style.col2_1}>Local Currency</div>
      {/* <div className={style.col2_2}></div> */}
    </div>
    <div className={style.col3}>
      <input type="text" />
    </div>
  </div>
);

export const LocalCurrencyField = ({ input }) => (
  <div className={style.container}>
    <div className={style.col2}>
      <div className={style.col2_1}>Local Currency</div>
      {/* <div className={style.col2_2}>This name will be shown in your preview</div> */}
    </div>
    <div className={style.col3}>
      <input {...input} type="text" />
    </div>
  </div>
);

export default LocalCurrency;
