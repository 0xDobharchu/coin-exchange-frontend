import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeLang } from 'src/lang/action';
import BestHandleLang from './BestHandleLang';
import BadHandleLang from './BadHandleLang';
import style from './style.scss';

class Localization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEng: true,
    };
  }

  toggleLang = () => {
    const { isEng } = this.state;
    const newLang = !isEng;
    this.setState({ isEng: !isEng });
    this.changeLang(newLang ? 'en' : 'vi');
  }

  // eslint-disable-next-line
  changeLang = newlang => this.props.changeLang(newlang);


  // eslint-disable-next-line
  showBtnText = () => this.state.isEng ? 'Vietnam' : 'English';

  render() {
    return (
      <div className={style.container}>
        <button type="button" className={style.btn} onClick={this.toggleLang}>{this.showBtnText()}</button>
        <div className={style.title}>Test Multi languages</div>
        <div className={style.mainBox}>
          <div className={style.boxGreen}><BestHandleLang /></div>
          <div className={style.boxRed}><BadHandleLang /></div>
        </div>
      </div>
    );
  }
}
const mapDispatch = { changeLang };
export default connect(null, mapDispatch)(Localization);
