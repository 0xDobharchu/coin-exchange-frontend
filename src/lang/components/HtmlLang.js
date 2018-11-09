import React, { PureComponent } from 'react';
import { injectIntl } from 'react-intl';

class HtmlLang extends PureComponent {
  render() {
    return <div>{this.props.intl.formatMessage({ id: 'helloWorld' })}</div>
  }
}
export default injectIntl(HtmlLang);
