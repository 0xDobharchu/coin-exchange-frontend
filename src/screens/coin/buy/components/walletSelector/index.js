import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaQrcode } from 'react-icons/fa';
import { InputGroup, DropdownButton, Dropdown, FormControl } from 'react-bootstrap';
import { showQrCode } from 'src/components/barcodeScanner';
import { CRYPTO_CURRENCY } from 'src/resources/constants/crypto';
import cx from 'classnames';
import styles from './styles.scss';

class WalletSelector extends Component {
  constructor() {
    super();
    this.state = {
      address: '',
      currencyListRendered: null,
      currency: CRYPTO_CURRENCY.ETH,
    };
  }

  componentDidMount() {
    this.setState({
      currencyListRendered: this.renderCurrencyList()
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { currency, address } = this.state;
    const { onChange } = this.props;
    if (prevState?.currency !== currency || prevState.address !== address) {
      if (typeof onChange === 'function') {
        onChange({ address, currency });
      }
    }
  }

  onChangeAddress = (address) => {
    this.setState({ address });
  }

  onSelectCurrency = (currency) => {
    this.setState({ currency });
  }

  renderCurrencyList = () => {
    return Object.values(CRYPTO_CURRENCY).map(c =>(
      <Dropdown.Item key={c} onClick={() => this.onSelectCurrency(c)}>{c}</Dropdown.Item>
    ));
  }

  render() {
    const { onFocus, onBlur, markRequired } = this.props;
    const { address, currencyListRendered, currency } = this.state;
    const className = `${styles.container} ${markRequired ? 'border-danger' : ''}`;
    return (
      <div className={className}>
        <InputGroup>
          <FormControl
            placeholder='Scan QR code or copy wallet address'
            className={styles.input}
            value={address}
            onChange={(e) => this.onChangeAddress(e?.target?.value)}
            onBlur={() => onBlur()}
            onFocus={() => onFocus()}
          />
          <InputGroup.Prepend>
            <FaQrcode
              className={cx(styles.icon, 'common-clickable')}
              size={20}
              onClick={() => {
                showQrCode({
                  onData: this.onChangeAddress,
                });
              }}
            />
            <DropdownButton
              className={styles.dropdown}
              // as={InputGroup.Prepend}
              title={currency || 'Currency'}
            >
              {currencyListRendered}
            </DropdownButton>
          </InputGroup.Prepend>
          
        </InputGroup>
        
      </div>
    );
  }
}

WalletSelector.defaultProps = {
  onChange: null,
  onBlur: null,
  onFocus: null,
  markRequired: false
};

WalletSelector.propTypes = {
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  markRequired: PropTypes.bool,
};
export default WalletSelector;
