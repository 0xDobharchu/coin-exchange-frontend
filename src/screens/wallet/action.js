import { makeRequest } from 'src/redux/action';
import { API_URL } from 'src/resources/constants/url';
import { WALLET } from './type';
import { MasterWallet } from '@/services/Wallets/MasterWallet';

export const userWallet = () => (dispatch) => {
  
  const getWallet = makeRequest({
    type: WALLET,    
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
    else return [];
  }, (err) => {
    console.log(err);
    alert(err.message);
    return false;
  });
};

export const makeSaveWallet = masterWallet => (dispatch) => {

  const setWallet = makeRequest({
    type: WALLET,
    url: API_URL.USER.USER_WALLET,
    method: 'PUT',
    data: {wallet: JSON.stringify(masterWallet)}
  }, dispatch);

  console.log("masterWallet...", masterWallet);
  
  return setWallet().then(() => {    
    return true;
  }, (err) => {
    console.log(err);
    alert(err.message);
    return false;
  });
};

