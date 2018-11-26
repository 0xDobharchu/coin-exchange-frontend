import React from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import { IoIosChatbubbles } from 'react-icons/io';
import { debounce } from 'lodash';
import LabelLang from 'src/lang/components/LabelLang';
import { getReview } from './action';
import styles from './styles.scss';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFinished: false,
      page: null,
    };

    this.autoLoadMore = debounce(:: this.autoLoadMore, 100000);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userCountry !== this.props.userCountry ||
      prevProps.direction !== this.props.direction) {
      this.getReviewCoin();
    }
  }

  getReviewCoin = () => {
    const { isFinished, page } = this.state;
    if (isFinished) {
      return;
    }

    const params = {
      country: this.props.userCountry,
      direction: this.props.direction.toLowerCase(),
      time:  new Date().getTime()
    };

    if (page) {
      params.page = page;
    }

    this.props.getReview({params}).then(this.onSuccess);

  }

  onSuccess = (res) => {
    console.log('onSuccess', res);
    if (res?.can_move === false) {
      this.setState({ isFinished: true });
    } else {
      this.setState({ page: res?.page }, this.autoLoadMore);
    }
  }

  autoLoadMore = () => {
    this.getReviewCoin();
  }

  render() {
    const { reviewList, numReview } = this.props;

    return (
      <div className={styles.reviewListContainer}>
        <span className={styles.reviewListCountComment}>
          <span className={styles.reviewListCountIcon}><IoIosChatbubbles /></span>
          <LabelLang id="review.label.comments" values={{ numReview }} />
        </span>
        <div className={styles.reviewList}>
          {
            reviewList && reviewList.map((item, index) => (
              <Row key={index} className={styles.review}>
                <div className={styles.name}>{item?.name || 'BlackBean'}</div>
                <div className={styles.content}>{item?.review}</div>
              </Row>
            ))
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  reviewList: state.reviewListReducer.reviewList,
  numReview: state.reviewListReducer.numReview,
  userCountry: state.app?.userCountry,
});

const mapDispatchToProps = dispatch => ({
  getReview: bindActionCreators(getReview, dispatch),
});

export default withRouter(injectIntl(connect(mapStateToProps, mapDispatchToProps)(ReviewList)));
