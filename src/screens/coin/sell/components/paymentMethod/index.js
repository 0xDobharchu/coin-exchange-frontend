import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'src/components/core/controls/Checkbox';
import { Container, Row, Col } from 'react-bootstrap';
import { PAYMENT_METHOD } from 'src/screens/coin/constant';
import TooltipInfo from 'src/components/tooltipInfo';
import styles from './styles.scss';

const methods = [
  {
    name: 'Wire transfer',
    value: PAYMENT_METHOD.TRANSFER
  },
  {
    name: 'Cash on Delivery',
    value: PAYMENT_METHOD.COD,
    info: 'State your time and place for meeting up and we will exchange in person.'
  }
];

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
    return (
      <Container className={styles.container}>
        <Row>
          {
            methods.map(method => (
              <Col sm={12} md={6} key={method.value}>
                <div className={styles.item}>
                  <Checkbox
                    label={method.name}
                    value={method.value}
                    onChange={this.onChange}
                    checked={selected === method.value}
                  />
                  {method?.info && <TooltipInfo message={method?.info} />}
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
};

Exchange.propTypes = {
  onChange: PropTypes.func,
  defaultValue: PropTypes.oneOf(Object.values(PAYMENT_METHOD)),
};

export default Exchange;