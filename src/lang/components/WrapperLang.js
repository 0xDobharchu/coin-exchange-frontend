import React from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { FAIL_DEFAULT_LANGUAGE } from 'src/resources/constants/languages';

class WrapperLang extends React.PureComponent {
  render() {
    // eslint-disable-next-line
    const { children, intl } = this.props;
    const ts = (id, values = {}) => intl.formatMessage({ id }, values);
    const childType = typeof children;
    if (childType === 'function') {
      return children(ts);
    }
    return React.cloneElement(children, ts);
  }
}

const mapState = state => ({
  lang: state.langReducer.lang || FAIL_DEFAULT_LANGUAGE
});

export default compose(
  injectIntl,
  connect(mapState),
)(WrapperLang);
