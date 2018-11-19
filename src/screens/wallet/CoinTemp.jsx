import React from 'react';
import { Col } from 'react-bootstrap';
import {Bitcoin} from '@/services/Wallets/Bitcoin.js' 
import {Ethereum} from '@/services/Wallets/Ethereum.js' 
import iconChecked from '@/assets/images/wallet/icons/icon-checked-wallet.svg';



import PropTypes from 'prop-types';
import style from './Wallet.scss';

class CoinTemp extends React.Component {

    isMainnet(wallet){
        return [Ethereum.Network.Mainnet, Bitcoin.Network.Mainnet].indexOf(wallet.network) > -1;
    }

    
    render(){ 
        const {wallet, onClick} =  this.props;        
        const bgImg = require("@/assets/images/wallet/images/" + wallet.getBackgroundImg());
        const itemSelected = wallet.default ? "feed feed-selected" : "feed";

        return  ( 
            <Col sm={6} md={6} xs={6} className={style.walletBoxAddNew}>              
              <div onClick={onClick}  className={itemSelected} style={{backgroundImage: "url('"+bgImg+"')"}}>
                <span className={style.name}>{wallet.getNetworkName() + " (" + wallet.name + ")"}</span>                 
                
                {wallet.default ? <img className={style.iconChecked} src={iconChecked}/> : ''}
                
              </div>        
            </Col>
          );
    }
}
    
CoinTemp.propTypes = {    
    wallet: PropTypes.object, 
    onClick: PropTypes.func,    
};
export default CoinTemp;