/**
 * MultiLanguage Component.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setLanguage } from 'src/screens/app/redux/action';
import cx from 'classnames';
import { change, Field } from 'redux-form';
import { changeLang } from 'src/lang/action';
import dropdownField from 'src/components/core/form/fields/dropdown';
import createForm from 'src/components/core/form/createForm';
import styles from './styles.scss';

// const LANGUAGES = {
//   en: {
//     key: 'en',
//     label: 'English',
//     value: 'en',
//     flag: '🇺🇸',
//   },
//   hk: {
//     key: 'zh-Hant-HK',
//     label: 'Hong Kong',
//     value: 'zh-Hant-HK',
//     flag: '🇭🇰',
//   },
//   id: {
//     key: 'id',
//     label: 'Indonesia',
//     value: 'id',
//     flag: '🇮🇩'
//   },
//   km: {
//     key: 'km',
//     label: 'Cambodia',
//     value: 'km',
//     flag: '🇰🇭',
//   }
// };

const chooseLanguageFormName = 'chooseLanguageFormName';
const ChooseLanguageForm = createForm({
  propsReduxForm: {
    form: chooseLanguageFormName,
    initialValues: {
      language: '',
    },
  },
});

class ChangeLanguage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      languages: [],
      supportedLanguages: props.supportedLanguages
    };

    // bind
    this.changeLanguage = ::this.changeLanguage;
  }

  componentDidMount() {
    const { locale } = this.props;

    this.props.change(chooseLanguageFormName, 'language', locale);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (JSON.stringify(nextProps.supportedLanguages) !== JSON.stringify(prevState.supportedLanguages)) {
      const languages = Object.entries(nextProps.supportedLanguages).map(([key, val]) => {
        // const lang = LANGUAGES[key];
        return {
          key: key,
          label: `${val}`,
          value: key
        };
      });

      return { supportedLanguages: nextProps.supportedLanguages, languages };
    }

    return null;
  }

  changeLanguage(e, newValue) {
    console.log('changeLanguage', newValue);
    this.props.setLanguage(newValue, true);
    this.props.changeLang(newValue);
  }

  render() {
    const { className } = this.props;
    const { locale } = this.props;
    const { languages } = this.state;
    return (
      <div className={cx(styles.changeLanguageContainer, className)}>
        <ChooseLanguageForm>
          <Field
            className={styles.changeLanguage}
            name="language"
            component={dropdownField}
            list={languages}
            onChange={this.changeLanguage}
            value={locale}
          />
        </ChooseLanguageForm>
      </div>
    );
  }
}

ChangeLanguage.propTypes = {
  className: PropTypes.string,
  setLanguage: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
};

ChangeLanguage.defaultProps = {
  className: '',
};

const mapState = state => ({
  locale: state?.app.locale || 'en',
  supportedLanguages: state.app.supportedLanguages
});

const mapDispatch = ({
  setLanguage,
  changeLang,
  change,
});

export default connect(mapState, mapDispatch)(ChangeLanguage);
