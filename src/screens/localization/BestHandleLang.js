import React, { PureComponent } from 'react';
import LabelLang from '../../lang/components/LabelLang';
import style from './style.scss';

// eslint-disable-next-line
export default class BestHandleLang extends PureComponent {
  render() {
    return (
      <div className={style.horizontal}>
        <div>Best Sample</div>
        {Date.now()}
        <LabelLang id="app.title" />
      </div>
    );
  }
}