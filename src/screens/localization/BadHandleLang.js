import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import style from './style.scss';

export default class BadHandleLang extends Component {
  render() {
    return (<div className={style.horizontal}>
      <div>Bad Sample</div>
      <div>{Date.now()}</div>
      <FormattedMessage id={'helloWorld'} defaultMessage='Not found' />
    </div>)
  }
}