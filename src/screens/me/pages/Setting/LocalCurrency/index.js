import React from 'react';
import dropdownField from 'src/components/core/form/fields/dropdown';
import { Field } from 'redux-form';
import style from './style.scss';

const mocksCountry = [
  { label: 'IDR', value: 'IDR'},
  { label: 'PHP', value: 'PHP'},
  { label: 'USD', value: 'USD'},
  { label: 'Philippiens', value: 'PH'},
];
const DropDownCurrencyField = () => (
  <Field
    name="currency"
    component={dropdownField}
    list={mocksCountry}
  />
);

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

export const LocalCurrencyField = () => (
  <div className={style.container}>
    <div className={style.col2}>
      <div className={style.col2_1}>Local Currency</div>
      {/* <div className={style.col2_2}>This name will be shown in your preview</div> */}
    </div>
    <div className={style.col3}>
      <DropDownCurrencyField />
    </div>
  </div>
);

export default LocalCurrency;
