import React from 'react';
import { connect } from 'react-redux';
import Loading from 'src/components/loading';
import { LabelLang } from 'src/lang/components';
import { getRefEarningReferralAction } from 'src/screens/auth/redux/action';
import { Row, Col } from 'react-bootstrap';
import style from './style.scss';

class ReferralEarningReferral extends React.PureComponent {

  state = {
    loading: true,
  }

  componentDidMount() {
    // eslint-disable-next-line
    this.props.getRefEarningReferralAction().then(() => this.setState({ loading: false }));
  }
  render() {
    // eslint-disable-next-line
    if (this.state.loading) return (<Loading />);
    // eslint-disable-next-line
    const { referralsEarningReferral : { results }  } = this.props;
    return (
      <div className={style.container}>
        <div className={style.title}>Referral</div>
        <div className={style.block1}>
          <Row className={style.table_header}>
            <Col xs={4}><LabelLang id="me.accountInfo.referralEarning.from" /></Col>
            {/* <Col xs={4}><LabelLang id="me.accountInfo.referralEarning.type" /></Col> */}
            <Col xs={4}><LabelLang id="me.accountInfo.referralEarning.value" /></Col>
            <Col xs={4}><LabelLang id="me.accountInfo.referralEarning.date" /></Col>
          </Row>
          {results.map((e, i) => (
            <Row key={i} className={style.table_body}>
              <Col xs={4}>{e.user}</Col>
              <Col xs={4}>{`${Number(e.amount).toFixed(2)} ${e.currency}`}</Col>
              <Col xs={4}>{new Date(e.updated_at).toLocaleString()}</Col>
            </Row>
          ))}
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  referralsEarningReferral: state.auth.referralsEarningReferral
});

const mapDispatch = { getRefEarningReferralAction };
export default connect(mapState, mapDispatch)(ReferralEarningReferral);
