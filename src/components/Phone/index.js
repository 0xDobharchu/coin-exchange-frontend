/* eslint-disable react/prefer-stateless-function */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import ReactPhoneInput from 'react-phone-input-2';

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

      return  <ReactPhoneInput name={name} value={value} onBlur={onBlur} {...this.props} />;
    };
    return (<Field name={name} component={renderFieldPhone} />);
  }


}

export default connect(null, null)(CountryPhone);
