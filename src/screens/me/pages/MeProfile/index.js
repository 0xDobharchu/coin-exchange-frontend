import React from 'react';
import { connect } from 'react-redux';
import { getProfileAction, sendEmailVerifyCodeAction }from 'src/screens/auth/redux/action';
import { Col, Container, Row } from 'react-bootstrap';
import { MyMessage, WrapperLang } from 'src/lang/components';
import Loading from 'src/components/loading';
import queryString from 'query-string';
import EmailBlock from './EmailBlock';
import PhoneBlock from './PhoneBlock';
import IDCardBlock from './IDCardBlock';
import SelfieBlock from './SelfieBlock';
import style from './styles.scss';

class MeProfile extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
  componentDidMount() {
    // eslint-disable-next-line
    const values = queryString.parse(this.props.location.search);
    if (values.email_code) {
      // eslint-disable-next-line
      this.props.sendEmailVerifyCodeAction(values.email_code).then(r => this.setState({ loading: false })).catch(err => err);
    } else {
      // eslint-disable-next-line
      this.props.getProfileAction().then(r => this.setState({ loading: false })).catch(err => err);
    }
  }
  render() {
    // eslint-disable-next-line
    if (this.state.loading) return (<Loading />);
    return (
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
          <Col md={12}>
            <IDCardBlock style={style} />
          </Col>
          <Col md={12}>
            <SelfieBlock style={style} />
          </Col>
          <Col md={12}>
            <WrapperLang>
              {ts => 
                (<div>{ts('me.profile.head_text')}</div>)
              }
            </WrapperLang>
          </Col>
        </Row>
        <Row style={{ height: '60px' }} />
      </Container>
    );
  }
}

const mapState = (state, ownProps) => ({
  profile: state.auth.profile,
  ...ownProps
});
const mapDispatch = { getProfileAction, sendEmailVerifyCodeAction }; 
export default connect(mapState, mapDispatch)(MeProfile);
