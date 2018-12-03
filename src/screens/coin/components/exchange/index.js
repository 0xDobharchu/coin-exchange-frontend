import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InputGroup, Container, Row, Col, Dropdown, DropdownButton } from 'react-bootstrap';
import CurrencyInput from 'src/components/currencyInput';
import { CRYPTO_CURRENCY } from 'src/resources/constants/crypto';
import { DEFAULT_FIAT_CURRENCY, FIAT_CURRENCY } from 'src/resources/constants/fiat';
import { FaArrowsAltH } from 'react-icons/fa';
import cx from 'classnames';
import { connect } from 'react-redux';
import LabelLang from 'src/lang/components/LabelLang';
import { debounce, xor as arrayXor } from 'lodash';
import { EXCHANGE_DIRECTION, ORDER_TYPE } from 'src/screens/coin/constant';
import Loading from 'src/components/loading';
import authUtil from 'src/utils/authentication';
import reqErrorAlert from 'src/utils/errorHandler/reqErrorAlert';
import { getQuote, getQuoteReverse } from './action';
import styles from './styles.scss';

const getIntlKey = (name) => `coin.components.exchange.${name}`;

const EXCHANGE_TYPE = {
  amount: 'QUOTE',
  fiatAmount: 'QUOTE_REVERSE'
};

class Exchange extends Component {
  constructor() {
    super();
    this.state = {
      amount: 0,
      fiatAmount: 0,
      isExchanging: false,
      exchangeData: {},
      currency: null,
      fiatCurrency: null,
      currencyListRendered: null,
      fiatCurrencyListRendered: null,
      isAuth: authUtil.isLogin(),
    };

    this.getQuoteHandler = debounce(::this.getQuoteHandler, 1000);
    this.getQuoteReverseHandler = debounce(::this.getQuoteReverseHandler, 1000);
  }

  componentDidMount() {
    const { defaultCurrency, defaultFiatCurrency } = this.props;
    this.setState({
      currency: defaultCurrency,
      fiatCurrency: defaultFiatCurrency,
    });
    this.renderCurrencyList();
    this.renderFiatCurrencyList();
  }

  componentDidUpdate(prevProps, prevState) {
    const { orderType, supportedCurrency, defaultCurrency, options: { canChangeCurrency } } = this.props;
    const { currency, fiatCurrency } = this.state;
    if (prevProps?.orderType !== orderType) {
      this.getExchange();
    }
    if (prevState?.currency !== currency || prevState?.fiatCurrency !== fiatCurrency) {
      this.getExchange();
    }
    if (arrayXor(prevProps?.supportedCurrency, supportedCurrency)?.length !== 0) {
      this.renderFiatCurrencyList();
      this.onSelectFiatCurrency(supportedCurrency[0]);
    }
    if (prevProps?.defaultCurrency !== defaultCurrency && !canChangeCurrency) {
      this.onSelectCurrency(defaultCurrency);
    }
  }

  renderCurrencyList = () => {
    const rendered = Object.values(CRYPTO_CURRENCY).map(c =>(
      <Dropdown.Item key={c} onClick={() => this.onSelectCurrency(c)}>{c}</Dropdown.Item>
    ));
    this.setState({
      currencyListRendered: rendered
    });
  }

  renderFiatCurrencyList = () => {
    const { supportedCurrency } = this.props;
    const rendered = supportedCurrency.map(c =>(
      <Dropdown.Item key={c} onClick={() => this.onSelectFiatCurrency(c)}>{c}</Dropdown.Item>
    ));
    this.setState({
      fiatCurrencyListRendered: rendered
    });
  }

  onSelectCurrency = (currency) => this.setState({ currency });

  onSelectFiatCurrency = (fiatCurrency) => this.setState({ fiatCurrency });

  onChange = (field, value) => {
    const state = {};
    if (field === 'amount') {
      state.fiatAmount = 0;
      state.amount = value;
    } else if (field === 'fiatAmount'){
      state.amount = 0;
      state.fiatAmount = value;
    }
    this.setState({ ...state, exchangeType: EXCHANGE_TYPE[field], isExchanging: true }, this.getExchange);
    this.setExchangeStatus(true);
  }

  setExchangeStatus = (status = false) => {
    this.setState({ isExchanging: status });
  };

  dataCallbackHandler = () => {
    const { onChange } = this.props;
    const { currency, fiatCurrency, amount } = this.state;
    const fiatAmount = this.getFiatAmount();
    if (typeof onChange === 'function') {
      onChange({
        amount,
        fiatAmount,
        currency,
        fiatCurrency
      });
    }
  }

  getQuoteHandler = async () => {
    try {
      const { direction, getQuote, orderType } = this.props;
      const { currency, fiatCurrency, isAuth, amount } = this.state;
      if (!amount) return;
      this.setExchangeStatus(true);
      const exchangeData = await getQuote({
        amount,
        currency,
        fiat_currency: fiatCurrency,
        check: 0,
        user_check: isAuth ? 1 : 0,
        direction,
        order_type: orderType
      });
      const fiatAmount = this.getFiatAmount(exchangeData);
      this.setState({
        exchangeData,
        fiatAmount
      }, this.dataCallbackHandler);
      this.setExchangeStatus(false);
    } catch(e) {
      console.warn(e);
      reqErrorAlert(e);
      this.setExchangeStatus(false);
    }
  }

