import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

export default class BestHandleLang extends React.PureComponent {
  render() {
    return (<div style={{ display: 'flex', flexDirection: 'column' }}>
      <div>Best Sample</div>
      {Date.now()}
      <FormattedMessage id={'helloWorld'} defaultMessage='Not found' />
    </div>)
  }
}