import React from 'react';
import { MyMessage } from 'src/lang/components';
import { Link, withRouter } from 'react-router-dom';
import cn from 'classnames';

import { URL } from 'src/constants';
import meIcon from 'src/assets/images/navigation/ic_me.svg';
import creditIcon from 'src/assets/images/navigation/ic_credit.svg';
// import creditIcon from 'src/assets/icons/coin/bch.svg';

class Navigation extends React.Component {
  state = {
    currentPath: '',
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.location.pathname !== prevState.currentPath) {
      return { currentPath: nextProps.location.pathname };
    }
    return null;
  }

  // eslint-disable-next-line
  shouldComponentUpdate = (nextProps, nextState) => nextState.currentPath !== this.state.currentPath;

  checkSelected = (URLS) => {
    const { currentPath } = this.state;
    return URLS.indexOf(currentPath) >= 0 ? 'selected' : '';
  }

  render() {
    console.log('navigation', this.props);
    return (
      <footer className="footer">
        <div className="main">
          {/* <li className={cn(this.checkSelected([URL.BUY_COIN_URL, URL.INDEX]))}>
            <Link to={URL.INDEX}>
              <div><img alt="creditIcon" src={creditIcon} /></div>
              <span><MyMessage id="app.navigation.ninjaCoin" /></span>
            </Link>
          </li>
          <li className={cn(this.checkSelected([URL.HANDSHAKE_ME_INDEX]))}>
            <Link to={URL.HANDSHAKE_ME_INDEX}>
              <div><img alt="meIcon" src={meIcon} /></div>
              <span><MyMessage id="app.navigation.me" /></span>
            </Link>
          </li> */}
          <div className={cn('item', this.checkSelected([URL.BUY_COIN_URL, URL.INDEX]))}>
            <Link to={URL.INDEX}>
              <img alt="creditIcon" src={creditIcon} />
              <MyMessage id="app.navigation.ninjaCoin" />
            </Link>
          </div>
          <div className={cn('item', this.checkSelected([URL.HANDSHAKE_ME_INDEX]))}>
            <Link to={URL.HANDSHAKE_ME_INDEX}>
              <img alt="meIcon" src={meIcon} />
              <MyMessage id="app.navigation.me" />
            </Link>
          </div>
        </div>
      </footer>
    );
  }
}
export default withRouter(Navigation);
