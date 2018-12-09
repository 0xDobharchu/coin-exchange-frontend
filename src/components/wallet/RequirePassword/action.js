import { makeRequest } from 'src/redux/action';
import { API_URL } from 'src/resources/constants/url';
import { VERYFY_PASSWORD } from './type';

export const vefiryPassword = (password) => (dispatch) => {
    const makeVefiryPassword = makeRequest({
        type: VERYFY_PASSWORD,
        url: API_URL.USER.USER_VERYFY_PASSWORD,
        method: 'POST',
        data: { password }
    }, dispatch);

    return makeVefiryPassword().then((res) => {        
        return res === true
    }, (err) => {
        console.log(err);
        return false;
    });
};

export default vefiryPassword;