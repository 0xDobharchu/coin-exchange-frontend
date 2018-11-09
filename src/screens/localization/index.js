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
  changeLang = newlang => this.props.changeLang(newlang);
  showBtnText = () => 'Click to change to ' + (this.state.isEng ? 'Vietnam' : 'English');

  render() {
    return (<div className={style.container}>
      <button className={style.btn} onClick={this.toggleLang}>{this.showBtnText()}</button>
      <div className={style.title}>Test Multi languages</div>
      <div className={style.mainBox}>
        <div className={style.boxGreen}><BestHandleLang /></div>
        <div className={style.boxRed}><BadHandleLang /></div>
      </div>
    </div>)
  }
}
const mapDispatch = { changeLang }
export default connect(null, mapDispatch)(Localization);