import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from 'src/components/core/controls/input';
import { CRYPTO_CURRENCY } from 'src/resources/constants/crypto';
import { DEFAULT_FIAT_CURRENCY } from 'src/resources/constants/fiat';

const CURRENCY_TYPE = {
  FIAT: 'FIAT',
  CRYPTO: 'CRYPTO'
};

const DEFAULT_VALUE = '';

const CONFIG = {
  MAX_INT_DIGIT: 9,
  MAX_FRAC_DIGIT_FIAT: 2,
  MAX_FRAC_DIGIT_CRYPTO: 6,
};

const detectCurrencyType = (currency) => {
  const type = CRYPTO_CURRENCY[currency] ? CURRENCY_TYPE.CRYPTO : CURRENCY_TYPE.FIAT;
  return type;
};

const intlNumberFormat = (value, options) => {
  const frame = /(?<int>^[\d]+)(?<dot>[.])?(?<frac>[\d]+)?/.exec(value);
  const int = frame?.groups.int || 0;
  const dot = frame?.groups.dot || '';
  const frac = frame?.groups.frac?.substr(0, options?.maximumFractionDigits || 2) || '';
  if (Number.parseFloat(value) > 1000) {
    const formatedValue = new Intl.NumberFormat('en-US', options).format(int);
    if (formatedValue === String(NaN)) {
      return DEFAULT_VALUE;
    }
    return `${formatedValue}${dot}${frac}`;
  }
  return `${int}${dot}${frac}`;
};

const formatCryptoCurrency = (value) => {
  return intlNumberFormat(value, { style: 'decimal', maximumFractionDigits: CONFIG.MAX_FRAC_DIGIT_CRYPTO });
};

const formatFiatCurrency = (value) => {
  return intlNumberFormat(value, { style: 'decimal', maximumFractionDigits: CONFIG.MAX_FRAC_DIGIT_FIAT });
};

const formatValue = (value, currency, currencyType) => {
  let maskValue = DEFAULT_VALUE;
  if (currencyType === CURRENCY_TYPE.CRYPTO) {
    maskValue = formatCryptoCurrency(value);
  } else {
    maskValue = formatFiatCurrency(value, currency);
  }
  return {
    maskValue,
    value: Number.parseFloat(parseRawValue(maskValue).replace(/,/g, '')) || 0
  };
};

const parseRawValue = (value = '') => {
  return value.replace(/[^.\d]/g, '') || '';
};


class CurrencyInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      maskValue: 0,
      currencyType: CURRENCY_TYPE.FIAT,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const state = { ...prevState };
    if (nextProps.currency !== prevState.currency) {
      state.currency = nextProps.currency;
      state.currencyType = detectCurrencyType(nextProps.currency);
    }
    return state;
  }

  componentDidMount() {
    const { value } = this.props;
    this.format(value);
  }

  componentDidUpdate(prevProps) {
    const { value } = this.props;
    if (prevProps.value !== value) {
      this.format(value);
    }
  }

  format = (value = '', isChange = false) => {
    const { value: oldValue, currency, currencyType } = this.state;
    value = String(value).replace(/[^.\d]/g, '') || '';
    if (String(oldValue).includes('.') && value[value.length -1] === '.') {
      value = value.slice(0, -1);
    }
    if (String(Number.parseInt(value)).length > CONFIG.MAX_INT_DIGIT) {
      return;
    }

    const formated = formatValue(parseRawValue(value), currency, currencyType);
    this.setState({
      maskValue: formated.maskValue,
      value: formated.value
    }, () => {
      const { value } = this.state;
      if (oldValue !== value && isChange) {
        const { onChange } = this.props;
        if (typeof onChange === 'function') {
          onChange(value);
        }
      }
    });
  }

  onChange = (e) => {
    let value = e?.target?.value;
    this.format(value, true);
  }

  render() {
    const { maskValue } = this.state;
    const { currency, onChange, value, ...inputProps } = this.props;
    
    return (
      <Input
        lang="en" 
        onChange={this.onChange}
        value={maskValue}
        type="tel"
        min={0}
        {...inputProps}
      />
    );
  }
}

CurrencyInput.defaultProps = {
  currency: DEFAULT_FIAT_CURRENCY
};

CurrencyInput.propTypes = {
  // eslint-disable-next-line 
  currency: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
};
export default CurrencyInput;