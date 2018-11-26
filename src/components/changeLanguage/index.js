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

const LANGUAGES =[
  {
    key: 'en',
    label: '🇺🇸 English',
    value: 'en'
  },
  {
    key: 'zh-Hant-HK',
    label: '🇭🇰 Hong Kong',
    value: 'zh-Hant-HK'
  }
];

const chooseLanguageFormName = 'chooseLanguageFormName';
const ChooseLanguageForm = createForm({
  propsReduxForm: {
    form: chooseLanguageFormName,
    initialValues: {
      input: '',
    },
  },
});

class ChangeLanguage extends React.PureComponent {
  constructor(props) {
    super(props);
    // bind
    this.changeCountry = ::this.changeCountry;
  }

  componentDidMount() {
    const { locale } = this.props;

    this.props.change(chooseLanguageFormName, 'language', locale);
  }

  changeCountry(e, newValue) {
    this.props.setLanguage(newValue, true);
    this.props.changeLang(newValue);
  }

  render() {
    const { className } = this.props;
    const { locale } = this.props;
    return (
      <div className={cx(styles.changeLanguageContainer, className)}>
        <ChooseLanguageForm>
          <Field
            className={styles.changeLanguage}
            name="language"
            component={dropdownField}
            list={LANGUAGES}
            onChange={this.changeCountry}
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
});

const mapDispatch = ({
  setLanguage,
  changeLang,
  change,
});

export default connect(mapState, mapDispatch)(ChangeLanguage);
