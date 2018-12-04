/* eslint-disable react/prefer-stateless-function */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
// import ReactPhoneInput from 'react-phone-input-2';
import PhoneNumber from 'src/components/core/controls/phoneNumber';

class CountryPhone extends PureComponent {
  render() {
    const {
      name
    } = this.props;

    const renderFieldPhone =  ({ input }) => {
      const {
        name,
        value,
        onBlur,
      } = input;

      return  <PhoneNumber name={name} value={value} onBlur={onBlur} {...this.props} />;
    };
    return (<Field name={name} component={renderFieldPhone} />);
  }


}

export default connect(null, null)(CountryPhone);
