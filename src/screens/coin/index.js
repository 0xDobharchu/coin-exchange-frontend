import React, { Component } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Container, Col, Row } from 'react-bootstrap';
import ReviewList from 'src/components/reviewList';
import PricePanel from 'src/screens/coin/components/pricePanel';
import LabelLang from 'src/lang/components/LabelLang';
import UserVerifyStatus from 'src/components/userVerifyStatus';
import animations from 'src/assets/styles/animations';
import { connect } from 'react-redux';
import BuyCoin from './buy';
import SellCoin from './sell';
import styles from './styles.scss';

const TAB_ID = {
  BUY: 'BUY',
  SELL: 'SELL'
};
const TABS = {
  [TAB_ID.BUY]: {
    title: <LabelLang id='coin.buyTabTitle' />,
    component: <BuyCoin />
  },
  [TAB_ID.SELL]: {
    title: <LabelLang id='coin.sellTabTitle' />,
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

  componentDidMount() {
    const { sellPendingOrder, buyPendingOrder } = this.props;
    let activeTab = TAB_ID.BUY;
    if (sellPendingOrder) {
      activeTab = TAB_ID.SELL;
    }
    if (buyPendingOrder) {
      activeTab = TAB_ID.BUY;
    }

    this.setState({ activeTab });
  }

  onSelectTab = (key) => {
    this.setState({ activeTab: key });
  }

  renderTabHeader = () => {
    const { activeTab } = this.state;
    return Object.entries(TABS).map(([key, tab]) => (
      <div
        key={key}
        className={cx(styles.tabTitle, key === activeTab ? key === 'BUY' ? styles.headerActiveBuy : styles.headerActiveSell : '')}
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
          <h1><LabelLang id='coin.introText' /></h1>
          {/* <h3><Link to={URL.HOW_IT_WORKS}><LabelLang id='coin.subIntroText' /><FaPlayCircle className={styles.icon} /></Link></h3> */}
        </Row>
        <Row>
          <Col lg={3} className='order-2 order-lg-1'>
            <div className={cx(styles.panel, styles.panelLeft)}>
              <PricePanel />
            </div>
          </Col>
          <Col lg={6} className='order-1 order-lg-2' style={{ zIndex: 1 }}>
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
          <Col lg={3} className='order-3 order-lg-3'>
            <div className={cx(styles.panel, styles.panelRight)}>
              <ReviewList direction={activeTab} />
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapState = state => ({
  sellPendingOrder: state.sellCoinReducer.pendingOrder,
  buyPendingOrder: state.buyCoinReducer.pendingOrder,
});

Coin.defaultProps = {
  sellPendingOrder: null,
  buyPendingOrder: null,
};

Coin.propTypes = {
  sellPendingOrder: PropTypes.object,
  buyPendingOrder: PropTypes.object,
};
export default connect(mapState)(Coin);
