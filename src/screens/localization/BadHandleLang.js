import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

export default class BadHandleLang extends React.Component {
  render() {
    return (<div style={{ display: 'flex', flexDirection: 'column' }}>
      <div>Bad Sample</div>
      <div>{Date.now()}</div>
      <FormattedMessage id={'helloWorld'} defaultMessage='Not found' />
    </div>)
  }
}