import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AutocompleteInput from 'src/components/autocompleteInput';
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
    getPlace({ country, language }).then(this.handerData).catch(console.error);
  }

  componentDidUpdate(prevProps) {
    const { getPlace, userCountry, language } = this.props;
    if (prevProps.userCountry !== userCountry || prevProps.language !== language) {
      getPlace({ country: userCountry, language }).then(this.handerData).catch(console.error);
    }
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
  className: ''
};

PopularPlaces.propTypes = {
  getPlace: PropTypes.func.isRequired,
  userCountry: PropTypes.string,
  language: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};
export default connect(mapState, { getPlace })(PopularPlaces);