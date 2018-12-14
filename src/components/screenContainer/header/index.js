import React from 'react';
import { Link } from 'react-router-dom';
import logo from 'src/assets/images/logo.svg';
import cx from 'classnames';
import { URL } from 'src/resources/constants/url';
import currentUser from 'src/utils/authentication';
import ChangeLanguage from 'src/components/changeLanguage';
import LabelLang from 'src/lang/components/LabelLang';
import UserLogin from 'src/components/userLogin';
import styles from './styles.scss';

export const menus = {
  home: {
    name: <LabelLang id="headerBar.home" />,
    link: URL.HOME
  },
  promotion_programs: {
    name: <LabelLang id="headerBar.promotionPrograms" />,
    link: URL.PROMOTION_PROGRAM
  },
  about_us: {
    name: <LabelLang id="headerBar.aboutUs" />,
    link: URL.ABOUT_US,
  },
  contact_us: {
    name: <LabelLang id="headerBar.contactUs" />,
    link: URL.CONTACT,
  },
  faq: {
    name: <LabelLang id="headerBar.faq" />,
    link: URL.FAQ_URL
  },
  wallet: {
    name: <LabelLang id="headerBar.wallet" />,
    link: URL.WALLET,
    auth: true
  },
  howItWorks: {
    name: <LabelLang id="headerBar.howItWorks" />,
    link: URL.HOW_IT_WORKS,
    className: 'd-block d-md-none'
  },
};

export const buttons = {
  sign_in: {
    name: <LabelLang id="headerBar.signIn" />,
    link: URL.USER_SIGN_IN,
    className: ''
  },
  sign_up: {
    name: <LabelLang id="headerBar.signUp" />,
    link: URL.USER_SIGN_UP,
    className: 'active'
  },
};

const Header = () => {

  return (
    <header className={styles.headerWarper}>
      <div className={cx('container',styles.headerContainer)}>
        <Link to={URL.HOME}>
          <img className={styles.logo} src={logo} alt="coinbowl-logo" />
        </Link>
        <div className={styles.items}>
          {
          Object.entries(menus).map(([ key, menu ]) => (!menu.auth || menu.auth === currentUser.isLogin()) && (
            <Link to={menu.link} key={key}>
              <span className={styles.menuItem}>
                {menu.name}
                {menu.icon}
              </span>
            </Link>
          ))
        }
        </div>
        <ChangeLanguage />
        {currentUser.isLogin() ? (
          <UserLogin />
        ): (
          <div className={styles.buttons}>
            {
            Object.entries(buttons).map(([ key, button ]) => (
              <Link to={button.link} key={key}><button type="button" className={cx(styles[button.className], styles.button)}>{button.name}</button></Link>
            ))
          }
          </div>) }
      </div>
    </header>
  );};

export default Header;
