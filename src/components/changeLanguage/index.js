/**
 * MultiLanguage Component.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setLanguage } from '@/screens/app/redux/action';
import cx from 'classnames';
import { change, Field } from 'redux-form';
import styles from './styles.scss';
import { changeLang } from '@/lang/action';
import dropdownField from '@/components/core/form/fields/dropdown';
import createForm from '@/components/core/form/createForm';

const LANGUAGES =[
  {
    key: 'en',
    label: '🇺🇸 English',
    value: 'en'
  },
  {
    key: 'id',
    label: '🇻🇳 Indonesia',
    value: 'id'
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
