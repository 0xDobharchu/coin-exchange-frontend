import React from 'react';
import ProjectDetail from 'src/components/ProjectDetail';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getFaqContent } from './redux/action';

class CoinBowlFAQ extends React.PureComponent {
  componentDidMount() {
    const params = { language: 'en' };
    this.props.getFaqContent({ params });
  }

  render() {
    const {
      faqContent
    } = this.props;

    return (
      <React.Fragment>
        <ProjectDetail type="landing" name="coin" faqContent={faqContent} />
      </React.Fragment>
    );
  }
}

const mapState = state => ({
  faqContent: state.landingReducer.faqContent
});

const mapDispatch = dispatch => ({
  getFaqContent: bindActionCreators(getFaqContent, dispatch),
});

export default connect(mapState, mapDispatch)(CoinBowlFAQ);
