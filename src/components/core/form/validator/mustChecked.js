const mustChecked = (message, requiredValue) => value => ((!requiredValue && value !== true) || requiredValue !== value) ? message || 'Invalid email address' : undefined;

export default mustChecked;
