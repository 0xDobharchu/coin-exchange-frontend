import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { FAIL_DEFAULT_LANGUAGE } from 'src/resources/constants/languages';

class MyFormatMessage extends PureComponent {
  render() {
    // eslint-disable-next-line
    return (<FormattedMessage {...this.props} />);
  }
}

const mapState = state => ({
  lang: state.langReducer.lang || FAIL_DEFAULT_LANGUAGE
});

export default connect(mapState, null)(MyFormatMessage);
