import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import photo from 'src/assets/images/1.png';
import { Link } from 'react-router-dom';
import { mount, testGetDataAsync } from './action';
import style from './style.scss';

class Home extends Component {
  componentWillMount() {
    const { mountBound, testGetDataAsyncBound } = this.props;
    mountBound();
    testGetDataAsyncBound('json');
    if (__SERVER__) {
      console.log(`This render from server __SERVER__=${__SERVER__}`);
    }
    if (__CLIENT__) {
      console.log(`This render from client __CLIENT__=${__CLIENT__}`);
    }
  }

  render() {
    const { time } = this.props;
    return (
      <div className={`common-container ${style.container}`}>
        <h1>HOME</h1>
        <span>
          Time
          { new Date(time).toISOString() }
        </span>
        <Link to="contact">Contact</Link>
        <img className={style.photo} src={photo} alt="" />
      </div>
    );
  }
}

const mapState = state => ({ time: state?.homeReducer?.time });

const mapDispatch = dispatch => ({
  mountBound: bindActionCreators(mount, dispatch),
  testGetDataAsyncBound: bindActionCreators(testGetDataAsync, dispatch),
});

Home.propTypes = {
  mountBound: PropTypes.func.isRequired,
  testGetDataAsyncBound: PropTypes.func.isRequired,
  time: PropTypes.string.isRequired,
};

export default connect(mapState, mapDispatch)(Home);
