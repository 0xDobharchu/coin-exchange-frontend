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
      data: [],
      selectedId: null
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

  setDefaultValue = (value) => {
    if (!value) return;

    const { data } = this.state;
    const found = data?.find(d => d?.value === value);
    found && this.setState({ selectedId: found?.id });
  }

  errorHandler = (e) => {
    console.warn(e);
    reqErrorAlert(e, { message: <LabelLang id='coin.components.popularBanks.getBanksFailed' />});
  }

  handerData = (data = []) => {
    const { defaultValue } = this.props;
    const rs = data.map((d, index) => {
      const label = d.name;
      return {
        id: index,
        label,
        value: label
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
  onBlur: null,
  onFocus: null,
  className: '',
  placeholder: '',
  defaultValue: null,
  disabled: false
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
  disabled: PropTypes.bool,
  defaultValue: PropTypes.string,
};
export default connect(mapState, { getBank })(PopularPlaces);