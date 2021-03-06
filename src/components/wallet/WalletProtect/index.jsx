import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import style from './style.scss';

import Button from 'src/components/core/controls/Button';
import Checkbox from 'src/components/core/controls/Checkbox/Checkbox';
import { Modal } from 'react-bootstrap';
import LogManager from 'src/services/logs/logmanage';

class WalletProtect extends React.Component {
  static propTypes = {
    intl: PropTypes.object.isRequired,
  }

  constructor(props) {

    super(props);
    this.state = {
      step1_confirm: false,
      step: this.props.step,
      arr_random: [],
      arr_confirm: [],
      isConfirmModalShow: false,
    };
  }

  componentDidMount() {
    //this.setState({step1_confirm: false, step: this.props.step, arr_confirm: []});
    console.log(this.state.step);
  }

  get showStep1() {
    const { messages } = this.props.intl;

    return this.state.step == 1 ?
      (
        <div className={style.protectwalletWrapper}>
          <div className={style.msg1}>
            {messages['wallet.action.protect.text.msg1']}
          </div>
          <div className={style.msg2}>
            {messages['wallet.action.protect.text.step1_msg2']}
          </div>
          <div className={style.msg3}>
            <Checkbox name="checkBoxProtected" label={messages['wallet.action.protect.text.step1_label']}
              defaultChecked={this.state.step1_confirm}
              onClick={() => { this.setState({ step1_confirm: !this.state.step1_confirm }); }} />
          </div>
          <Button className={style.buttonWallet} block disabled={!this.state.step1_confirm} type="submit" onClick={this.doStep1}>Continue</Button>
        </div>
      )
      : "";
  }

  get showStep2() {
    const { wallet, onCopy } = this.props;
    const { messages } = this.props.intl;

    let arr_phrase = wallet && wallet.mnemonic ? wallet.mnemonic.split(' ') : [];
    return this.state.step == 2 ?
      (
        <div className={style.protectwalletWrapper} >
          <div className={style.msg1}>
            {messages['wallet.action.protect.text.step2_msg1']}
          </div>
          <div className={style.passPhrase}>
            {/* fill pass phrase */}
            {arr_phrase.map((str) => {
              return <div key={str} className={"btn " + style["cursor-initial"] + " bg-light"}>{str}</div>
            })}
          </div>
          <div onClick={onCopy} className={style.passPhraseLinkCopy}>{messages['wallet.action.protect.button.copy_clipboard']}</div>
          <Button className={style.buttonWallet} block type="submit" onClick={this.doStep2}>{messages['wallet.action.protect.button.verify']}</Button>
        </div>
      )
      : "";
  }

  get showStep3() {
    const { messages } = this.props.intl;

    return this.state.step == 3 ?
      (
        <div className={style.protectwalletWrapper} >
          <div className={style.msg1}>
            {messages['wallet.action.protect.text.step3_msg1']}
          </div>
          <div className={style.confirmPassPhrase}>
            {this.state.arr_confirm.map((str) => {
              return <div key={str} className="btn btn-light" onClick={() => this.pickPassPhrase(str, false)}>{str}</div>
            })}
          </div>
          <div className={style.passPhrase}>
            {/* fill pass phrase */}
            {this.state.arr_random.map((str) => {
              return <div key={str} className="btn btn-light" onClick={() => this.pickPassPhrase(str, true)}>{str}</div>
            })}
          </div>
          <Button className={style.buttonWallet} block type="submit" onClick={this.doStep3}>{messages['wallet.action.protect.button.verify']}</Button>
        </div>
      )
      : "";
  }

