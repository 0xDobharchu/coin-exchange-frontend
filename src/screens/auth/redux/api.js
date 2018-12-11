import { API_URL } from 'src/resources/constants/url';
import http from 'src/utils/http';
import currentUser from 'src/utils/authentication';

export const fetchProfile = async () => {
  try {
    const options = {
      url : API_URL.ME.PROFILE,
      method: 'GET',
    };
    if(currentUser.isLogin()) {
      options.headers = {Authorization: 'Bearer ' + currentUser.getToken() };
    }
    const res = await http(options);
    return res;
  } catch (err) {
    console.log('ERROR fetchProfile', err);
    return null;
  }
};

export const sendEmailVerify = async () => {
  try {
    const options = {
      url : API_URL.ME.VERIFY_EMAIL,
      method: 'POST',
    };
    if(currentUser.isLogin()) {
      options.headers = {Authorization: 'Bearer ' + currentUser.getToken() };
    }
    const res = await http(options);
    return res;
  } catch (err) {
    console.log('ERROR sendEmailVerify', err);
    return false;
  }
};

export const sendEmailVerifyCode = async (code) => {
  try {
    const options = {
      url : `${API_URL.ME.VERIFY_EMAIL}?code=${code}`,
      method: 'PUT',
    };
    if(currentUser.isLogin()) {
      options.headers = {Authorization: 'Bearer ' + currentUser.getToken() };
    }
    const res = await http(options);
    return res;
  } catch (err) {
    console.log('ERROR sendEmailVerifyCode', err);
    return false;
  }
};

export const updateProfile = async (data) => {
  try {
    const options = {
      url : API_URL.ME.PROFILE,
      method: 'PATCH',
      data
    };
    if(currentUser.isLogin()) {
      options.headers = {Authorization: 'Bearer ' + currentUser.getToken() };
    }
    const res = await http(options);
    return res;
  } catch (err) {
    console.log('ERROR updateProfile', err);
    return null;
  }
};

export const changePassword = async (data) => {
  try {
    const options = {
      url : API_URL.ME.CHANGE_PASSWORD,
      method: 'POST',
      data
    };
    if(currentUser.isLogin()) {
      options.headers = {Authorization: 'Bearer ' + currentUser.getToken() };
    }
    const res = await http(options);
    return res;
  } catch (err) {
    console.log('ERROR changePassword', err);
    throw err;
  }
};

export const getTransactions = async () => {
  try {
    const options = {
      url : API_URL.ME.EXCHANGE_ORDERS,
      method: 'GET'
    };
    if(currentUser.isLogin()) {
      options.headers = {Authorization: 'Bearer ' + currentUser.getToken() };
    }
    const res = await http(options);
    return res;
  } catch (err) {
    console.log('ERROR getTransactions', err);
    throw err;
  }
};

export const sendToGetPhoneCode = async (data) => {
  try {
    const options = {
      url : API_URL.ME.VERIFY_PHONE,
      method: 'POST',
      data
    };
    if(currentUser.isLogin()) {
      options.headers = {Authorization: 'Bearer ' + currentUser.getToken() };
    }
    const res = await http(options);
    return res;
  } catch (err) {
    console.log('ERROR sendToGetPhoneCode', err);
    throw err;
  }
};

export const submitVerifyPhoneCode = async (code) => {
  try {
    const options = {
      url : `${API_URL.ME.VERIFY_PHONE}?code=${code}`,
      method: 'PUT',
    };
    if(currentUser.isLogin()) {
      options.headers = {Authorization: 'Bearer ' + currentUser.getToken() };
    }
    const res = await http(options);
    return res;
  } catch (err) {
    console.log('ERROR submitVerifyPhoneCode', err);
    throw err;
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
      url : API_URL.ME.VERIFY_IDCARD,
      method: 'POST',
      data
    };
    if(currentUser.isLogin()) {
      options.headers = {Authorization: 'Bearer ' + currentUser.getToken() };
    }
    const res = await http(options);
    return res;
  } catch (err) {
    console.log('ERROR submitIdCard', err);
    return null;
  }
};

export const submitSelfie = async (data) => {
  try {
    const options = {
      url : API_URL.ME.VERIFY_SELFIE,
      method: 'POST',
      data
    };
    if(currentUser.isLogin()) {
      options.headers = {Authorization: 'Bearer ' + currentUser.getToken() };
    }
    const res = await http(options);
    return res;
  } catch (err) {
    console.log('ERROR submitSelfie', err);
    return null;
  }
};

// /api/user/two-fa/
export const getTwoFactorCode = async () => {
  try {
    const options = {
      url : API_URL.ME.TWO_FACTOR,
      method: 'POST',
    };
    if(currentUser.isLogin()) {
      options.headers = {Authorization: 'Bearer ' + currentUser.getToken() };
    }
    const res = await http(options);
    return res;
  } catch (err) {
    console.log('ERROR getTwoFactorCode', err);
    throw err;
  }
};

// /api/user/two-fa/
export const sendTwoFactorCode = async (code) => {
  try {
    const options = {
      url : API_URL.ME.TWO_FACTOR,
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
    console.log('ERROR sendTwoFactorCode', err);
    throw err;
  }
};

// /api/user/two-fa/
export const disableTwoFactorCode = async (code) => {
  try {
    const options = {
      url : API_URL.ME.TWO_FACTOR,
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
    console.log('ERROR disableTwoFactorCode', err);
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
    console.log('ERROR getCountries', err);
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
    console.log('ERROR getLanguages', err);
    return [];
  }
};

export const getCurrenciesByCountry = async (country) => {
  try {
    const options = {
      url : `${API_URL.SYSTEM.GET_COUNTRY_CURRENCY}?country=${country}`,
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
    console.log('ERROR getCurrenciesByCountry', err);
    return [];
  }
};

export const getReferrals = async () => {
  try {
    const options = {
      url : API_URL.ME.REFERRALS,
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
    console.log('ERROR getReferrals', err);
    return [];
  }
};

export const uploadFile = async (file, type = 'verification') => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const options = {
      url : `${API_URL.ME.FILE_UPLOAD}?type=${type}`,
      method: 'POST',
      data: formData,
    };
    if(currentUser.isLogin()) {
      options.headers = {
        Authorization: 'Bearer ' + currentUser.getToken(),
        'Content-type': 'multipart/form-data'
      };
    }
    const res = await http(options);
    return res;
  } catch (err) {
    console.log('ERROR uploadFile', err);
    return [];
  }
};

export const cancelTransaction = async (id) => {
  try {
    const options = {
      url : API_URL.ME.EXCHANGE_ORDERS + id,
      method: 'DELETE',
    };
    if(currentUser.isLogin()) {
      options.headers = {
        Authorization: 'Bearer ' + currentUser.getToken()
      };
    } 
    await http(options);
    const res =  await getTransactions();
    return res;
  } catch (err) {
    console.log('ERROR cancelTransaction', err);
    throw err;
  }
};

export const getAccountLevelByCurrency = async (currency) => {
  try {
    const options = {
      url : `${API_URL.ME.CURRENCY_LEVEL_LIMIT}?currency=${currency}`,
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
    console.log('ERROR getAccountLevelByCurrency', err);
    throw err;
  }
};