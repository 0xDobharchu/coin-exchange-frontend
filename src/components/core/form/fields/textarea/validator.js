import React from 'react';

const validator = (value = '') => {
  if (value) {
    return null;
  }
  return <span>Required</span>;
};

export default validator;