  arraySortRandom(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  pickPassPhrase = (phrase, isPick) => {
    let arr1 = [], arr2 = [];
    if (isPick) {
      arr1 = this.state.arr_confirm;
      arr2 = this.state.arr_random;
    }
    else {// for undo
      arr1 = this.state.arr_random;
      arr2 = this.state.arr_confirm;
    }

    arr1.push(phrase);//add to array 1

    let index = arr2.indexOf(phrase);
    if (index > -1) {
      arr2.splice(index, 1);
    }// remove from array 2

    if (isPick) {
      this.setState({ arr_confirm: arr1, arr_random: arr2 });
    }
    else {// for undo
      this.setState({ arr_confirm: arr2, arr_random: arr1 });
    }
  }

  doStep1 = () => {
    this.setState({ arr_confirm: [], step: 2 });
    // save event:
    LogManager.saveLog(
      LogManager.PAGE_EVENT.wallet.protected.name, 
      LogManager.PAGE_EVENT.wallet.protected.event.protectedStep1Click,
      `wallet address: ${this.props.wallet.address}`
    );
  }

  doStep2 = () => {
    const { wallet } = this.props;
    let arr_phrase = wallet && wallet.mnemonic ? wallet.mnemonic.split(' ') : [], arr_random = [];
    if (arr_phrase.length > 0) {
      arr_random = this.arraySortRandom(arr_phrase);
    }

    this.setState({ arr_random: arr_random, arr_confirm: [], step: 3 });
    // save event:
    LogManager.saveLog(
      LogManager.PAGE_EVENT.wallet.protected.name, 
      LogManager.PAGE_EVENT.wallet.protected.event.protectedStep2Click,
      `wallet address: ${this.props.wallet.address}`
    );
  }

  tryDoStep3 = () => {
    this.doStep2(); //reuse step2
    this.setState({isConfirmModalShow: false});
    // save event:
    LogManager.saveLog(
      LogManager.PAGE_EVENT.wallet.protected.name, 
      LogManager.PAGE_EVENT.wallet.protected.event.protectedTryStep3Click,
      `wallet address: ${this.props.wallet.address}`
    );
  }

  doStep3 = () => {

    // save event:
    LogManager.saveLog(
      LogManager.PAGE_EVENT.wallet.protected.name, 
      LogManager.PAGE_EVENT.wallet.protected.event.protectedStep3Click,
      `wallet address: ${this.props.wallet.address}`
    );

    const { wallet } = this.props;
    let arr_confirm = this.state.arr_confirm, arr_phrase = wallet && wallet.mnemonic ? wallet.mnemonic.split(' ') : [], arr_random = [];
    let bMatch = true, i = 0;

    while (bMatch && i < arr_phrase.length) {
      bMatch = arr_confirm[i] == arr_phrase[i];
      i++;
    }


    if (bMatch) {
      this.setState({ step1_confirm: false, step: 1, arr_confirm: [], arr_random: [] });

      //callback close form
      const { callbackSuccess } = this.props;

      if (callbackSuccess) {
        callbackSuccess();
      }
      // save event:
      LogManager.saveLog(
        LogManager.PAGE_EVENT.wallet.protected.name, 
        LogManager.PAGE_EVENT.wallet.protected.event.protectedWalletSuccess,
        `wallet address: ${wallet.address}`
      );
    }
    else {
      this.setState({isConfirmModalShow: true});     
      LogManager.saveLog(
        LogManager.PAGE_EVENT.wallet.protected.name, 
        LogManager.PAGE_EVENT.wallet.protected.event.protectedWalletFail,
        `wallet address: ${wallet.address}`
      ); 
    }
  }


  render() {
    const { messages } = this.props.intl;
    return (
      <div>
        {this.showStep1}
        {this.showStep2}
        {this.showStep3}

        <Modal
          show={this.state.isConfirmModalShow}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          onHide={this.onClose}>
          <Modal.Header closeButton>
            <Modal.Title>Try again</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={style.bodyConfirm}>
              <p>{messages['wallet.action.protect.error.confirm']}</p>

              <button className={"btn-block btn " + style.p2} onClick={this.tryDoStep3}>{messages['wallet.action.protect.button.ok']}</button>

            </div>
          </Modal.Body>
        </Modal>
        
      </div>
    );
  }
}

WalletProtect.propTypes = {
  wallet: PropTypes.any,
  step: PropTypes.any,
  onCopy: PropTypes.func
};

const mapState = (state) => ({

});

const mapDispatch = ({
});

export default injectIntl(connect(mapState, mapDispatch)(WalletProtect));
