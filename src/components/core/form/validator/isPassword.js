const isPassword = (min, message) => value => (value && value.length < 8 ? message || `Password must be ${min || 8} characters or more` : undefined);
export default isPassword;
