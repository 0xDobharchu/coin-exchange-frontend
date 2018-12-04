import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { WrapperLang } from 'src/lang/components';
import AccountInfo from '../../../AccountInfo';
import Setting from '../../../Setting';
import MeProfile from '../../../MeProfile';
import History from '../../../History';
import BankInfo from '../../../BankInfo';
import style from './style.scss';

const CHILD_ROUTES = ['profile', 'setting', 'accountLevel', 'history', 'bankInfo'];

class TabNavigation extends React.PureComponent {
  getActiveKey = path => {
    switch(path) {
      case '/me/profile': return CHILD_ROUTES[0];
      case '/me/setting': return CHILD_ROUTES[1];
      case '/me/accountLevel': return CHILD_ROUTES[2];
      case '/me/history': return CHILD_ROUTES[3];
      case '/me/bankInfo': return CHILD_ROUTES[4];
      default: return CHILD_ROUTES[0];
    }
  }
  handleRedirect = (key) => {
    // eslint-disable-next-line
    const { history } = this.props;
    const selectedKey = CHILD_ROUTES.find(e => e === key);
    if (!selectedKey) {
      history.push('/me/notfound');
      return;
    }
    history.push('/me/' + selectedKey);
  }

  render() {
    // eslint-disable-next-line
    const { location } = this.props;
    const activeKey = this.getActiveKey(location.pathname);
    return (
      <WrapperLang>
        {ts => (
          <div className={style.container}>
            <Tabs activeKey={activeKey} id="controlled-tab-example" onSelect={this.handleRedirect}>
              <Tab eventKey={CHILD_ROUTES[0]} title={ts('me.navigation.accountInfo')} className={style.scrollbar}>
                <AccountInfo />
              </Tab>
              <Tab eventKey={CHILD_ROUTES[1]} title={ts('me.navigation.setting')} className={style.scrollbar}>
                <Setting />
              </Tab>
              <Tab eventKey={CHILD_ROUTES[2]} title={ts('me.navigation.accountLevel')} className={style.scrollbar}>
                <MeProfile location={location} />
              </Tab>
              <Tab eventKey={CHILD_ROUTES[3]} title={ts('me.navigation.history')} className={style.scrollbar}>
                <History location={location} />
              </Tab>
              <Tab eventKey={CHILD_ROUTES[4]} title={ts('me.navigation.bankInfo')} className={style.scrollbar}>
                <BankInfo />
              </Tab>
            </Tabs>
          </div>)
        }
      </WrapperLang>
    );
  }
}

export default TabNavigation;