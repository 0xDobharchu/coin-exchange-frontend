import React, { PureComponent } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from 'src/assets/images/logo_white.svg';
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
    link: `${URL.STATIC_PAGE}/how_it_works`,
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

class Header extends PureComponent {
  constructor(props) {
    super();
    this.state = { currentRoute: props?.history?.location?.pathname };
  }

  handlerClick = (url) => {
    if (!url) return;
    const { history } = this.props;
    const { location: { pathname } } = history;
    history?.push(url);

    this.setState({ currentRoute: pathname });
  }

  render () {
    const { currentRoute } = this.state;
    return (
      <header className={styles.headerWarper}>
        <div className={cx(styles.headerContainer)}>
          <Link to={URL.HOME}>
            <img className={styles.logo} src={logo} alt="coinbowl-logo" />
          </Link>
          <div className={styles.items}>
            {
            Object.entries(menus).map(([ key, menu ]) => (!menu.auth || menu.auth === currentUser.isLogin()) && (
              <span role="presentation" onClick={() => this.handlerClick(menu.link)} key={key} className={cx('common-clickable', menu.className)}>
                <span className={cx(styles.menuItem, currentRoute === menu.link && styles.linkActive)}>
                  {menu.name}
                  {menu.icon}
                </span>
              </span>
            ))
          }
          </div>
          <ChangeLanguage className={styles.languageHeader} />
          <div className={styles.userHeader}>
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
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default withRouter(Header);
