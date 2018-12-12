import React from 'react';
import { Link } from 'react-router-dom';
import { URL } from 'src/resources/constants/url';
import LabelLang from 'src/lang/components/LabelLang';
import styles from './styles.scss';

export default () => (
  <div className={styles.container}>
    <div className={styles.notFound}>
      <span><LabelLang id='pageNotFound.pageNotFound' /></span>
      <span><LabelLang id='pageNotFound.descText' /></span>
    </div>
    <Link to={URL.HOME}>
      <span className={styles.backHome}>
        <LabelLang id='pageNotFound.backHome' />
      </span>
    </Link>
  </div>
);
