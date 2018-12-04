import { FAIL_DEFAULT_LANGUAGE } from 'src/resources/constants/languages';

const mockState = {
  token: '',
  profile: {
    email: '',
    phone: '',
    idVerificationLevel: 0,
    verified: 1,
    name: '',
    language: FAIL_DEFAULT_LANGUAGE,
    country: '',
    currency: '',
    phone_number: '',
    id_type: '',
    id_number: '',
    back_image: '',
    front_image: '',
    selfie_image: '',
    verification_level: '',
    verification_status: '',
    wallet: '',
    security_2fa: false,
    payment_info: null,
  },
  history: {
    transactions: [],
    count: 0
  },
  referrals: []
};

export default (state = mockState, { type, payload, data }) => {
  switch (type) {
    case 'GET_PROFILE':
      return {
        ...state,
        profile: {
          ...state.profile,
          ...payload
        }
      };
    case 'UPDATE_AUTH_STATE':
      return {
        ...state,
        ...payload
      };
    case 'SCREENS/LOGIN/PROFILE_SUCCESS':
    case 'UPDATE_PROFILE_INFO':
      return {
        ...state,
        profile: {
          ...state.profile,
          ...(payload || data),
          payment_info: payload && payload.payment_info ? JSON.parse(payload.payment_info) : {}
        }
      };
    case 'GET_TRANSACTIONS':
      return {
        ...state,
        history: payload
      };
    case 'GET_REFERRALS':
      return {
        ...state,
        referrals: []
      };
    default:
      return state;
  }
};
