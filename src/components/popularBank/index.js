import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AutocompleteInput from 'src/components/autocompleteInput';
import reqErrorAlert from 'src/utils/errorHandler/reqErrorAlert';
import LabelLang from 'src/lang/components/LabelLang';
import { getBank } from './redux/action';

class PopularPlaces extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    const { getBank, userCountry: country, language } = this.props;
    getBank({ country, language }).then(this.handerData).catch(this.errorHandler);
  }

  componentDidUpdate(prevProps) {
    const { getBank, userCountry, language } = this.props;
    if (prevProps.userCountry !== userCountry || prevProps.language !== language) {
      getBank({ country: userCountry, language }).then(this.handerData).catch(this.errorHandler);
    }
  }

  errorHandler = (e) => {
    console.warn(e);
    reqErrorAlert(e, { message: <LabelLang id='coin.components.popularBanks.getBanksFailed' />});
  }

  handerData = (data = []) => {
    const rs = data.map(d => {
      const label = d.name;
      return {
        label,
        value: label
      };
    });
    this.setState({ data: rs });
  }

  render() {
    const { data } = this.state;
    const { placeholder, onChange, onBlur, onFocus, className } = this.props;
    return (
      <AutocompleteInput
        data={data}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        strict
        placeholder={placeholder}
        inputClassname={className}
      />
    );
  }
}

const mapState = state => ({
  userCountry: state?.app?.userCountry,
  language: state?.langReducer?.lang
});

PopularPlaces.defaultProps = {
  userCountry: null,
  language: null,
  onBlur: null,
  onFocus: null,
  className: '',
  placeholder: ''
};

PopularPlaces.propTypes = {
  getBank: PropTypes.func.isRequired,
  userCountry: PropTypes.string,
  language: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  className: PropTypes.string,
  placeholder: PropTypes.string,
};
export default connect(mapState, { getBank })(PopularPlaces);