import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { injectIntl } from 'react-intl';
import { FAIL_DEFAULT_LANGUAGE } from 'src/resources/constants/languages';

class FieldLang extends PureComponent {
  render() {
    const {
      placeholder,
      placeholderValues,
      intl
    } = this.props;
    if (!placeholder) {
      return (<Field {...this.props} />);
    }
    const placeHolderLang = intl.formatMessage({ id: placeholder, defaultMessage: placeholder }, placeholderValues);
    // eslint-disable-next-line
    return (<Field {...this.props} placeholder={placeHolderLang}/>);
  }
}

const mapState = state => ({
  lang: state.langReducer.lang || FAIL_DEFAULT_LANGUAGE
});

export default injectIntl(connect(mapState, null)(FieldLang));
