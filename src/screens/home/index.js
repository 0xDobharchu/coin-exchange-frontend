import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import photo from 'src/assets/images/1.png';
import { Link } from 'react-router-dom';
import { mount, testGetDataAsync } from './action';
import style from './style.scss';
import { FormattedMessage } from 'react-intl';

class Home extends Component {
  componentDidMount() {
    this.props.mount();
    this.props.testGetDataAsync('json');
  }
  componentWillMount() {
    console.log(`This render from server __SERVER__=${__SERVER__}`)
    __CLIENT__ &&  console.log(`This render from client __CLIENT__=${__CLIENT__}`)
  }
  render() {
    const { time } = this.props;
    return (
      <div className={`common-container ${style.container}`}>
        <h1>HOME</h1>
        <div><FormattedMessage id={'appTitle'} defaultMessage='dkmno' /></div>
        <span>Time {new Date(time).toISOString()}</span>
        <Link to="contact">Contact</Link>
        <Link to="localization">Localization</Link>
        <img className={style.photo} src={photo} />
      </div>
    );
  }
}

const mapState = (state) => ({ time: state?.homeReducer?.time });

const mapDispatch = (dispatch) => ({
  mount: bindActionCreators(mount, dispatch),
  testGetDataAsync: bindActionCreators(testGetDataAsync, dispatch),
});

export default connect(mapState, mapDispatch)(Home);