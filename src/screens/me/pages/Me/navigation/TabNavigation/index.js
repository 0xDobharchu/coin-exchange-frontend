import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import AccountInfo from '../../../AccountInfo';
import MeProfile from '../../../MeProfile';
import style from './style.scss';

const CHILD_ROUTES = ['profile', 'setting', 'accountLevel'];

class TabNavigation extends React.PureComponent {
  getActiveKey = path => {
    switch(path) {
      case '/me/profile': return CHILD_ROUTES[0];
      case '/me/setting': return CHILD_ROUTES[1];
      case '/me/accountLevel': return CHILD_ROUTES[2];
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
      <div className={style.container}>
        <Tabs activeKey={activeKey} id="controlled-tab-example" onSelect={this.handleRedirect}>
          <Tab eventKey={CHILD_ROUTES[0]} title="My Profile" className={style.scrollbar}>
            <AccountInfo />
          </Tab>
          <Tab eventKey={CHILD_ROUTES[1]} title="My Setting" className={style.scrollbar}>
            My Setting
          </Tab>
          <Tab eventKey={CHILD_ROUTES[2]} title="Account Level" className={style.scrollbar}>
            <MeProfile location={location} />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default TabNavigation;