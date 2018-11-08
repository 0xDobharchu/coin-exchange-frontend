import React, { PureComponent } from 'react';
import LabelLang from '../../lang/components/LabelLang';

export default class BestHandleLang extends PureComponent {
  render() {
    return (<div style={{ display: 'flex', flexDirection: 'column' }}>
      <div>Best Sample</div>
      {Date.now()}
      <LabelLang id={'helloWorld'}/>
    </div>)
  }
}