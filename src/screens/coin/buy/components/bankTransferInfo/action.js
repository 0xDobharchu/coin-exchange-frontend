import { makeRequest } from 'src/redux/action';
import SystemConfigModel from 'src/models/system';
import { API_URL } from 'src/resources/constants/url';
import { GET_BANK_INFO, ADD_RECEIPT_ORDER } from './type';

export const getBankInfo = ({ country, currency }) => dispatch => {
  const req = makeRequest({
    withAuth: false,
    type: GET_BANK_INFO,
    url: API_URL.SYSTEM.GET_BANK_INFO,
    params: { country, currency }
  }, dispatch);
  return req().then((res = []) => {
    const found = res?.find(b => b?.currency === currency) || res[0] || {};
    return SystemConfigModel.bankInfoRes(found);
  });
};

export const addReceiptOrder = ({ receiptId, receiptImgUrl }) => dispatch => {
  const url = API_URL.COIN.ADD_RECEIPT_ORDER.replace('{order_id}', receiptId);
  const req = makeRequest({
    type: ADD_RECEIPT_ORDER,
    url,
    data: {
      receipt_url: receiptImgUrl
    },
    method: 'put'
  }, dispatch);
  return req();
};

