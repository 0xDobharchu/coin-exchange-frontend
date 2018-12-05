import React from 'react';
import LabelLang from 'src/lang/components/LabelLang';

const isRequired = message => value => (value && value.toString().trim().length > 0 ? undefined : message || <LabelLang id="app.common.required" />);

export default isRequired;
