import { makeRequest } from 'src/redux/action';
import SystemConfigModel from 'src/models/system';
import { API_URL } from 'src/resources/constants/url';
import { GET_BANK } from './type';

export const getBank = ({ country, language }) => dispatch => {
  const req = makeRequest({
    url: API_URL.SYSTEM.GET_POPULAR_BANK_BY_COUNTRY,
    params: { country, language },
    type: GET_BANK,
    withAuth: false,
  }, dispatch);
  return req().then(res => res && res.map(r => SystemConfigModel.popularBank(r)));
};
