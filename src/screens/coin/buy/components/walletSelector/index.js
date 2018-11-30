import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaQrcode } from 'react-icons/fa';
import { InputGroup, DropdownButton, Dropdown, FormControl } from 'react-bootstrap';
import { showQrCode } from 'src/components/barcodeScanner';
import { injectIntl } from 'react-intl';
import { CRYPTO_CURRENCY } from 'src/resources/constants/crypto';
import { MasterWallet } from 'src/services/Wallets/MasterWallet';
import cx from 'classnames';
import styles from './styles.scss';

const getIntlKey = (name) => `coin.components.walletSelector.${name}`;

class WalletSelector extends Component {
  constructor() {
    super();
    this.state = {
      invalidAddress: false,
      address: '',
      currencyListRendered: null,
      currency: CRYPTO_CURRENCY.ETH,
    };

    this.addressInputRef = React.createRef();
  }

  componentDidMount() {
    this.setState({
      currencyListRendered: this.renderCurrencyList()
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { currency, address, invalidAddress } = this.state;
    const { onChange } = this.props;
    if (prevState?.currency !== currency || prevState.address !== address) {
      if (typeof onChange === 'function') {
        onChange({ address, currency, invalidAddress });
      }
    }
  }

  onChangeAddress = (address) => {
    const state = { address };
    const detectCurrency = MasterWallet.getCoinSymbolFromAddress(address);
    if (detectCurrency && detectCurrency?.symbol && CRYPTO_CURRENCY[detectCurrency?.symbol]) {
      state.currency = detectCurrency.symbol;
      state.invalidAddress = false;
    } else {
      state.invalidAddress = true;
    }
    this.setState({ ...state });
  }

  onSelectCurrency = (currency) => {
    this.setState({ currency, address: '' });
  }

  renderCurrencyList = () => {
    return Object.values(CRYPTO_CURRENCY).map(c =>(
      <Dropdown.Item key={c} onClick={() => this.onSelectCurrency(c)}>{c}</Dropdown.Item>
    ));
  }

  render() {
    const { onFocus, onBlur, markRequired, intl: { formatMessage } } = this.props;
    const { address, currencyListRendered, currency } = this.state;
    const className = `${styles.container} ${markRequired ? 'border-danger' : ''}`;
    return (
      <div className={className}>
        <InputGroup>
          <FormControl
            placeholder={formatMessage({ id: getIntlKey('qrScannerText') })}
            className={styles.input}
            value={address}
            onChange={(e) => this.onChangeAddress(e?.target?.value)}
            onBlur={() => onBlur()}
            onFocus={() => onFocus()}
            type="text"
            name='wallet'
            autoComplete='off'
            ref={this.addressInputRef}
          />
          <InputGroup.Prepend>
            <FaQrcode
              className={cx(styles.icon, 'common-clickable')}
              size={20}
              onClick={() => {
                this.addressInputRef?.current?.focus();
                showQrCode({
                  onData: this.onChangeAddress,
                });
              }}
            />
            <DropdownButton
              className={styles.dropdown}
              // as={InputGroup.Prepend}
              title={currency || formatMessage({ id: getIntlKey('currency') })}
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
export default injectIntl(WalletSelector);
