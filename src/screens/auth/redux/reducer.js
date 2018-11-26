
const mockState = {
  token: '3Spjg41uj3CTsH9ts77AaVnyfOAHOjtqRzC9ZIUyv_AU5nKO_PK5DIgJ8A==',
  profile: {
    email: 'vankhoa@autonomous.nyc',
    phone: '',
    idVerificationLevel: 0,
    verified: 1,
    name: '',
    language: 'en',
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
    wallet: ''
  },
  history: {
    transactions: [],
    count: 0
  }
};

export default (state = mockState, { type, payload }) => {
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
          ...payload
        }
      };
    case 'GET_TRANSACTIONS':
      return {
        ...state,
        history: payload
      };
    default:
      return state;
  }
};
