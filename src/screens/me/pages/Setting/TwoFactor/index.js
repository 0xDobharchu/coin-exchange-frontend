import React from 'react';
import { connect } from 'react-redux';
import { getTwoFactorCode } from 'src/screens/auth/redux/api';
import { Row, Col } from 'react-bootstrap';
import Switch from 'rc-switch';
import QRScanModel from './QRScanModel';
import Disable2FaModel from './Disable2FaModel';
import style from './style.scss';

class TwoFactor extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isShowQR: false,
      isDisable2Factor: false,
      qrValue: ''
    };
  }

  handleOnSwitch = (isEnable) => {
    if (isEnable) {
      getTwoFactorCode().then(({ otp })=> {
        this.setState({
          qrValue: otp,
          isShowQR: true
        });
      }).catch(err => console.log('error', err));
    } else {
      this.setState({
        isDisable2Factor: true
      });
    }
  }

  modelClode = () => this.setState({ isShowQR: false });
  modelDisable2FactorClose = () => this.setState({ isDisable2Factor: false })
  render() {
    return (
      <Row className={style.personalDetail}>
        <Col md={4} className={style.leftSide}>
          <Switch checked={this.props.security_2fa} onClick={this.handleOnSwitch} />
          <label className={style.fontLeft}>Your personal information is never shown to other users</label>
        </Col>
        <QRScanModel show={this.state.isShowQR} qrValue={this.state.qrValue} onHide={this.modelClode} />
        <Disable2FaModel show={this.state.isDisable2Factor} onHide={this.modelDisable2FactorClose} />
      </Row>);
  }
}

const mapState = state => ({
  security_2fa: state.auth.profile.security_2fa
});
export default connect(mapState)(TwoFactor);