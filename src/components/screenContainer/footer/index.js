import React from 'react';
import { WrapperLang } from 'src/lang/components';
import SocialBox from 'src/screens/me/pages/Referral/socialBox';
import style from './styles.scss';

const Footer = () => (
  <footer className={style.container}>
    <div className={style.footer}>
      <div className={style.col}>
        <div className={style.desc}>21 Revolution Street</div>
        <div className={style.desc}>+1 555 123456</div>
        <div className={style.bold}>support@company.com</div>
      </div>
      <div className={style.col}>
        <div className={style.title}>About CoinBowl</div>
        <div className={style.desc}>Coinbowl.com is a new crypto exchange specifically designed for people living in Asia, who have had limited access to crypto markets. CoinBowl enables users to trade large amounts of crypto at great prices. Users can buy or sell an uncapped quantity of crypto with 1 price for 1 order</div>
        <div className={style.socialBox}>
          <WrapperLang>
            {ts =>
              <SocialBox socialLink="fasdfa" socialText={ts('app.description')} />
            }
          </WrapperLang>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
