import React from 'react';
import { connect } from 'react-redux';
import iconExternalLink from '@/assets/images/wallet/icons/icon-external-link.svg';
import iconSelf from '@/assets/images/wallet/icons/icon-self.svg';
import iconSent from '@/assets/images/wallet/icons/icon-sent.svg';
import iconCreate from '@/assets/images/wallet/icons/icon-create.svg';
import iconReceived from '@/assets/images/wallet/icons/icon-received.svg';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import style from './Wallet.scss';
import WalletTransaction from './WalletTransaction';
import { showLoading, hideLoading } from '@/screens/app/redux/action';
import cx from 'classnames'
import Modal from '@/components/core/controls/Modal';
import {Tabs} from 'rmc-tabs';

import 'rmc-tabs/assets/index.css';

import imgNoTrans from '@/assets/images/wallet/images/no-transaction.svg';
import iconLoadding from '@/assets/images/icon/loading.gif';
import needBackupWhite from '@/assets/images/wallet/icons/icon-need-backup-white.svg';

const TAB = {
  Transaction: 0,
  Internal: 1
}

class WalletHistory extends React.Component {
  static propTypes = {
    intl: PropTypes.object.isRequired,
  }

	constructor(props) {

    super(props);
    this.state = {
      transactions: [],
      internalTransactions: [],
      transaction_detail: null,
      tabActive: TAB.Transaction,
      wallet: this.props.wallet,
      pagenoTran: 1,
      pagenoIT: 1,
      callUpdate: false
    };
  }

  getSessionStore(wallet, tab){
    let result = false;
    if(wallet){
      let key = `${wallet.name}_${tab}_${wallet.address}`;
      let data = window.sessionStorage.getItem(key);

      try{
        if(data){
          result = JSON.parse(data);
        }
      }
      catch(e){

      }
    }

    return result;
  }

  setSessionStore(wallet, tab, data){
    let result = false;
    if(wallet && data){
      let key = `${wallet.name}_${tab}_${wallet.address}`;
      window.sessionStorage.setItem(key, JSON.stringify(data));
    }
  }

  async componentDidUpdate(){
    const { callUpdate } = this.props;
    let { callUpdate:stateCallUpdate, transactions } = this.state;
    let stateHash = stateCallUpdate ? stateCallUpdate.data.hash : "";
    if(callUpdate && callUpdate.data.hash != stateHash){

      if(callUpdate.fromWallet.name == "ETH"){
        let transactions = this.getSessionStore(this.state.wallet, TAB.Transaction);
        this.setState({transactions:transactions, callUpdate: callUpdate});
      }
    }
  }

  async componentDidMount(){
    let {wallet, pagenoTran, pagenoIT, transactions, internalTransactions} = this.state;

    let cTransaction = this.getSessionStore(wallet, TAB.Transaction),
      cInternalTransactions = this.getSessionStore(wallet, TAB.Internal);

    if(cTransaction && cInternalTransactions){
      internalTransactions = cInternalTransactions && cInternalTransactions.length > 0 ? cInternalTransactions : [];
      transactions = cTransaction && cTransaction.length > 0 ? cTransaction : [];
    }
    else{
      wallet.isLoading = true;
    }

    this.setState({wallet: wallet, transactions: transactions, internalTransactions: internalTransactions}, () => {
      this.getNoTransactionYet();
    });

    if(wallet && wallet.name != 'XRP'){
      wallet.balance = await wallet.getBalance();
      wallet.transaction_count = await wallet.getTransactionCount();

      transactions = await wallet.getTransactionHistory(pagenoTran);
      if(this.checkAPINewest(cTransaction, transactions)){
        this.setSessionStore(wallet, TAB.Transaction, transactions);
      }
      else{
        transactions = cTransaction;
      }

      if(Number(transactions.length) < 20) pagenoTran = 0;
      if(transactions.length > wallet.transaction_count) wallet.transaction_count = transactions.length;

      //internalTransactions for ETH only
      if(wallet.name == "ETH"){
        internalTransactions = await wallet.listInternalTransactions(pagenoIT);
        if(this.checkAPINewest(cInternalTransactions, internalTransactions)){
          this.setSessionStore(wallet, TAB.Internal, internalTransactions);
        }
        else{
          internalTransactions = cInternalTransactions;
        }

        if(Number(internalTransactions.length) < 20) pagenoIT = 0;
        if(internalTransactions.length > wallet.transaction_count) wallet.transaction_count = transactions.length;
      }

      wallet.isLoading = false;
    }
    else{
      wallet.isHistorySupport = false;
      wallet.isLoading = false;
    }

    this.setState({
      wallet: wallet,
      transactions: transactions,
      internalTransactions: internalTransactions,
      pagenoTran: pagenoTran,
      pagenoIT: pagenoIT
    });
  }

