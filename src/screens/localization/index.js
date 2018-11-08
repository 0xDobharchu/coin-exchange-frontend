import React, { Component } from 'react';
import BestHandleLang from './BestHandleLang';
import BadHandleLang from './BadHandleLang';
import style from './style.scss';
import { connect } from 'react-redux';
import { changeLang } from '../../lang/action';

class Localization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEng: true,
    }
  }
  toggleLang = () => {
    const newLang = !this.state.isEng;
    this.setState({ isEng: !this.state.isEng});
    this.changeLang(newLang ? 'en' : 'vi')
  }
  changeLang = (newlang) => this.props.changeLang(newlang);
  render() {
    return (<div className={style.container}>
      <button onClick={this.toggleLang}>{this.state.isEng ? 'Change to Vietnam' : 'Change to English'}</button>
      <div style={{ display: 'flex', justifyContent: 'center', padding: 10 }}>Test Multi languages</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: 10 }}>
        <div style={{ display: 'flex'}}><BestHandleLang /></div>
        <div style={{ display: 'flex'}}><BadHandleLang /></div>
      </div>
    </div>)
  }
}
const mapDispatch = { changeLang }
export default connect(null, mapDispatch)(Localization);