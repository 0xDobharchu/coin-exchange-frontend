import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class LabelLang extends PureComponent {
  render() {
    // eslint-disable-next-line
    return (
      <FormattedMessage {...this.props}>
        {(...params) => {
          return params?.map((param, index) => <React.Fragment key={index}>{param}</React.Fragment>) || null;
        }}
      </FormattedMessage>
    );
  }
}

const mapState = state => ({
  lang: state.langReducer.lang || 'en'
});

export default connect(mapState, null)(LabelLang);
