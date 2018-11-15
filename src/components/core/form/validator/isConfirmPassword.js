const isConfirmPassword = (confirm, message) => value => (value && value !== confirm ? message || 'Confirm password not match' : undefined);
export default isConfirmPassword;
