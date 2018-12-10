import React from 'react';
import { connect } from 'react-redux';
import Loading from 'src/components/loading';
import { LabelLang } from 'src/lang/components';
import { getReferralsAction } from 'src/screens/auth/redux/action';
import { Row, Col } from 'react-bootstrap';
import style from './style.scss';

class ReferralEarning extends React.PureComponent {

  state = {
    loading: true,
  }

  componentDidMount() {
    // eslint-disable-next-line
    this.props.getReferralsAction().then(() => this.setState({ loading: false }));
  }
  render() {
    // eslint-disable-next-line
    if (this.state.loading) return (<Loading />);
    const { referrals } = this.props;
    return (
      <div className={style.container}>
        <div className={style.block1}>
          <Row className={style.table_header}>
            <Col xs={3}><LabelLang id="me.accountInfo.referralEarning.from" /></Col>
            <Col xs={3}><LabelLang id="me.accountInfo.referralEarning.type" /></Col>
            <Col xs={3}><LabelLang id="me.accountInfo.referralEarning.value" /></Col>
            <Col xs={3}><LabelLang id="me.accountInfo.referralEarning.date" /></Col>
          </Row>
          {referrals.map((e, i) => (
            <Row key={i} className={style.table_body}>
              <Col xs={3}>{e.name}</Col>
              <Col xs={3}>Gold</Col>
              <Col xs={3}>0.01 ETH</Col>
              <Col xs={3}>{new Date(e.date_joined).toLocaleString()}</Col>
            </Row>
          ))}
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  referrals: state.auth.referrals
});

const mapDispatch = { getReferralsAction };
export default connect(mapState, mapDispatch)(ReferralEarning);
