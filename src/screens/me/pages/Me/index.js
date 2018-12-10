import React from 'react';
import { connect } from 'react-redux';
import { getProfileAction }from 'src/screens/auth/redux/action';
import { Container } from 'react-bootstrap';
import Loading from 'src/components/loading';
import style from './style.scss';
import Navigation from './navigation';

class Me extends React.PureComponent {
  state = {
    loading: true,
  }
  componentDidMount() {
    // eslint-disable-next-line
    this.props.getProfileAction().then(() => this.setState({ loading: false })).catch(err=>err);
  }
  render() {
    // eslint-disable-next-line
    if (this.state.loading) return (
      <div className={style.LoadingContainer}>
        <Loading />
      </div>);
    return (
      <div className={style.me}>
        <Container className={style.container}>
          <Navigation {...this.props} />
        </Container>
      </div>
    );
  }
}

export default connect(null, { getProfileAction })(Me);
