import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

class HtmlLang extends PureComponent {
  render() {
    const { intl } = this.props;
    return (<div>{intl.formatMessage({ id: 'helloWorld' })}</div>);
  }
}

HtmlLang.defaultProps = {
  intl: null,
};

HtmlLang.propTypes = {
  intl: PropTypes.func,
};
export default injectIntl(HtmlLang);
