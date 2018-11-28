import React, { Component } from 'react';
import cx from 'classnames';
import { Container, Col, Row } from 'react-bootstrap';
import ReviewList from 'src/components/reviewList';
import { FaPlayCircle } from 'react-icons/fa';
import PricePanel from 'src/screens/coin/components/pricePanel';
import MyMessage from 'src/lang/components/MyMessage';
import UserVerifyStatus from 'src/components/userVerifyStatus';
import animations from 'src/assets/styles/animations';
import BuyCoin from './buy';
import SellCoin from './sell';
import styles from './styles.scss';

const TABS = {
  BUY: {
    title: <MyMessage id='coin.buyTabTitle' />,
    component: <BuyCoin />
  },
  SELL: {
    title: <MyMessage id='coin.sellTabTitle' />,
    component: <SellCoin />
  }
};

class Coin extends Component {
  constructor() {
    super();
    this.state = {
      activeTab: Object.keys(TABS)[0],
    };
  }

  onSelectTab = (key) => {
    this.setState({ activeTab: key });
  }

  renderTabHeader = () => {
    const { activeTab } = this.state;
    return Object.entries(TABS).map(([key, tab]) => (
      <div
        key={key}
        className={cx(styles.tabTitle, key === activeTab ? styles.headerActive : '')}
        role='presentation'
        onClick={()=> this.onSelectTab(key)}
      >
        {tab.title}
      </div>
    ));
  }

  renderTabContent = () => {
    const { activeTab } = this.state;
    return Object.entries(TABS).map(([key, tab]) => (
      <div key={key} className={cx(styles.tabContent, key === activeTab ? cx(styles.active, animations.fadeIn) : styles.hidden)}>
        {tab.component}
      </div>
    ));
  }
  render() {
    const { activeTab } = this.state;
    return (
      <Container className={styles.container}>
        <Row className={styles.intro}>
          <h1><MyMessage id='coin.introText' /></h1>
          <h3><MyMessage id='coin.subIntroText' /><FaPlayCircle className={styles.icon} /></h3>
        </Row>
        <Row>
          <Col lg={3} className='order-2 order-lg-1'>
            <div className={cx(styles.panel, styles.panelLeft)}>
              <PricePanel />
            </div>
          </Col>
          <Col lg={6} className='order-1 order-lg-2'>
            <div className={styles.main}>
              <UserVerifyStatus />
              <div className={styles.header}>
                {this.renderTabHeader()}
              </div>
              <div className={styles.content}>
                {this.renderTabContent()}
              </div>
            </div>
          </Col>
          <Col lg={3} className='order-3'>
            <div className={cx(styles.panel, styles.panelRight)}>
              <ReviewList direction={activeTab} />
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Coin;
