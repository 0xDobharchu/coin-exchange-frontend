import React from 'react';
import PropTypes from 'prop-types';
import {injectIntl} from 'react-intl';
import {connect} from "react-redux";
import { MasterWallet } from "src/services/Wallets/MasterWallet";
import { bindActionCreators } from "redux";
import Button from 'src/components/core/controls/Button';
import ModalDialog from 'src/components/core/controls/ModalDialog';
// import { showLoading, hideLoading } from 'src/screens/app/redux/action';
import iconQRCodeBlack from 'src/assets/images/wallet/icons/icon-qrcode-black.svg';
import iconQRCodeWhite from 'src/assets/images/wallet/icons/icon-qrcode-white.svg';
import iconSelected from 'src/assets/images/wallet/icons/check-circle-solid.svg';
import style from './ListCoin.scss';

const QRCode = require('qrcode.react');

class ListCoin extends React.Component {
  static propTypes = {
    intl: PropTypes.object.isRequired,
    walletSelected: PropTypes.any,
    wallets: PropTypes.any,
    crypto: PropTypes.string,
    onSelect: PropTypes.func
  }

  static defaultProps = {
    wallets: null,
    walletSelected: null,
    crypto: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      modalQRCode: ''
    }
  }

  async componentDidMount() {
    let { walletSelected, wallets, crypto } = this.props;
    // this.props.showLoading();
    if(!wallets){
      wallets = await this.getWallets();
    }

    this.setState({wallets, walletSelected}, ()=> {
      // this.props.hideLoading() 
    });
  }

  getWallets = () => {
    const { crypto } = this.props;
    return new Promise(async (resolve, reject) => {
      let wallets = crypto ? await MasterWallet.getWallets(crypto) : await MasterWallet.getMasterWallet();

      // set name + text for list:
      let listWalletCoin = [];
      if (wallets.length > 0){
        for(let wal of wallets){
          if(!wal.isCollectibles){
            wal.text = wal.getShortAddress() + " (" + wal.name + "-" + wal.getNetworkName() + ")";
            if (APP_ENV.isProduction){
              wal.text = wal.getShortAddress() + " (" + wal.className + " " + wal.name + ")";
            }
            wal.id = wal.address + "-" + wal.getNetworkName() + wal.name;

            wal.balance = wal.formatNumber(await wal.getBalance());
            listWalletCoin.push(wal);
          }
        }

        resolve(listWalletCoin);
      }
    });
  }

  selectCoin = (wallet) => {
    const { onSelect } = this.props;

    if (onSelect) {
      onSelect(wallet);
    }
  }

  onClose = () => {
    this.setState({modalQRCode: ''});
    this.modalQRCodeRef.close();
  }

  openQRCode=(wallet)=>{
    this.setState({
      modalQRCode: <div className={style["qrBox"]}>
          <p className={style["address"]}>{wallet.address}</p>
          <div className={style["div-qr-code"]}>
            <QRCode size={250} value={wallet.address} />
          </div>
          <Button className={style["btn-dark"]} block={true} onClick={()=> this.onClose() }>Close</Button>
        </div>
      }, ()=> this.modalQRCodeRef.open());
  }

  get showListCoin(){
    const { wallets, walletSelected } = this.state;
    if(wallets){
      return wallets.map(e => {
        let icon = '';
        try{ icon = require("src/assets/images/wallet/icons/coins/" + e.name.toLowerCase() + '.svg')} catch (ex){console.log(ex)};
        let isLive = e.network === MasterWallet.ListCoin[e.className].Network.Mainnet;
        let isSelected = walletSelected && e.network == walletSelected.network && e.address == walletSelected.address && e.name == walletSelected.name;

        return <div className={style["coinName"] + " " + (!isLive && style["test"]) + ' ' + (isSelected ? style["selected"] : "")} key={e.name+e.network+e.address}>
            <div className="row">
              <div className={"col-2 " + style["icon"]} onClick={()=> this.selectCoin(e)}><img src={isSelected ? iconSelected : icon} /></div>
              <div className="col-5" onClick={()=> this.selectCoin(e)}>
                <div className={style["name"]}>{e.title}</div>
                <div className={style["address"]}>{e.getShortAddress()}</div>
              </div>
              <div className={"col-5 " + style["text-right"] + " " + style["pr-3"]}>
                <div className={style["balance"]} onClick={()=> this.selectCoin(e)}>{e.balance} {e.name}</div>
                <div className={style["qrcode"]}><img src={isSelected ? iconQRCodeWhite : iconQRCodeBlack}  onClick={()=> this.openQRCode(e)} /></div>

              </div>
            </div>
          </div>
        }
      );
    }
  }

  render() {

    const { messages } = this.props.intl;
    const { modalQRCode } = this.state;
    return (
      <div className={style["listCoin"]}>
        {this.showListCoin}
        <ModalDialog className={style["qr-wrapper"]} onRef={modal => this.modalQRCodeRef = modal}>
          {modalQRCode}
        </ModalDialog>
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

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(ListCoin));
