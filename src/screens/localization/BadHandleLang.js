import React from 'react';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import style from './style.scss';

const BadHandleLang = () => (
  <div className={style.horizontal}>
    <div>Bad Sample</div>
    <div>{Date.now()}</div>
    <FormattedMessage id="app.title" defaultMessage="Not found" />
    <FormattedHTMLMessage id="app.name" defaultMessage="" />
  </div>
);

export default BadHandleLang;
