import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { injectIntl } from 'react-intl';

class FieldLang extends PureComponent {
  render() {
    const {
      placeholder,
      placeholderValues,
      intl
    } = this.props;
    const placeHolderLang = intl.formatMessage({ id: placeholder, defaultMessage: placeholder }, placeholderValues);
    // eslint-disable-next-line
    return (<Field {...this.props} placeholder={placeHolderLang}/>);
  }
}

const mapState = state => ({
  lang: state.langReducer.lang || 'en'
});

export default injectIntl(connect(mapState, null)(FieldLang));
