import React from 'react';
import PropTypes from 'prop-types';
import {injectIntl} from 'react-intl';
import { Col, Row } from 'react-bootstrap';
import {Bitcoin} from 'src/services/Wallets/Bitcoin.js';
import {Ethereum} from 'src/services/Wallets/Ethereum.js';

import iconSafe from 'src/assets/images/wallet/icons/icon-safe.svg';
import iconWarning from 'src/assets/images/wallet/icons/icon-warning.svg';

import iconChecked from 'src/assets/images/wallet/icons/checked-green.svg';
import iconQRCode from 'src/assets/images/wallet/icons/icon-qrcode-black.svg';
import bgCollectibles from 'src/assets/images/wallet/images/tokenerc721-mainnet.svg'

import needBackup from 'src/assets/images/wallet/icons/need-backup.svg';

// import iconPreference from 'src/assets/images/wallet/icons/icon-preference-gray.svg';
import dontIcon from '@/assets/images/wallet/icons/3-dot-icon-black.svg';

import style from './ListWalletItem.scss';



class WalletItem extends React.Component {
  static propTypes = {
    intl: PropTypes.object.isRequired,
  }

  getShortAddres(address){
    return address.replace(address.substr(12, 27), '...');
  }

  get showCryptoAddress(){
    const {wallet, settingWallet} =  this.props;
    
    return (<div>
        <img src={iconQRCode} />
      </div>)
  }

  get showBackup(){
    const { messages } = this.props.intl;
    const {wallet, settingWallet, onWarningClick} =  this.props;
    let html = <div><img className={style.safe} src={needBackup} /> <span className={style.warning} onClick={onWarningClick}>{messages['wallet.action.protect.text.need_backup']}</span></div>;

    return (html)
  }

  render(){
      const {wallet, onAddressClick, isSortable, onItemClick, onWarningClick} =  this.props;
      const { messages } = this.props.intl;      
      let logo = require("src/assets/images/wallet/icons/coins/" + wallet.icon);
      try{ logo = require("src/assets/images/wallet/icons/coins/" + wallet.getCoinLogo());} catch (e){};

      return  (

        <div className={style.itemWallet}>          
              {!wallet.protected && <img onClick={onWarningClick} className={style.safe} src={needBackup} /> }
              <img onClick={onItemClick} className={style.coinLogo} src={logo}/>
              <div className={style.itemCenter} onClick={onItemClick}>
                <div className={style.name}>
                  {wallet.title}
                  {wallet.default ? <img className={style.iconDefault} src={iconChecked}/> : ''}
                </div>
                {!wallet.hideBalance ?
                <span className={style.balance}> {wallet.getShortBalance()} {wallet.name} </span>
                :<span className={style.balance}>[{messages['wallet.action.history.label.balance_hidden']}]</span> }
              </div>

              {!isSortable ?
                <span className={style.itemRight}>
                  <span className={style.address +  " hidden-xss-down"} onClick={onAddressClick}>
                      {this.showCryptoAddress}
                  </span>
                  {/* <span className={style.more} onClick={onMoreClick}><img src={dontIcon}/></span> */}

                </span>
              : ""}                        
            {/* <div className="onlyDesktop" style={{marginTop: "15px", marginLeft: "65px"}}>
              <button style={{width: "80px", height: "40px", backgroundColor: "transparent", border: "#c1c1c1 1px solid", color: "#000000", fontSize: "16px", marginRight: "15px"}}> Send </button> 
              <button style={{width: "80px", height: "40px", backgroundColor: "transparent", border: "#c1c1c1 1px solid", color: "#000000", fontSize: "16px", marginRight: "15px"}}> Receive </button> 
              <img style={{width: "30px"}} src={iconPreference}/>
              

            </div> */}
          </div>
      );
  }
}

WalletItem.propTypes = {
  settingWallet: PropTypes.any,
  wallet: PropTypes.object,  
  onWarningClick: PropTypes.func,
  onAddressClick: PropTypes.func,
  isSortable: PropTypes.any,
  onItemClick: PropTypes.func,
  onMoreClick: PropTypes.func,
};
export default injectIntl(WalletItem);
