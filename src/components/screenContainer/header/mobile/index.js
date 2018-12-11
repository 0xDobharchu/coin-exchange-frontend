import React from 'react';
import { URL } from 'src/resources/constants/url';
import { Link, withRouter } from 'react-router-dom';
import logo from 'src/assets/images/logo_white.svg';
import currentUser from 'src/utils/authentication';
import cx from 'classnames';
import ChangeLanguage from 'src/components/changeLanguage';
import LabelLang from 'src/lang/components/LabelLang';
import { menus, buttons } from '../index';
import style from './styles.scss';

class HeaderMobile extends React.Component {
  state = {
    active: false,
  }

  // eslint-disable-next-line
  getStateCss = (currentStyle) => this.state.active ? cx(currentStyle, style.active) : currentStyle;

  openSideBar = () => this.setState({ active: true });

  closeSideBar = () => this.setState({ active: false });

  // eslint-disable-next-line
  checkActive = link => this.props.location.pathname === link ? style.itemActive : '';
  
  checkButtonActive = button => button.className === 'active' ? style.buttonActive : '';
  
  handleSignOut = () => {
    currentUser.removeAccessToken();
    // eslint-disable-next-line
    this.props.history.push(URL.HOME);
  }

  render() {
    console.log('buttons', buttons);
    return (
      <div className={style.container}>
        <div className={style.header}>
          {/* <button type="button" onClick={this.openSideBar}>Open sidebar</button> */}
          <div><button type="button" onClick={this.openSideBar}>=</button></div>
          <img src={logo} alt="coinbowl-logo" />
          <div />
        </div>
        <div className={this.getStateCss(style.sideBar)}>
          <div className={style.items}>
            <div className={style.itemHeader}>
              {currentUser.isLogin() ? <span>{currentUser.getCurrentUser().name}</span> : <span />}
              <div role="presentation" onClick={this.closeSideBar}><span>X</span></div>
            </div>
            {
            Object.entries(menus).map(([ key, menu ]) => (!menu.auth || menu.auth === currentUser.isLogin()) && (
              <Link to={menu.link} key={key} className={this.checkActive(menu.link)}>
                <span className={style.menuItem}>
                  {menu.name}
                  {menu.icon}
                </span>
              </Link>
            ))
            }
            {currentUser.isLogin() ? (
              <React.Fragment>
                <Link to={URL.ME} className={this.checkActive(URL.ME)}>
                  <span className={style.menuItem}><LabelLang id="user.setting" /></span>
                </Link>
                <div className={style.signout} role="presentation" onClick={this.handleSignOut}>
                  <LabelLang id="user.logout" />
                </div>
              </React.Fragment>
            ) : (
              <div className={style.buttons}>
                {
                  Object.entries(buttons).map(([ key, button ]) => (
                    <Link to={button.link} key={key} className={this.checkButtonActive(button)}>
                      <span className={style.menuItem}>{button.name}</span>
                    </Link>
                  ))
                }
              </div>)}
          </div>
          <div className={style.language}>
            <ChangeLanguage className={style.itemLang} />
          </div>
        </div>
        <div role="presentation" onClick={this.closeSideBar} className={this.getStateCss(style.overlay)} />
      </div>
    );
  }
}

export default withRouter(HeaderMobile);