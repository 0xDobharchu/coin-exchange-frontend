import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { FAIL_DEFAULT_LANGUAGE } from 'src/resources/constants/languages';

class LabelLang extends PureComponent {
  render() {
    const { id } = this.props;

    // if there is an valid DOM, just render it
    if (typeof id !== 'string' && React.isValidElement(id)) {
      return id;
    } else {
      return (
        <FormattedMessage {...this.props}>
          {(...params) => {
            return params?.map((param, index) => <React.Fragment key={index}>{param}</React.Fragment>) || null;
          }}
        </FormattedMessage>
      );
    }
  }
}

const mapState = state => ({
  lang: state.langReducer.lang || FAIL_DEFAULT_LANGUAGE
});

export default connect(mapState, null)(LabelLang);
