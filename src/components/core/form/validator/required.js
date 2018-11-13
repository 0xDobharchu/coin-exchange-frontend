const required = value => (value && value.toString().trim().length > 0 ? undefined : 'Required');
export default required;
