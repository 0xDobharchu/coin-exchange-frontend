import React from 'react';
import { WrapperLang, LabelLang } from 'src/lang/components';
import SocialBox from 'src/screens/me/pages/Referral/socialBox';
import style from './styles.scss';

const Footer = () => (
  <footer className={style.container}>
    <div className={style.footer}>
      <div className={style.col}>
        <div className={style.bold}>
          <LabelLang id="footer.privacy" />
        </div>
        <div className={style.bold}>
          <LabelLang id="footer.referralProgram" />
        </div>
        <div className={style.bold}>
          <LabelLang id="footer.assetIntro" />
        </div>
        <div className={style.bold}>
          <LabelLang id="footer.apiDocumentation" />
        </div>
      </div>
      <div className={style.col}>
        <div className={style.title}>
          <LabelLang id="footer.aboutTitle" />
        </div>
        <div className={style.desc}>
          <LabelLang id="footer.aboutDesc" />
        </div>
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
