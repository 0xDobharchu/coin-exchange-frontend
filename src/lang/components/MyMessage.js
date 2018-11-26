import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class MyFormatMessage extends PureComponent {
  render() {
    // eslint-disable-next-line
    return (
      <FormattedMessage {...this.props}>
        {(text) => text}
      </FormattedMessage>
    );
  }
}

const mapState = state => ({
  lang: state.langReducer.lang || 'en'
});

export default connect(mapState, null)(MyFormatMessage);
