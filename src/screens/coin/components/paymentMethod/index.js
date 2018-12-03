import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'src/components/core/controls/Checkbox';
import { Container, Row, Col } from 'react-bootstrap';
import { PAYMENT_METHOD } from 'src/screens/coin/constant';
import TooltipInfo from 'src/components/tooltipInfo';
import LabelLang from 'src/lang/components/LabelLang';
import styles from './styles.scss';

// const getIntlKey = (name) => `coin.components.paymentMethod.${name}`;

// const methods = [
//   {
//     name: getIntlKey('wireTransferName'),
//     value: PAYMENT_METHOD.TRANSFER
//   },
//   {
//     name: getIntlKey('codName'),
//     value: PAYMENT_METHOD.COD,
//     info: getIntlKey('codInfo'),
//   }
// ];

class Exchange extends Component {
  constructor(props) {
    super();
    const { defaultValue } = props;
    this.state = {
      selected: defaultValue,
    };
  }

  onChange = (e) => {
    const value = e?.target?.value;
    const { onChange } = this.props;
    if (typeof onChange === 'function') {
      onChange(value);
    }
    this.setState({ selected: value });
  }

  render() {
    const { selected } = this.state;
    const { methods } = this.props;
    return (
      <Container className={styles.container}>
        <Row>
          {
            methods?.map(method => (
              <Col sm={12} md={6} key={method.value}>
                <div className={styles.item}>
                  <Checkbox
                    label={<LabelLang id={method.nameIntl} />}
                    value={method.value}
                    onChange={this.onChange}
                    checked={selected === method.value}
                  />
                  {method?.infoIntl && <TooltipInfo message={<LabelLang id={method.infoIntl} />} />}
                </div>
              </Col>
            ))
          }
        </Row>
      </Container>
    );
  }
}

Exchange.defaultProps = {
  onChange: null,
  defaultValue: PAYMENT_METHOD.TRANSFER,
  methods: []
};

Exchange.propTypes = {
  onChange: PropTypes.func,
  defaultValue: PropTypes.oneOf(Object.values(PAYMENT_METHOD)),
  methods: PropTypes.arrayOf(PropTypes.shape({
    nameIntl: PropTypes.string,
    infoIntl: PropTypes.string,
    value: PropTypes.string,
  }))
};

export default Exchange;
