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
      languages: []
    };

    // bind
    this.changeLanguage = ::this.changeLanguage;
    this.getlanguages = this.getlanguages.bind(this);
  }

  componentDidUpdate(prevProps) {
    if(prevProps.supportedLanguages !== this.props.supportedLanguages) {
      this.getlanguages();
    }
  }

  componentDidMount() {
    const { locale } = this.props;

    this.props.change(chooseLanguageFormName, 'language', locale);
    this.getlanguages();
  }

  getlanguages() {
    if(!this.props.supportedLanguages){
      return ;
    }
    const languages = Object.entries(this.props.supportedLanguages).map(([key, val]) => {
      // const lang = LANGUAGES[key];
      return {
        key: key,
        label: `${val}`,
        value: key
      };
    });

    this.setState({languages} );

  }

  changeLanguage(e, newValue) {
    console.log('changeLanguage', newValue);
    this.props.changeLang(newValue);
  }

  render() {
    const { className, locale } = this.props;
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
  locale: PropTypes.string.isRequired,
};

ChangeLanguage.defaultProps = {
  className: '',
};

const mapState = state => ({
  locale: state.langReducer.lang || 'en',
  supportedLanguages: state.app.supportedLanguages
});

const mapDispatch = ({
  changeLang,
  change,
});

export default connect(mapState, mapDispatch)(ChangeLanguage);
