/* eslint-disable react/prefer-stateless-function */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { DEFAULT_COUNTRY } from 'src/resources/constants/countries';
import Loadable from 'react-loadable';


class PhoneNumber extends PureComponent {

  constructor() {
    super();
    this.state = {
      phoneCom: null,      
    };
  }

  componentDidMount() {
    const COM = Loadable({
      loader: () => import('react-phone-input-2'),
      loading: () =>  <span>Loading...</span>
    });
    this.setState({ phoneCom: COM });    
  }

  render() {    
    const { phoneCom: PhoneCom } = this.state;  
    if (PhoneCom)
      return (
        <PhoneCom
          defaultCountry={DEFAULT_COUNTRY.toLowerCase()}
          regions='asia'
          {...this.props}
        />
      );
    return null;
  }


}

export default connect(null, null)(PhoneNumber);
