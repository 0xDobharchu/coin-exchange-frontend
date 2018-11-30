/* eslint-disable react/prefer-stateless-function */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { FieldLang } from 'src/lang/components/index';
import ReactPhoneInput from 'react-phone-input-2';

class CountryPhone extends PureComponent {
  render() {
    const {
      name
    } = this.props;
    const renderFieldPhone = ({ input }) => (
      <ReactPhoneInput {...input} {...this.props} />
    );

    return (<FieldLang name={name} component={renderFieldPhone} />);
  }


}

export default injectIntl(connect(null, null)(CountryPhone));
