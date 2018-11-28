const isNickName = message => value => (value && !/^[A-Z0-9._%+-]{3,30}$/i.test(value)
  ? message || 'Invalid nickname' : undefined);

export default isNickName;
