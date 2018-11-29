import { API_URL } from 'src/resources/constants/url';
import http from 'src/utils/http';
import currentUser from 'src/utils/authentication';

export const fetchProfile = async () => {
  try {
    const options = {
      url : '/user/profile/',
      method: 'GET',
    };
    if(currentUser.isLogin()) {
      options.headers = {Authorization: 'Bearer ' + currentUser.getToken() };
    }
    const res = await http(options);
    return res;
  } catch (err) {
    console.log('ERROR GET PROFILE', err);
    return null;
  }
};

export const sendEmailVerify = async () => {
  try {
    const options = {
      url : '/user/verify-email/',
      method: 'POST',
    };
    if(currentUser.isLogin()) {
      options.headers = {Authorization: 'Bearer ' + currentUser.getToken() };
    }
    const res = await http(options);
    return res;
  } catch (err) {
    console.log('sendEmailVerify', err);
    return false;
  }
};

export const sendEmailVerifyCode = async (code) => {
  try {
    const options = {
      url : `/user/verify-email/?code=${code}`,
      method: 'PUT',
    };
    if(currentUser.isLogin()) {
      options.headers = {Authorization: 'Bearer ' + currentUser.getToken() };
    }
    const res = await http(options);
    return res;
  } catch (err) {
    console.log('sendEmailVerifyCode', err);
    return false;
  }
};

export const updateProfile = async (data) => {
  try {
    const options = {
      url : '/user/profile/',
      method: 'PATCH',
      data
    };
    if(currentUser.isLogin()) {
      options.headers = {Authorization: 'Bearer ' + currentUser.getToken() };
    }
    const res = await http(options);
    return res;
  } catch (err) {
    console.log('ERROR update phone number', err);
    return null;
  }
};

export const changePassword = async (data) => {
  try {
    const options = {
      url : '/user/change-password/',
      method: 'POST',
      data
    };
    if(currentUser.isLogin()) {
      options.headers = {Authorization: 'Bearer ' + currentUser.getToken() };
    }
    const res = await http(options);
    return res;
  } catch (err) {
    console.log('ERROR update phone number', err);
    throw err;
  }
};

export const getTransactions = async () => {
  try {
    const options = {
      url : '/exchange/orders/?direction=buy',
      method: 'GET'
    };
    if(currentUser.isLogin()) {
      options.headers = {Authorization: 'Bearer ' + currentUser.getToken() };
    }
    const res = await http(options);
    return res;
  } catch (err) {
    console.log('ERROR update phone number', err);
    throw err;
  }
};

export const sendToGetPhoneCode = async (data) => {
  try {
    const options = {
      url : '/user/verify-phone/',
      method: 'POST',
      data
    };
    if(currentUser.isLogin()) {
      options.headers = {Authorization: 'Bearer ' + currentUser.getToken() };
    }
    const res = await http(options);
    return res;
  } catch (err) {
    console.log('ERROR get smscode  phone number', err);
    return null;
  }
};

export const submitVerifyPhoneCode = async (code) => {
  try {
    const options = {
      url : `/user/verify-phone/?code=${code}`,
      method: 'PUT',
    };
    if(currentUser.isLogin()) {
      options.headers = {Authorization: 'Bearer ' + currentUser.getToken() };
    }
    const res = await http(options);
    return res;
  } catch (err) {
    console.log('ERROR get smscode  phone number', err);
    return null;
  }
};

/**
 *
 * @param {*} data
 * id_number
 * id_type
 * front_image
 * back_image
 */
export const submitIdCard = async (data) => {
  try {
    const options = {
      url : 'user/verify-id/',
      method: 'POST',
      data
    };
    if(currentUser.isLogin()) {
      options.headers = {Authorization: 'Bearer ' + currentUser.getToken() };
    }
    const res = await http(options);
    return res;
  } catch (err) {
    console.log('ERROR get smscode  phone number', err);
    return null;
  }
};

export const submitSelfie = async (data) => {
  try {
    const options = {
      url : 'user/verify-selfie/',
      method: 'POST',
      data
    };
    if(currentUser.isLogin()) {
      options.headers = {Authorization: 'Bearer ' + currentUser.getToken() };
    }
    const res = await http(options);
    return res;
  } catch (err) {
    console.log('ERROR get smscode  phone number', err);
    return null;
  }
};

// /api/user/two-fa/
export const getTwoFactorCode = async () => {
  try {
    const options = {
      url : '/user/two-fa/',
      method: 'POST',
    };
    if(currentUser.isLogin()) {
      options.headers = {Authorization: 'Bearer ' + currentUser.getToken() };
    }
    const res = await http(options);
    return res;
  } catch (err) {
    console.log('ERROR update phone number', err);
    throw err;
  }
};

// /api/user/two-fa/
export const sendTwoFactorCode = async (code) => {
  try {
    const options = {
      url : '/user/two-fa/',
      method: 'PUT',
    };
    if(currentUser.isLogin()) {
      options.headers = {
        Authorization: 'Bearer ' + currentUser.getToken(),
        'TwoFa': code
      };
    }
    const res = await http(options);
    return res;
  } catch (err) {
    console.log('ERROR update phone number', err);
    throw err;
  }
};

// /api/user/two-fa/
export const disableTwoFactorCode = async (code) => {
  try {
    const options = {
      url : '/user/two-fa/',
      method: 'DELETE',
    };
    if(currentUser.isLogin()) {
      options.headers = {
        Authorization: 'Bearer ' + currentUser.getToken(),
        'TwoFa': code
      };
    }
    const res = await http(options);
    return res;
  } catch (err) {
    console.log('ERROR update phone number', err);
    throw err;
  }
};

export const getCountries = async () => {
  try {
    const options = {
      url : API_URL.SYSTEM.COUNTRY,
      method: 'GET',
    };
    if(currentUser.isLogin()) {
      options.headers = {
        Authorization: 'Bearer ' + currentUser.getToken()
      };
    }
    const res = await http(options);
    return res;
  } catch (err) {
    console.log('ERROR get countries', err);
    return [];
  }
};

export const getLanguages = async () => {
  try {
    const options = {
      url : API_URL.SYSTEM.GET_LANGUAGES,
      method: 'GET',
    };
    if(currentUser.isLogin()) {
      options.headers = {
        Authorization: 'Bearer ' + currentUser.getToken()
      };
    }
    const res = await http(options);
    return res;
  } catch (err) {
    console.log('ERROR get languages', err);
    return [];
  }
};
