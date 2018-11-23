import React, { Component } from 'react';
import cx from 'classnames';
import { Container, Col, Row } from 'react-bootstrap';
import ReviewList from 'src/components/reviewList';
import CreateReview from 'src/components/createReview';
import BuyCoin from './buy';
import SellCoin from './sell';
import styles from './styles.scss';
import PricePanel from '@/screens/coin/desktopLayout/pricePanel';

const TABS = {
  BUY: {
    title: 'BUY COIN',
    component: <BuyCoin />
  },
  SELL: {
    title: 'SELL COIN',
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
      <div key={key} className={cx(styles.tabContent, key === activeTab ? styles.active : styles.hidden)}>
        {tab.component}
      </div>
    ));
  }
  render() {
    const { activeTab } = this.state;
    return (
      <Container className={styles.container}>
        <Row>
          <Col lg={3}>
            <div className={styles.panelLeft}>
              <PricePanel />
            </div>
          </Col>
          <Col lg={6}>
            <div className={styles.main}>
              <div className={styles.header}>
                {this.renderTabHeader()}
              </div>
              <div className={styles.content}>
                {this.renderTabContent()}
              </div>
            </div>
          </Col>
          <Col lg={3}>
            <div className={styles.panelRight}>
              <ReviewList direction={activeTab} />
              <CreateReview order="47" />
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Coin;
