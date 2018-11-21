/* eslint react/sort-comp:0 */
/* eslint camelcase: 0 */

import React from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { getReview } from 'src/screens/coin/action';
import { Row } from 'react-bootstrap';
import loadingSVG from 'src/assets/icons/coinPage/user_icon.svg';
import { debounce } from 'lodash';
import LabelLang from 'src/lang/components/LabelLang';
import styles from './styles.scss';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFinished: false,
      page: null,
    };

    this.autoLoadMore = debounce(:: this.autoLoadMore, 1000);
  }

  componentDidCatch(e) {
    console.warn(e);
  }

  componentDidMount() {
    this.getReviewCoin();
  }

  componentWillUnmount() {
  }

  getReviewCoin = () => {
    const { isFinished, page } = this.state;
    if (isFinished) {
      return;
    }

    const qs = { };
    if (page) {
      qs.page = page;
    }

    this.props.getReview({
      params: qs
    }).then(this.onSuccess);
  }

  onSuccess = (res) => {
    console.log('onSuccess', res);
    if (res?.can_move === false) {
      this.setState({ isFinished: true });
    } else {
      this.setState({ page: res?.page }, this.autoLoadMore);
    }
  }

  autoLoadMore = (e) => {
    e.preventDefault();
    this.getReviewCoin();
  }

  resetState = () => {
    const state = {
      isFinished: false,
      page: null,
    };
    this.setState(state);
  }

  render() {
    console.log('render ReviewList', this.props.reviewList);
    const { isFinished } = this.state;
    const { reviewList, numReview } = this.props;
    console.log(12312312312312, numReview);
    return (
      <div className={styles.reviewListContainer}>
        <span className={styles.reviewListCountComment}><LabelLang id="review.label.comments" values={{numReview}} /></span>
        <div className={styles.reviewList}>
          {
            reviewList && reviewList.map(item => (
              <Row key={item?.id} className={styles.review}>
                <div><img src={loadingSVG} alt="loading" width="30" /></div>
                <div className={styles.reviewContent}>
                  <div className={styles.name}>{item?.name}</div>
                  <div className={styles.content}>{item?.review}</div>
                </div>
              </Row>
            ))
          }
        </div>
        { !isFinished && <button type="button" onClick={this.autoLoadMore}><LabelLang id="review.label.loadMore" /></button>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  reviewList: state.screenCoinReducer.reviewList,
  numReview: state.screenCoinReducer.numReview,
});

const mapDispatchToProps = dispatch => ({
  getReview: bindActionCreators(getReview, dispatch),
});

export default withRouter(injectIntl(connect(mapStateToProps, mapDispatchToProps)(ReviewList)));
