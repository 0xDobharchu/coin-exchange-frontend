/**
 * MultiLanguage Component.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// action
import { setLanguage } from '@/screens/app/redux/action';
// style
import cx from 'classnames';
import styles from './styles.scss';
import { changeLang } from '@/lang/action';

const LANGUAGES = {
  EN: {
    code: 'en',
    name: '🇺🇸 English',
  },
  VN: {
    code: 'vi',
    name: '🇻🇳 Tiếng Việt',
  },
};

class ChangeLanguage extends React.PureComponent {
  constructor(props) {
    super(props);
    // bind
    this.changeCountry = ::this.changeCountry;
  }

  getOtherLang() {
    const { locale } = this.props;
    if (locale === 'vi') {
      return LANGUAGES.EN;
    }
    return LANGUAGES.VN;
  }

  changeCountry(locale) {
    this.props.setLanguage(locale, true);
    this.props.changeLang(locale);
  }

  render() {
    const otherLang = this.getOtherLang();
    const { className } = this.props;
    return (
      <div className={cx(styles.changeLanguageContainer, className)}>
        <span className={styles.countryName} onClick={() => this.changeCountry(otherLang.code)} onKeyPress={() => this.changeCountry(otherLang.code)} role="button" tabIndex={0}>
          {otherLang.name}
        </span>
      </div>
    );
  }
}

ChangeLanguage.propTypes = {
  className: PropTypes.string,
  setLanguage: PropTypes.func.isRequired,
  // locale: PropTypes.string.isRequired,
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
});

export default connect(mapState, mapDispatch)(ChangeLanguage);
