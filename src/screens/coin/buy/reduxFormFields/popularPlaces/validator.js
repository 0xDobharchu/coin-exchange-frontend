import React from 'react';
import LabelLang from 'src/lang/components/LabelLang';

export default (values = {}) => {
  const { value, isValid, term } = values;
  if (!term) {
    return <LabelLang id="app.common.required" />;
  } else if (!value || !isValid) {
    return <LabelLang id="coin.components.popularPlace.invalidPlace" />;
  }
  return undefined;
};
