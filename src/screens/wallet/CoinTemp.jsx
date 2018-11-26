import React from 'react';
import { Col } from 'react-bootstrap';
import {Bitcoin} from 'src/services/Wallets/Bitcoin.js' 
import {Ethereum} from 'src/services/Wallets/Ethereum.js' 
import iconChecked from 'src/assets/images/wallet/icons/icon-checked-wallet.svg';



import PropTypes from 'prop-types';
import style from './Wallet.scss';

class CoinTemp extends React.Component {

    isMainnet(wallet){
        return [Ethereum.Network.Mainnet, Bitcoin.Network.Mainnet].indexOf(wallet.network) > -1;
    }

    
    render(){ 
        const {wallet, onClick} =  this.props;        
        const bgImg = require("src/assets/images/wallet/images/" + wallet.getBackgroundImg());
        const itemSelected = wallet.default ? `${style['feed']} ${style['feed-selected']}` : style["feed"];
        const checkIcon = wallet.default ? " ✔" : '';
        return  ( 
            <Col sm={12} md={6} xs={12} className={style.walletBoxAddNew}>              
              <div onClick={onClick}  className={itemSelected} style={{backgroundImage: "url('"+bgImg+"')"}}>
                <span className={style.name}>{wallet.getNetworkName() + " (" + wallet.name + ")" + checkIcon}</span>                 
                
                {/* {wallet.default ? <img className={style.iconChecked} src={iconChecked}/> : ''} */}
                
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