import React from 'react';
import { connect } from 'react-redux';
import { getTransactionsAction } from 'src/screens/auth/redux/action';
import { Row, Col } from 'react-bootstrap';
import style from './style.scss';

class History extends React.PureComponent {

  state = {
    loading: true,
  }

  componentDidMount() {
    // eslint-disable-next-line
    this.props.getTransactionsAction().then(() => this.setState({ loading: false }));
  }
  render() {
    // eslint-disable-next-line
    if (this.state.loading) return (<div>Loading...</div>);
    const { history: { transactions } } = this.props;
    return (
      <div className={style.container}>
        <label className={style.title}>Transaction History</label>
        <div className={style.lineTitle} />
        <div className={style.block1}>
          <Row className={style.table_header}>
            <Col xs={4}>Date</Col>
            <Col xs={4}>Type</Col>
            <Col xs={4}>Amount</Col>
          </Row>
          {transactions.map((e, i) => (
            <Row key={i} className={style.table_body}>
              <Col xs={4}>{new Date(e.created_at).toLocaleString()}</Col>
              <Col xs={4}>Buy</Col>
              <Col xs={4}>{`${e.fiat_amount} ${e.fiat_currency}`}</Col>
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
export default connect(mapState, mapDispatch)(History);