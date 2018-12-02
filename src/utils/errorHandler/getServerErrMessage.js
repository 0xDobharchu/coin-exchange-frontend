
import React from 'react';
import LabelLang from 'src/lang/components/LabelLang';

const KEY = 'error.serverCode';

const MAPPING = {
  /**server_code: "key intl of Message to display" */
  coin_user_over_limit: 'coinUserOverLimit',
  amount_is_too_small: 'amountIsTooSmall'
};

const GENERAL_CODE_400 = `${KEY}.generalCode400`;

/**
 * This function will return human readable message from server error code
 * @param {Object} error 
 */
const getServerErrMessage = (error = {}, defaultMsg) => {
  const message = MAPPING[error?.code] && `${KEY}.${MAPPING[error?.code]}`;
  let intKey = message;
  let dom;

  if (!message && error?.status === 400) {
    intKey = GENERAL_CODE_400;
  }
  
  dom = <LabelLang id={intKey} />;
  if (typeof defaultMsg === 'string') {
    dom = <span>{defaultMsg}</span>;
  }

  if (typeof defaultMsg === 'object') {
    dom = defaultMsg;
  } 

  return {
    dom: dom,
    key: intKey
  };
};

export default getServerErrMessage;