import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import logo from 'src/assets/images/logo_white.svg';
import currentUser from 'src/utils/authentication';
import cx from 'classnames';
import { menus } from '../index';
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
  
  render() {
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
          </div>
        </div>
        <div role="presentation" onClick={this.closeSideBar} className={this.getStateCss(style.overlay)} />
      </div>
    );
  }
}

export default withRouter(HeaderMobile);