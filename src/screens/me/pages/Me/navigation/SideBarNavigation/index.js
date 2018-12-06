import React from 'react';
import { Tab, Row, Nav, Col } from 'react-bootstrap';
import { LabelLang } from 'src/lang/components';
import AccountInfo from '../../../AccountInfo';
import Setting from '../../../Setting';
import MeProfile from '../../../MeProfile';
import History from '../../../History';
import BankInfo from '../../../BankInfo';
import Referral from '../../../Referral';
import style from './style.scss';

const CHILD_ROUTES = ['profile', 'setting', 'accountLevel', 'history', 'bankInfo', 'referral'];

class SideBarNavigation extends React.PureComponent {
  getActiveKey = path => {
    switch(path) {
      case '/me/profile': return CHILD_ROUTES[0];
      case '/me/setting': return CHILD_ROUTES[1];
      case '/me/accountLevel': return CHILD_ROUTES[2];
      case '/me/history': return CHILD_ROUTES[3];
      case '/me/bankInfo': return CHILD_ROUTES[4];
      case '/me/referral': return CHILD_ROUTES[5];
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
        <Tab.Container activeKey={activeKey} id="controlled-tab-example" onSelect={this.handleRedirect}>
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey={CHILD_ROUTES[0]}><LabelLang id="me.navigation.accountInfo" /></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey={CHILD_ROUTES[1]}><LabelLang id="me.navigation.setting" /></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey={CHILD_ROUTES[2]}><LabelLang id="me.navigation.accountLevel" /></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey={CHILD_ROUTES[3]}><LabelLang id="me.navigation.history" /></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey={CHILD_ROUTES[4]}><LabelLang id="me.navigation.bankInfo" /><span style={{ color: 'red', marginLeft: '10px' }}>*</span></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey={CHILD_ROUTES[5]}><LabelLang id="me.navigation.referral" /></Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey={CHILD_ROUTES[0]} className={style.scrollbar}>
                  <AccountInfo />
                </Tab.Pane>
                <Tab.Pane eventKey={CHILD_ROUTES[1]} className={style.scrollbar}>
                  <Setting />
                </Tab.Pane>
                <Tab.Pane eventKey={CHILD_ROUTES[2]} className={style.scrollbar}>
                  <MeProfile location={location} />
                </Tab.Pane>
                <Tab.Pane eventKey={CHILD_ROUTES[3]} className={style.scrollbar}>
                  <History />
                </Tab.Pane>
                <Tab.Pane eventKey={CHILD_ROUTES[4]} className={style.scrollbar}>
                  <BankInfo />
                </Tab.Pane>
                <Tab.Pane eventKey={CHILD_ROUTES[5]} className={style.scrollbar}>
                  <Referral />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    );
  }
}

export default SideBarNavigation;