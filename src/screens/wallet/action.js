import { makeRequest } from 'src/redux/action';
import { API_URL } from 'src/resources/constants/url';
import { GET_WALLET } from './type';
import { MasterWallet } from '@/services/Wallets/MasterWallet';

export const userWallet = () => (dispatch) => {
  const getWallet = makeRequest({
    type: GET_WALLET,
    
    url: API_URL.USER.USER_WALLET,
  }, dispatch);
  return getWallet().then((res) => {    
    if (res.wallet){
      let wallets =  JSON.parse(res.wallet);
      let listWallet = [];
      wallets.forEach((walletJson) => {
        const wallet = MasterWallet.convertObject(walletJson);
        if (wallet != false) {
          listWallet.push(wallet);
        }
      });
      return listWallet;
    }    
    else [];
  }, (err) => {
    console.log(err);
    alert(err.message);
    return false;
  });
};
