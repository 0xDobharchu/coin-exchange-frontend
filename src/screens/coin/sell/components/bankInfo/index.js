import React from 'react';
import PropTypes from 'prop-types';
import { Card, Container, Row, Col } from 'react-bootstrap';
import LabelLang from 'src/lang/components/LabelLang';
import { Link } from 'react-router-dom';
import { URL } from 'src/resources/constants/url';
import styles from './styles.scss';

const getIntlKey = (name) => `coin.components.sellBankInfo.${name}`;

const BankInfo = ({ bankInfo = {} }) => {
  const { bankName, bankAccountName, bankAccountNumber } = bankInfo;
  return (
    <Card border="secondary" className={styles.container}>
      <Card.Header className={styles.label}><LabelLang id={getIntlKey('bankInfo')} /></Card.Header>
      <Card.Body>
        <Container className={styles.body}>
          <Row>
            <Col xs={12} sm={6} className={styles.label}>
              <LabelLang id={getIntlKey('bankName')} />
            </Col>
            <Col xs={12} sm={6}><span className={styles.value}>{bankName}</span></Col>
          </Row>
          <Row>
            <Col xs={12} sm={6} className={styles.label}>
              <LabelLang id={getIntlKey('bankAccountName')} />
            </Col>
            <Col><span className={styles.value}>{bankAccountName}</span></Col>
          </Row>
          <Row>
            <Col xs={12} sm={6} className={styles.label}>
              <LabelLang id={getIntlKey('bankAccountNumber')} />
            </Col>
            <Col xs={12} sm={6}><span className={styles.value}>{bankAccountNumber}</span></Col>
          </Row>
          <Row>
            <Link to={URL.ME_BANK_INFO} className={styles.editLink}><span><LabelLang id={getIntlKey('gotoEdit')} /></span></Link>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};

BankInfo.propTypes = {
  bankInfo: PropTypes.object.isRequired,
};

export default BankInfo;