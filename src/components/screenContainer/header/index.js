import React from 'react';
import { Link } from 'react-router-dom';
import logo from 'src/assets/images/logo.svg';
import cx from 'classnames';
import { MdKeyboardArrowDown } from 'react-icons/md';
import styles from './styles.scss';

const menus = {
  about_us: {
    name: 'About Us',
    link: '/about-us',
    icon: <MdKeyboardArrowDown />
  },
  faq: {
    name: 'FAQ',
    link: '/faq'
  },
  team: {
    name: 'Team',
    link: '/team'
  },
};

const buttons = {
  sign_in: {
    name: 'Sign In',
    link: '/sign-in',
    className: 'buttonSignIn'
  },
  sign_up: {
    name: 'Sign up',
    link: '/sign-up',
    className: 'buttonSignUp'
  },
};

const Header = () => (
  <header className={styles.headerContainer}>
    <img className={styles.logo} src={logo} alt="coinbowl-logo" />
    <div className={styles.items}>
      {
        Object.entries(menus).map(([ key, menu ]) => (
          <Link to={menu.link} key={key}>
            <span className={styles.menuItem}>
              {menu.name}
              {menu.icon}
            </span>
          </Link>
        ))
      }
    </div>
    <div className={styles.buttons}>
      {
        Object.entries(buttons).map(([ key, button ]) => (
          <Link to={button.link} key={key}><button type="button" className={cx(styles[button.className], styles.button)}>{button.name}</button></Link>
        ))
      }
    </div>
  </header>
);

export default Header;
