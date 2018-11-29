import React from 'react';
import { Link } from 'react-router-dom';
import logo from 'src/assets/images/logo.svg';
import cx from 'classnames';
import { URL } from 'src/resources/constants/url';
import currentUser from 'src/utils/authentication';
import ChangeLanguage from 'src/components/changeLanguage';
import MyMessage from 'src/lang/components/MyMessage';
import UserLogin from 'src/components/userLogin';
import styles from './styles.scss';

const menus = {
  home: {
    name: <MyMessage id="headerBar.home" />,
    link: URL.HOME
  },
  about_us: {
    name: <MyMessage id="headerBar.aboutUs" />,
    link: URL.ABOUT_US,
  },
  contact_us: {
    name: <MyMessage id="headerBar.contactUs" />,
    link: URL.CONTACT,
  },
  faq: {
    name: <MyMessage id="headerBar.faq" />,
    link: URL.FAQ_URL
  },
  wallet: {
    name: <MyMessage id="headerBar.wallet" />,
    link: URL.WALLET,
    auth: true
  },
};

const buttons = {
  sign_in: {
    name: <MyMessage id="headerBar.signIn" />,
    link: URL.USER_SIGN_IN,
    className: ''
  },
  sign_up: {
    name: <MyMessage id="headerBar.signUp" />,
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
