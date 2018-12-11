import React from 'react';
import { connect } from 'react-redux';
import { getAccountLevelByCurrency } from 'src/screens/auth/redux/api';
import { getProfileAction, sendEmailVerifyCodeAction } from 'src/screens/auth/redux/action';
import { Col, Container, Row } from 'react-bootstrap';
import { LabelLang } from 'src/lang/components';
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
      msgs: [],
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
      const { profile: { currency } } = this.props;
      getAccountLevelByCurrency(currency).then(msgs => {
        this.setState({ loading: false, msgs });
      });
    }
  }
  getMsgByLevel = (level) => {
    const { msgs } = this.state;
    const { currency, limit } = msgs.find(e => e.level === level);
    console.log('getMsg by level1', currency, limit);
    return { currency, limit };
  }

  render() {
    // eslint-disable-next-line
    if (this.state.loading) return (<Loading />);
    // eslint-disable-next-line
    return (
      <Container className={style.profile}>
        <Row className={style.head_text}>
          <LabelLang id="me.accountLevel.head_text" />
        </Row>
        <Row>
          <Col md={12}>
            <EmailBlock style={style} msg={this.getMsgByLevel('level_1')} />
          </Col>
          <Col md={12}>
            {<PhoneBlock style={style} msg={this.getMsgByLevel('level_2')} />}
          </Col>
          <Col md={12}>
            {<IDCardBlock style={style} msg={this.getMsgByLevel('level_3')} />}
          </Col>
          <Col md={12}>
            {<SelfieBlock style={style} />}
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
