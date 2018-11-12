import React from 'react';
import { Link } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import questionIcon from 'src/assets/icons/coinPage/question_icon.png';
import styles from './styles.scss';

const Contact = () => (
  <div className={styles.container}>
    <div className={styles.item}>
      <img src={questionIcon} alt="" />
      <Link to="coin/faq"><span>FAQ</span></Link>
    </div>
    <div className={styles.item}>
      <img src={questionIcon} alt="" />
      <Link to="/"><span>Chat with us</span></Link>
    </div>
    <div className={styles.item}>
      <img src={questionIcon} alt="" />
      <a href="tel:097 550 4082"><span>097 550 4082</span></a>
    </div>
  </div>
);

export default injectIntl(Contact);
