import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { MyMessage } from 'src/lang/components';
import EmailBlock from './EmailBlock';
import PhoneBlock from './PhoneBlock';
import style from './styles.scss';

const MeProfile = () => (
  <Container className={style.profile}>
    <Row className={style.head_text}>
      <MyMessage id="me.profile.head_text" />
    </Row>
    <Row>
      <Col md={12}>
        <EmailBlock style={style} />
      </Col>
      <Col md={12}>
        <PhoneBlock style={style} />
      </Col>
    </Row>
  </Container>
);

export default MeProfile;
