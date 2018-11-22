import React from 'react';
import PropTypes from 'prop-types';
import {injectIntl} from 'react-intl';
import {connect} from "react-redux";
import { bindActionCreators } from "redux";
import Modal from '@/components/core/controls/Modal';
// import { showLoading, hideLoading } from '@/screens/app/redux/action';
import { ICON } from '@/components/wallet/images';
import ListCoin from '@/components/wallet/ListCoin';
import style from './WalletSelected.scss';

class WalletSelected extends React.Component {
  static propTypes = {
    intl: PropTypes.object.isRequired,
    walletSelected: PropTypes.any,
    onSelect: PropTypes.func
  }

  static defaultProps = {
    walletSelected: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      walletSelected: this.props.walletSelected,
      wallets: this.props.wallets,
      modalListCoin: ''
    }
  }

  async componentDidMount() {
  }

  selectWallet = (walletSelected) => {
    const { onSelect } = this.props;

    this.setState({walletSelected, modalListCoin: ''}, ()=> {
      this.modalListCoinRef.close();
    });

    if (onSelect) {
      onSelect(walletSelected);
    }
  }

  openListCoin=()=>{
    this.setState({modalListCoin:
      <ListCoin
        wallets={this.state.wallets}
        walletSelected={this.state.walletSelected}
        onSelect={wallet => { this.selectWallet(wallet); }}
      />
    }, ()=> {
      this.modalListCoinRef.open();
    });
  }

  get showWallet(){
    const walletSelected = this.state.walletSelected;
    let icon = '';
    try{
      if(walletSelected)
        icon = require("@/assets/images/wallet/icons/coin-square/" + walletSelected.name.toLowerCase() + '.svg');
    } catch (ex){console.log(ex)};
    return (
      <div className={style["walletSelected"]} onClick={() => {this.openListCoin() }}>
        <div className="row">
          <div className={'col-2 ' + style["icon"] + ' ' + style['col-padding']}><img src={icon} /></div>
          <div className={'col-5' +  + ' ' + style['col-padding']}>
            <div className={style["name"]}>{walletSelected && walletSelected.title}</div>
            <div className={style["address"]}>{walletSelected && walletSelected.getShortAddress()}</div>
          </div>
          <div className={"col-5 " + style["lastCol"] + ' ' + style['col-padding']}>
            <div className={style["balance"]}>{walletSelected && walletSelected.balance + " " + walletSelected.name}</div>
            <div className={style["arrow"]}>{ICON.ArrowDown()}</div>
          </div>
        </div>
      </div>);
  }

  render() {

    const { messages } = this.props.intl;
    const { modalListCoin } = this.state;

    return (
      <div className="">
        {this.showWallet}

        <Modal title={messages['wallet.action.transfer.placeholder.select_wallet']} onRef={modal => this.modalListCoinRef = modal}>
          {modalListCoin}
        </Modal>
      </div>
    )
  }
}



const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
  // showLoading: bindActionCreators(showLoading, dispatch),
  // hideLoading: bindActionCreators(hideLoading, dispatch),
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(WalletSelected));
