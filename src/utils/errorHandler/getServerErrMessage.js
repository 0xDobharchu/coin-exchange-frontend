
const MAPPING = {
  /**server_code: "Message to display" */
};

const GENERAL_CODE_400 = 'Something went wrong, please try again!';

/**
 * This function will return human readable message from server error code
 * @param {Object} error 
 */
const getServerErrMessage = (error = {}) => {
  const message = MAPPING[error?.code];
  if (message) return message;

  if (error?.status === 400) {
    return GENERAL_CODE_400;
  }
};

export default getServerErrMessage;