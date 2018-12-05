import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AutocompleteInput from 'src/components/autocompleteInput';
import reqErrorAlert from 'src/utils/errorHandler/reqErrorAlert';
import LabelLang from 'src/lang/components/LabelLang';
import { getPlace } from './redux/action';

class PopularPlaces extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    const { getPlace, userCountry: country, language } = this.props;
    getPlace({ country, language }).then(this.handerData).catch(this.errorHandler);
  }

  componentDidUpdate(prevProps) {
    const { getPlace, userCountry, language } = this.props;
    if (prevProps.userCountry !== userCountry || prevProps.language !== language) {
      getPlace({ country: userCountry, language }).then(this.handerData).catch(this.errorHandler);
    }
  }

  errorHandler = (e) => {
    console.warn(e);
    reqErrorAlert(e, { message: <LabelLang id='coin.components.popularPlace.getPlacesFailed' />});
  }

  handerData = (data = []) => {
    const rs = data.map(d => {
      const label = `${d.name} (${d.address})`;
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
  className: '',
  onBlur: null,
  onFocus: null,
  placeholder: ''
};

PopularPlaces.propTypes = {
  getPlace: PropTypes.func.isRequired,
  userCountry: PropTypes.string,
  language: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
};
export default connect(mapState, { getPlace })(PopularPlaces);