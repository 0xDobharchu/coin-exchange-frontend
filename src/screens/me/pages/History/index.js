import React from 'react';
import { Row, Col } from 'react-bootstrap';
import style from './style.scss';

const History = () => (
  <div className={style.container}>
    <label className={style.title}>Transaction History</label>
    <div className={style.lineTitle} />
    <div className={style.block1}>
      <Row>
        <Col xs={4}>Date</Col>
        <Col xs={4}>Type</Col>
        <Col xs={4}>Amount</Col>
      </Row>
    </div>
  </div>
);

export default History;