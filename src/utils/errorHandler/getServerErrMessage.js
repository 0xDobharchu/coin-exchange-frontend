
const MAPPING = {
  /**server_code: "Message to display" */
  coin_user_over_limit: 'Over Coin limit',
  amount_is_too_small: 'Amount is too small'
};

const GENERAL_CODE_400 = 'Something went wrong, please try again!';

/**
 * This function will return human readable message from server error code
 * @param {Object} error 
 */
const getServerErrMessage = (error = {}, defaultMsg) => {
  const message = MAPPING[error?.code];
  if (message) return message;

  if (error?.status === 400) {
    return defaultMsg || GENERAL_CODE_400;
  }
};

export default getServerErrMessage;