import { makeRequest } from 'src/redux/action';
import CoinModel from 'src/models/coin';
import { API_URL } from 'src/resources/constants/url';
import { CHECK_ADDRESS } from './type';

export const checkAddress = ({address, currency}) => dispatch => {
  const req = makeRequest({
    type: CHECK_ADDRESS,
    url: `${API_URL.COIN.CHECK_ADDRESS}?currency=${currency}&address=${address}`,
  }, dispatch);
  return req().then(res => CoinModel.checkGeneratedAddressRes(res));
};
