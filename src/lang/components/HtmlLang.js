import React, {PureComponent} from 'react';
import {FormattedHTMLMessage, injectIntl} from 'react-intl';

class HtmlLang extends PureComponent {
  render() {
    // eslint-disable-next-line
    return (<FormattedHTMLMessage {...this.props} />);
  }
}

export default injectIntl(HtmlLang);
