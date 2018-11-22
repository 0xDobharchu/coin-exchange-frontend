import { 
  fetchProfile, sendEmailVerifyCode, updateProfile, sendToGetPhoneCode, submitVerifyPhoneCode, submitIdCard, submitSelfie
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
  updateProfile({ phone_number }).then(r => {
    if (!r) return;
    dispatch({ type: 'UPDATE_PROFILE_INFO', payload: { phone_number, verification_level: 'level_2', verification_status: 'pending' }});
    sendToGetPhoneCode().then(r => r).catch(err=>err);
    resolve(true);
  }).catch(err => reject(err));
});
export const updateProfileAction = (data) => (dispatch) => new Promise((resolve, reject) => {
  // dispatch({ type: 'UPDATE_PROFILE_INFO', payload: { phone_number }});
  updateProfile(data).then(payload => {
    if (!payload) return;
    dispatch({ type: 'UPDATE_PROFILE_INFO', payload });
    sendToGetPhoneCode().then(r => r).catch(err=>err);
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

