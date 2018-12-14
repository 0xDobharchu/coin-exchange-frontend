import React from 'react';
import LabelLang from 'src/lang/components/LabelLang';

const isValid = value => (value && value.toString().trim().length > 3 ? undefined : <LabelLang id="app.common.required" />);

export default isValid;
