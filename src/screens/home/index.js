import React, { Component } from 'react';
import photo from 'src/assets/images/1.png';
import { Link } from 'react-router-dom';
import style from './style.scss';

export default class Home extends Component {
  componentWillMount() {
    console.log('__SERVER__', __SERVER__)
    __CLIENT__ && console.log(window, document);
  }
  render() {
    return (
      <div className={`common-container ${style.container}`}>
        <h1>HOMesss</h1>
        <span>{String(__SERVER__)}</span>
        <span>C{String(__CLIENT__)}</span>
        <button onClick={() => {
          alert(`${__CLIENT__} ${__SERVER__}`)
        }}>A</button>
        <Link to="contact">Contact</Link>
        <img className={style.photo} src={photo} />
      </div>
    );
  }
}