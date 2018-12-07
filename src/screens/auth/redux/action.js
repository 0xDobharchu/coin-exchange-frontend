import {
  fetchProfile, sendEmailVerifyCode, updateProfile, sendToGetPhoneCode, submitVerifyPhoneCode, submitIdCard, submitSelfie,
  getTransactions, getReferrals, cancelTransaction
} from './api';

export const getProfileAction = () => (dispatch) => new Promise((resolve, reject) => {
  fetchProfile().then(payload => {
    if (!payload) resolve(null);
    dispatch({ type: 'UPDATE_PROFILE_INFO', payload });
    resolve(payload);
  }).catch(err=>reject(err));
});

export const sendEmailVerifyCodeAction = (code) => (dispatch) => new Promise((resolve, reject) => {
  sendEmailVerifyCode(code).then(payload => {
    if (!payload) resolve(null);
    dispatch({ type: 'UPDATE_PROFILE_INFO', payload });
    resolve(payload);
  }).catch(err=>reject(err));
});

export const updatePhoneNumberAction = (phone_number) => (dispatch) => new Promise((resolve, reject) => {
  // dispatch({ type: 'UPDATE_PROFILE_INFO', payload: { phone_number }});
  updateProfile({ phone_number }).then(payload => {
    if (!payload) return;
    dispatch({ type: 'UPDATE_PROFILE_INFO', payload });
    sendToGetPhoneCode({ phone_number }).then(r => resolve(r)).catch(err=>reject(err));
  }).catch(err => reject(err));
});
export const updateProfileAction = (data) => (dispatch) => new Promise((resolve, reject) => {
  // dispatch({ type: 'UPDATE_PROFILE_INFO', payload: { phone_number }});
  updateProfile(data).then(payload => {
    if (!payload) return;
    dispatch({ type: 'UPDATE_PROFILE_INFO', payload });
    // sendToGetPhoneCode().then(r => r).catch(err=>err);
    resolve(true);
  }).catch(err => reject(err));
});

export const submitPhoneCodeAction = (code) => (dispatch) => new Promise((resolve, reject) => {
  submitVerifyPhoneCode(code).then(payload => {
    if (!payload) return;
    console.log('after submit code', payload);
    dispatch({ type: 'UPDATE_PROFILE_INFO', payload });
    resolve(true);
  }).catch(err => reject(err));
});

export const submitVerifyLevel3Action = (data) => (dispatch) => {
  submitIdCard(data).then(payload => {
    if (!payload) return;
    console.log('after verify level 3', payload);
    dispatch({ type: 'UPDATE_PROFILE_INFO', payload });
  }).catch(err =>err);
};

export const submitVerifyLevel4Action = (data) => (dispatch) => {
  submitSelfie(data).then(payload => {
    if (!payload) return;
    console.log('after verify level 4', payload);
    dispatch({ type: 'UPDATE_PROFILE_INFO', payload });
  }).catch(err =>err);
};

export const getTransactionsAction = () => (dispatch) => new Promise((resolve, reject) => {
  getTransactions().then(r => {
    if (!r) return;
    const payload = {
      count: r.count,
      transactions: r.results
    };
    dispatch({ type: 'GET_TRANSACTIONS', payload });
    resolve(true);
  }).catch(err => reject(err));
});

export const getReferralsAction = () => (dispatch) => new Promise((resolve, reject) => {
  getReferrals().then(payload => {
    dispatch({ type: 'GET_REFERRALS', payload });
    resolve(true);
  }).catch(err => reject(err));
});

export const cancelTransactionAction = (id) => (dispatch) => new Promise((resolve, reject) => {
  cancelTransaction(id).then(r => {
    // if (!payload) return;
    // dispatch({ type: 'UPDATE_TRANSACTION', payload });
    if (!r) return;
    const payload = {
      count: r.count,
      transactions: r.results
    };
    dispatch({ type: 'GET_TRANSACTIONS', payload });
    resolve(true);
  }).catch(err => reject(err));
});