import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Review from 'src/components/dump';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getReview } from 'src/screens/coin/action';
import Contact from './contact';
import Header from './header';
import PricePanel from './pricePanel';
import styles from './styles.scss';

class CoinDesktop extends Component {
  componentDidMount() {
    this.getReviewCoin();
  }

  getReviewCoin = () => {
    const { getReviewBound } = this.props;
    getReviewBound();
  }

  render() {
    const { numReview, children } = this.props;
    return (
      <div className={styles.container}>
        <div className="container">
          <Header />
          <div className={styles.body}>
            <div className={styles.leftContainer}><PricePanel /></div>
            <div className={styles.mainContainer}>
              {children}
            </div>
            <div className={styles.rightContainer}>
              <Contact />
              { numReview > 0 && <Review /> }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CoinDesktop.propTypes = {
  children: PropTypes.node.isRequired,
};

const mapStateToProps = state => ({
  numReview: state?.coinReducer?.numReview || 0,
});

const mapDispatchToProps = dispatch => ({
  getReviewBound: bindActionCreators(getReview, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CoinDesktop);
