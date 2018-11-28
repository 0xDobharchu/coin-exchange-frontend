import React from 'react';
import { connect } from 'react-redux';
import { MyMessage } from 'src/lang/components';
import { getTransactionsAction } from 'src/screens/auth/redux/action';
import { Row, Col } from 'react-bootstrap';
import { Button } from 'src/components/custom';
import PopupDetail from './PopupDetail';
import style from './style.scss';

class History extends React.PureComponent {

  state = {
    loading: true,
    isShow: false,
    selectedItem: {},
  }

  componentDidMount() {
    // eslint-disable-next-line
    this.props.getTransactionsAction().then(() => this.setState({ loading: false }));
  }
  handleOnSelect = (e) => {
    this.setState({ isShow: true, selectedItem: e });
  }
  modelClode = () => this.setState({ isShow: false });
  render() {
    // eslint-disable-next-line
    if (this.state.loading) return (<div>Loading...</div>);
    // eslint-disable-next-line
    const { history: { transactions } } = this.props;
    return (
      <div className={style.container}>
        <label className={style.title}><MyMessage id="me.history.title" /></label>
        <div className={style.lineTitle} />
        <div className={style.block1}>
          <Row className={style.table_header}>
            <Col xs={3}><MyMessage id="me.history.date" /></Col>
            <Col xs={3}><MyMessage id="me.history.refcode" /></Col>
            <Col xs={3}><MyMessage id="me.history.type" /></Col>
            <Col xs={3}><MyMessage id="me.history.amount" /></Col>
          </Row>
          {transactions.map((e, i) => (
            <Row key={i} className={style.table_body}>
              <Col xs={3}>{new Date(e.created_at).toLocaleString()}</Col>
              <Col xs={3}><Button value="Ref" onClick={this.handleOnSelect.bind(this, e)} /></Col>
              <Col xs={3}>{e.direction}</Col>
              <Col xs={3}>
                <label>{`${Number(e.amount).toFixed(2)} ${e.currency}`}</label>
                <label>{`${e.fiat_local_amount} ${e.fiat_local_currency}`}</label>
              </Col>
            </Row>
          ))}
        </div>
        <PopupDetail show={this.state.isShow} data={this.state.selectedItem} onHide={this.modelClode} />
      </div>
    );
  }
}  

const mapState = state => ({
  history: state.auth.history
});

const mapDispatch = { getTransactionsAction };
export default connect(mapState, mapDispatch)(History);