  checkAPINewest(cTransaction, transactions){
    let result = false;
    if(cTransaction && transactions && cTransaction.length && transactions.length){
      let c = cTransaction[0];
      for(var t of transactions){
        if(c.hash == t.hash){
          result = true;
          break;
        }
      }
    }
    else{
      result = true;
    }
    return result;
  }

  getNoTransactionYet(text){
    const wallet = this.props.wallet;

    return <div className={style.historyNoTrans}>
      {wallet && !wallet.isLoading ?
        <div>
          <img src={imgNoTrans} />
          <div className={style.headerHistoryTx}>{text}</div>
        </div>
        : <img className={style.iconLoadingHistory} src={iconLoadding} />}
    </div>
  }

  get list_transaction() {
    const wallet = this.props.wallet;
    const { messages } = this.props.intl;

    if (wallet && !this.state.transactions.length)
      return this.getNoTransactionYet(messages['wallet.action.history.label.no_trans']);
    else if(wallet){
      let arr = [];
      return this.state.transactions.map((res) => {
        let tran = wallet.cook(res);
        if(arr.indexOf(tran.transaction_no) < 0)
          arr.push(tran.transaction_no);
        else {
          tran.is_sent = 1;
          return "";
        }

        let cssLabel = "label-self", cssValue = "value-self", icon = iconSelf, label = messages['wallet.action.history.label.self'];
        if(tran.is_sent == 1) {
          cssLabel = "label-sent";
          cssValue = "value-sent";
          label = messages['wallet.action.history.label.sent'];
          icon = iconSent;
        }
        else if (tran.is_sent == 2) {
          cssLabel = "label-received";
          cssValue = "value-received";
          label = messages['wallet.action.history.label.received'];
          icon = iconReceived;
        }
        else if (tran.is_sent == 3) {
          cssLabel = "label-create";
          cssValue = "value-create";
          label = messages['wallet.action.history.label.create'];
          icon = iconCreate;
        }

        res.is_sent = tran.is_sent;

        return <div key={tran.transaction_no} className="row" onClick={() =>{this.detailTransaction(res)}}>
            <div className={style.col3}>
              <div className={style.time}>{tran.transaction_relative_time}</div>
              <div className={cssValue}>{tran.is_sent == 1 ? "-" : ""}{Number(tran.value)} {tran.coin_name}</div>
              {tran.confirmations <= 0 ? <div className={style.unconfirmation}>{messages['wallet.action.history.label.unconfirmed']}</div> : ""}
              {tran.is_error ? <div className={style.unconfirmation}>{messages['wallet.action.history.label.failed']}</div> : ""}
            </div>
            <div className={style.col1}><img className={style.iconDollar} src={icon} /></div>
            <div className={cx(style.col2, style.history-address)}>
              <div className={cssLabel}>
                {label}
              </div>
              {
                tran.addresses.map((addr) => {
                  return <div key={addr} className={style.addr}>{addr}</div>
                })
              }
            </div>
          </div>
      });
    }
  }

  get list_internalTransaction() {
    const wallet = this.props.wallet;
    const { messages } = this.props.intl;

    if (wallet && !this.state.internalTransactions.length)
      return this.getNoTransactionYet(messages['wallet.action.history.label.no_internal_trans']);
    else if(wallet){
      let arr = [];

      return this.state.internalTransactions.map((res) => {
        let tran = wallet.cookIT(res);
        if(!tran) return "";

        if(arr.indexOf(tran.transaction_no) < 0)
          arr.push(tran.transaction_no);
        else {
          return "";
        }

        let cssLabel = "label-self", cssValue = "value-self", icon = iconSelf, label = messages['wallet.action.history.label.self'];
        if(tran.is_sent == 1) {
          cssLabel = "label-sent";
          cssValue = "value-sent";
          label = messages['wallet.action.history.label.sent'];
          icon = iconSent;
        }
        else if (tran.is_sent == 2) {
          cssLabel = "label-received";
          cssValue = "value-received";
          label = messages['wallet.action.history.label.received'];
          icon = iconReceived;
        }
        else if (tran.is_sent == 3) {
          cssLabel = "label-create";
          cssValue = "value-create";
          label = messages['wallet.action.history.label.create'];
          icon = iconCreate;
        }

        return <div key={tran.transaction_no} className="row" onClick={() =>{this.detailTransaction(res)}}>
            <div className={style.col3}>
              <div className={style.time}>{tran.transaction_relative_time}</div>
              <div className={cssValue}>{tran.is_sent == 1 ? "-" : ""}{Number(tran.value)} ETH</div>
              {tran.is_error ? <div className={style.unconfirmation}>{messages['wallet.action.history.label.failed']}</div> : ""}
            </div>
            <div className={style.col1}><img className={style.iconDollar} src={icon} /></div>
            <div className={style.col2 + ' ' + style.historyAddress}>
              <div className={cssLabel}>{label}</div>
              {
                tran.addresses.map((addr) => {
                  return <div key={addr}>{addr}</div>
                })
              }
            </div>
          </div>
      });
    }
  }

