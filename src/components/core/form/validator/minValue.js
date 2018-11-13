const minValue = min => value => (value && value < min ? `Must greater than ${min}` : undefined);
export default minValue;
