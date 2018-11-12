const recursiveFun = (results, obj, arr = []) => {
  if (typeof obj === 'string') {
    return;
  }
  // eslint-disable-next-line
  for (const keyName of Object.keys(obj)) {
    if (typeof obj[keyName] === 'string') {
      const addKey = {};
      const getKeyName = arr.length === 0 ? keyName : `${arr.join('.')}.${keyName}`;
      addKey[getKeyName] = obj[keyName];
      // eslint-disable-next-line
      results[getKeyName] = obj[keyName];
    } else {
      recursiveFun(results, obj[keyName], arr.concat(keyName));
    }
  }
};

export const convertLongKeyValues = (obj) => {
  const endKeyValue = {};
  recursiveFun(endKeyValue, obj);
  return endKeyValue;
};
