import React from 'react';
import { FormattedMessage } from 'react-intl';
import style from './style.scss';

const BadHandleLang = () => (
  <div className={style.horizontal}>
    <div>Bad Sample</div>
    <div>{Date.now()}</div>
    <FormattedMessage id="helloWorld" defaultMessage="Not found" />
  </div>
);

export default BadHandleLang;
