export default (values = {}) => {
  const { address, currency } = values;
  if (!address || !currency) {
    return 'Required';
  }
  return undefined;
};