import React from 'react';
import ProjectDetail from 'src/components/projectDetail';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getFaqContent } from './redux/action';

class CoinBowlFAQ extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      locale: this.props.locale,
    };
  }

  componentDidMount() {
    const { locale } = this.props;
    const params = { language: locale };
    this.props.getFaqContent({ params });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (JSON.stringify(nextProps.locale) !== JSON.stringify(prevState.locale)) {
      const params = { language: nextProps.locale };
      nextProps.getFaqContent({ params });
      return { locale: nextProps.locale };
    }

    return null;
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
  faqContent: state.landingReducer.faqContent,
  locale: state?.app.locale || 'en',
});

const mapDispatch = dispatch => ({
  getFaqContent: bindActionCreators(getFaqContent, dispatch),
});

export default connect(mapState, mapDispatch)(CoinBowlFAQ);
