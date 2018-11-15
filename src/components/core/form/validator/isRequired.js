const isRequired = message => value => (value && value.toString().trim().length > 0 ? undefined : message || 'Required');

export default isRequired;
