import React from 'react';
import { MyMessage } from 'src/lang/components';

const IDCardBlock = ({ style }) => (
  <div className={style.collapse_custom}>
    <div className={style.head}>
      <p className={style.label}>
        <MyMessage id="me.profile.verify.step3" />
      </p>
      <div className={style.extend}>
        <span className="badge badge-success">{true ? 'Verified' : ''}</span>
      </div>
    </div>
    <div className={style.content}>
      <p className={style.text}><MyMessage id="me.profile.text.id_verification.desc12" /></p>
    </div>
  </div>
);

export default IDCardBlock;
