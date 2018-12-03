import React from 'react';
import { LabelLang } from 'src/lang/components';
import { getLanguages } from 'src/screens/auth/redux/api';
import dropdownField from 'src/components/core/form/fields/dropdown';
import { Field } from 'redux-form';
import style from './style.scss';

class DropDownLanguageField extends React.Component {
  state = { languages: [] }
  componentDidMount() {
    getLanguages().then(r => {
      const languages = Object.keys(r).map(value => ({ value, label: r[value] }));
      this.setState({ languages });
    }).catch(err =>err);
  }

  render() {
    const { languages } = this.state;
    return (
      <Field
        name="language"
        component={dropdownField}
        list={languages}
      />
    );
  }
}

const Language = () => (
  <div className={style.container}>
    <div className={style.col2}>
      <div className={style.col2_1}><LabelLang id="me.accountInfo.language" /></div>
      {/* <div className={style.col2_2}>This name will be shown in your preview</div> */}
    </div>
    <div className={style.col3}>
      <input type="text" />
    </div>
  </div>
);

export const LanguageField = () => (
  <div className={style.container}>
    <div className={style.col2}>
      <div className={style.col2_1}><LabelLang id="me.accountInfo.language" /></div>
      {/* <div className={style.col2_2}>This name will be shown in your preview</div> */}
    </div>
    <div className={style.col3}>
      <DropDownLanguageField />
    </div>
  </div>
);

export default Language;