  closeDetail = () => {
    this.setState({ transaction_detail: null });
  }

  showLoading(status) {
    this.props.showLoading({ message: '' });
  }
  hideLoading() {
    this.props.hideLoading();
  }

  async detailTransaction(data){
    const wallet = this.props.wallet;
    if(wallet && data){
      if(wallet.name == "ETH" || wallet.isToken) {
        let it = await wallet.getInternalTransactions(data.hash);
        if(it && it.length > 0) data["internal_transactions"] = it;
      }

      this.modalTransactionRef.open();
      this.showLoading();
      this.setState({transaction_detail: data});
      this.hideLoading();
    }
  }

  get detail_transaction() {
    const wallet = this.props.wallet;
    const { messages } = this.props.intl;

    return (
      <Modal customBackIcon={this.props.customBackIcon} modalHeaderStyle={this.props.modalHeaderStyle} title={messages['wallet.action.transaction.header']} onRef={modal => this.modalTransactionRef = modal} onClose={this.closeDetail}>
        <WalletTransaction wallet={wallet} transaction_detail={this.state.transaction_detail}  />
      </Modal>
    );
  }

  get load_balance(){
    const wallet = this.props.wallet;
    const { messages } = this.props.intl;
    if (wallet){
      var logo = require("@/assets/images/wallet/icons/coins/" + wallet.icon);
      try { logo = require("@/assets/images/wallet/icons/coins/" + wallet.getCoinLogo());} catch (e){};
    }

    return wallet ?
    (
      <div className={style.clearFix}>
        <div className={style.walletDetail}>
          <div><img className={style.logoDetail} src={logo}/></div>
          {!wallet.hideBalance ?
          <div className={style.balance}>{wallet.balance} {wallet.name}</div>
          :<div className={style.balance}>[{messages['wallet.action.history.label.balance_hidden']}]</div>}

          <div className={style.boxButton}>
            {!wallet.isCollectibles ? <div>
              <div className={style.bt1}><button onClick={this.props.onTransferClick}>{messages['wallet.action.history.label.send']}</button></div>
              <div className={style.bt2}><button onClick={this.props.onReceiveClick}>{messages['wallet.action.history.label.receive']}</button></div>
            </div>
            : <div className={style.bt}><button onClick={this.props.onReceiveClick}>{messages['wallet.action.history.label.receive']}</button></div>
            }
          </div>
          

          {!wallet.protected &&
            <div className={style.boxWarning} onClick={this.props.onWarningClick}>
            {messages['wallet.action.protect.text.need_backup']} <img src={needBackupWhite} />
            </div>
          }
        </div>
        
      </div>
    ) : "";
  }

	render(){
    const wallet = this.state.wallet;
    const { messages } = this.props.intl;
		return (
    <div>
      <div className={style.historywalletWrapper}>
        {this.load_balance}

        {/* Not support render */}
        {wallet && wallet.isHistorySupport === false ?
          this.getNoTransactionYet(messages['wallet.action.history.label.coming_soon'])
        :
          <div className={style.historyCcontent}>
            {wallet && (wallet.name == "ETH" || wallet.isToken) && (this.state.internalTransactions && this.state.internalTransactions.length > 0) ?
            <Tabs onChange={(tab, index) => this.setState({tabActive: index})} tabs={[
                { key: 't1', title: messages['wallet.action.history.label.transactions']},
                { key: 't2', title: messages['wallet.action.history.label.internal_transactions']},
              ]} initalPage={'t1'}
              >
              <div key="t1">{this.list_transaction}</div>
              <div key="t2">{this.list_internalTransaction}</div>
            </Tabs>
            :
            this.state.tabActive == 0 ? this.list_transaction : this.list_internalTransaction }

          </div>
        }

      </div>
      <div className={style.historywalletWrapper}>
        {this.detail_transaction}
      </div>
    </div>
		);
	}
}

WalletHistory.propTypes = {
  wallet: PropTypes.any,
  transactions: PropTypes.array
};

const mapState = (state) => ({

});

const mapDispatch = ({
  showLoading,
  hideLoading,
});

export default injectIntl(connect(mapState, mapDispatch)(WalletHistory));
