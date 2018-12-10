import React from 'react';
import { URL } from 'src/resources/constants/url';
import { Row, Col } from 'react-bootstrap';
import { LabelLang } from 'src/lang/components';
import { Link } from 'react-router-dom';
import renderSubRoute from 'src/routes/renderSubRoute';
import style from './style.scss';

class SideBarNavigation extends React.PureComponent {

  // eslint-disable-next-line
  getActiveKey = (path) => this.props.location.pathname === path ? style.active : '';

  render() {
    // eslint-disable-next-line
    const { routes } = this.props;
    return (
      <div className={style.container}>
        <Row>
          <Col sm={3} className={style.sideBar}>
            <Link to={URL.ME_PROFILE} className={this.getActiveKey(URL.ME_PROFILE)}><LabelLang id="me.navigation.accountInfo" /></Link>
            <Link to={URL.ME_SETTING} className={this.getActiveKey(URL.ME_SETTING)}><LabelLang id="me.navigation.preferecens" /></Link>
            <Link to={URL.ME_ACCOUNT_LEVEL} className={this.getActiveKey(URL.ME_ACCOUNT_LEVEL)}><LabelLang id="me.navigation.accountLevel" /></Link>
            <Link to={URL.ME_HISTORY} className={this.getActiveKey(URL.ME_HISTORY)}><LabelLang id="me.navigation.history" /></Link>
            <Link to={URL.ME_BANK_INFO} className={this.getActiveKey(URL.ME_BANK_INFO)}><LabelLang id="me.navigation.bankInfo" /><span style={{ color: 'red', marginLeft: '10px' }}>●</span></Link>
            <Link to={URL.ME_REFERRAL} className={this.getActiveKey(URL.ME_REFERRAL)}><LabelLang id="me.navigation.referral" /> </Link>
          </Col>
          <Col sm={9} className={style.scrollbar}>
            {renderSubRoute(routes)}
          </Col>
        </Row>
      </div>
    );
  }
}

export default SideBarNavigation;