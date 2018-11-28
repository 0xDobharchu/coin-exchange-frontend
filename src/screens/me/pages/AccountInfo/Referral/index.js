import React from 'react';
import { connect } from 'react-redux';
import Loading from 'src/components/loading';
import { MyMessage } from 'src/lang/components';
import { getTransactionsAction } from 'src/screens/auth/redux/action';
import { Row, Col } from 'react-bootstrap';
import style from './style.scss';

class Referral extends React.PureComponent {

  state = {
    loading: true,
  }

  componentDidMount() {
    // eslint-disable-next-line
    this.props.getTransactionsAction().then(() => this.setState({ loading: false }));
  }
  render() {
    // eslint-disable-next-line
    if (this.state.loading) return (<Loading />);
    const { history: { transactions } } = this.props;
    return (
      <div className={style.container}>
        <div className={style.block1}>
          <Row className={style.table_header}>
            <Col xs={4}><MyMessage id="me.accountInfo.referral.name" /></Col>
            <Col xs={4}><MyMessage id="me.accountInfo.referral.status" /></Col>
            <Col xs={4}><MyMessage id="me.accountInfo.referral.date" /></Col>
          </Row>
          {transactions.map((e, i) => (
            <Row key={i} className={style.table_body}>
              <Col xs={4}>DungT</Col>
              <Col xs={4}>Finished</Col>
              <Col xs={4}>{new Date(e.created_at).toLocaleString()}</Col>
            </Row>
          ))}
        </div>
      </div>
    );
  }
}  

const mapState = state => ({
  history: state.auth.history
});

const mapDispatch = { getTransactionsAction };
export default connect(mapState, mapDispatch)(Referral);