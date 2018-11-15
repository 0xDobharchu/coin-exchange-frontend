
const mockState = {
  token: '3Spjg41uj3CTsH9ts77AaVnyfOAHOjtqRzC9ZIUyv_AU5nKO_PK5DIgJ8A==',
  profile: {
    email: 'vankhoa@autonomous.nyc',
  }
};

export default (state = mockState, { type, payload }) => {
  switch (type) {
    case 'UPDATE_AUTH_STATE':
      return {
        ...state,
        ...payload
      };
    default:
      return state;
  }
};
