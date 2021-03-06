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
      data: [],
      selectedId: null
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

  setDefaultValue = (value) => {
    if (!value) return;

    const { name, address } = value;
    const { data } = this.state;
    const found = data?.find(d => d?.value?.name === name && d?.value?.address === address);
    found && this.setState({ selectedId: found?.id });
  }

  errorHandler = (e) => {
    console.warn(e);
    reqErrorAlert(e, { message: <LabelLang id='coin.components.popularPlace.getPlacesFailed' />});
  }

  handerData = (data = []) => {
    const { defaultValue } = this.props;
    const rs = data.map((d, index) => {
      const label = `${d.name} (${d.address})`;
      return {
        id: index,
        label,
        value: {
          name: d.name,
          address: d.address
        }
      };
    });
    this.setState({ data: rs }, () => { this.setDefaultValue(defaultValue); });
  }

  render() {
    const { data, selectedId } = this.state;
    const { placeholder, onChange, onBlur, onFocus, className, disabled } = this.props;
    return (
      <AutocompleteInput
        data={data}
        selectedId={selectedId}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        strict
        placeholder={placeholder}
        inputClassname={className}
        disabled={disabled}
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
  placeholder: '',
  defaultValue: null,
  disabled: false,
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
  disabled: PropTypes.bool,
  defaultValue: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
  })
};
export default connect(mapState, { getPlace })(PopularPlaces);