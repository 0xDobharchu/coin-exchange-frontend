import React from 'react';
import {Link} from 'react-router-dom';
import { URL } from 'src/resources/constants/url';
import { WrapperLang, LabelLang } from 'src/lang/components';
import SocialBox from './socialBox';
import style from './styles.scss';


const Footer = () => (
  <footer className={style.container}>
    <div className={style.footer}>
      <div className={style.col}>
        <div className={style.bold}>
          <Link to={URL.AGREEMENT}><LabelLang id="footer.privacy" /></Link>
        </div>
        <div className={style.bold}>
          <Link to={URL.PROMOTION_PROGRAM}><LabelLang id="footer.referralProgram" /></Link>
        </div>
        <div className={style.bold}>
          <Link to="/digital-assets"><LabelLang id="footer.assetIntro" /></Link>
        </div>
        <div className={style.bold}>
          <Link to="/api_reference"><LabelLang id="footer.apiDocumentation" /></Link>
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
