export default (values = {}) => {
  const { amount, fiatAmount } = values;
  if (!amount || !fiatAmount) {
    return 'Required';
  }
  return undefined;
};