  getQuoteReverseHandler = async () => {
    try {
      const { fiatAmount } = this.state;
      const { direction, orderType, getQuoteReverse } = this.props;
      const { currency, fiatCurrency, isAuth } = this.state;
      if (!fiatAmount) return;
      this.setExchangeStatus(true);
      const exchangeData = await getQuoteReverse({
        fiat_amount: fiatAmount,
        currency,
        fiat_currency: fiatCurrency,
        check: 0,
        user_check: isAuth ? 1 : 0,
        direction,
        order_type: orderType
      });
      this.setState({
        exchangeData,
        amount: exchangeData?.amount || 0
      }, this.dataCallbackHandler);
      this.setExchangeStatus(false);
    } catch(e) {
      console.warn(e);
      reqErrorAlert(e);
      this.setExchangeStatus(false);
    }
  }

  getExchange = () => {
    const { exchangeType } = this.state;
    if (exchangeType === EXCHANGE_TYPE.amount) {
      this.getQuoteHandler();
    } else if (exchangeType === EXCHANGE_TYPE.fiatAmount) {
      this.getQuoteReverseHandler();
    }
  }

  // eslint-disable-next-line
  getFiatAmount = (exchangeData = this.state.exchangeData) => {
    const { orderType } = this.props;
    const { exchangeType } = this.state;
    if (exchangeType === EXCHANGE_TYPE.amount && orderType === ORDER_TYPE.cod) {
      return exchangeData.fiatLocalAmountCod || 0;
    }
    return exchangeData.fiatLocalAmount || 0;
  }

  render() {
    const { amount, fiatAmount, isExchanging } = this.state;
    const { markRequired, onFocus, onBlur, options, direction } = this.props;
    const { currency, fiatCurrency, currencyListRendered, fiatCurrencyListRendered } = this.state;
    return (
      <Container fluid className={styles.container}>
        <Row noGutters>
          <Col sm={5}>
            <InputGroup>
              <CurrencyInput
                onFocus={() => onFocus()}
                label={<LabelLang id={getIntlKey('amountLabel')} values={{ direction }} />}
                placeholder="0.0"
                value={amount}
                truncateLabel
                onBlur={() => onBlur()}
                containerClassname={styles.inputWrapper}
                className={markRequired && !amount ? 'border-danger' : ''}
                onChange={this.onChange.bind(this, 'amount')}
                currency={currency}
              />
              <InputGroup.Prepend className={styles.prepend}>
                <DropdownButton
                  disabled={!options?.canChangeCurrency}
                  className={styles.dropdown}
                  title={currency || <LabelLang id={getIntlKey('currency')} />}
                >
                  {currencyListRendered}
                </DropdownButton>
              </InputGroup.Prepend>
            </InputGroup>
          </Col>
          <Col sm={2}>
            <div className={cx(styles.exchangeIcon)}>
              {
                isExchanging ? <Loading color='green' className={styles.loadingIcon} /> : <FaArrowsAltH className={styles.arrowIcon} />
              }
            </div>
          </Col>
          <Col sm={5}>
            <InputGroup>
              <CurrencyInput
                label='&nbsp;'
                placeholder="0.0"
                value={fiatAmount}
                truncateLabel
                onFocus={() => onFocus()}
                onBlur={() => onBlur()}
                containerClassname={styles.inputWrapper}
                className={markRequired && !fiatAmount ? 'border-danger' : ''}
                onChange={this.onChange.bind(this, 'fiatAmount')}
                currency={fiatCurrency}
              />
              <InputGroup.Prepend className={styles.prepend}>
                <DropdownButton
                  disabled={!options?.canChangeFiatCurrency}
                  className={styles.dropdown}
                  title={fiatCurrency || <LabelLang id={getIntlKey('currency')} />}
                >
                  {fiatCurrencyListRendered}
                </DropdownButton>
              </InputGroup.Prepend>
            </InputGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapDispatch = { getQuote, getQuoteReverse };

Exchange.defaultProps = {
  defaultCurrency: CRYPTO_CURRENCY.ETH,
  defaultFiatCurrency: DEFAULT_FIAT_CURRENCY,
  direction: EXCHANGE_DIRECTION.buy,
  orderType: ORDER_TYPE.bank,
  markRequired: false,
  onBlur: null,
  onFocus: null,
  onChange: null,
  options: {
    canChangeCurrency: true,
    canChangeFiatCurrency: true,
  }
};

Exchange.propTypes = {
  defaultCurrency: PropTypes.oneOf(Object.values(CRYPTO_CURRENCY)),
  defaultFiatCurrency: PropTypes.oneOf(Object.values(FIAT_CURRENCY)),
  direction: PropTypes.oneOf(Object.values(EXCHANGE_DIRECTION)),
  orderType: PropTypes.oneOf(Object.values(ORDER_TYPE)),
  getQuote: PropTypes.func.isRequired,
  getQuoteReverse: PropTypes.func.isRequired,
  markRequired: PropTypes.bool,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  supportedCurrency: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  options: PropTypes.shape({
    canChangeCurrency: PropTypes.bool,
    canChangeFiatCurrency: PropTypes.bool,
  })
};

const mapState = state => ({
  supportedCurrency: state?.app?.supportedCurrency?.length !== 0 ? state.app.supportedCurrency : [DEFAULT_FIAT_CURRENCY],
});

export default connect(mapState, mapDispatch)(Exchange);
