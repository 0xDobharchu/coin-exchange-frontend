import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, addLocaleData } from 'react-intl';
import { connect } from 'react-redux';
import en from 'react-intl/locale-data/en';
import id from 'react-intl/locale-data/id';
import km from 'react-intl/locale-data/km';
import zh from 'react-intl/locale-data/zh';
import { FAIL_DEFAULT_LANGUAGE } from 'src/resources/constants/languages';
import messages from './messages';
import { changeLang } from './action';

addLocaleData([...en, ...id, ...km, ...zh,]);
// let lang = 'vi';

if (!__SERVER__ && !window.Intl) {
  require.ensure([
    'intl',
    'intl/locale-data/jsonp/en.js',
    'intl/locale-data/jsonp/id.js',
    'intl/locale-data/jsonp/km.js',
    'intl/locale-data/jsonp/zh.js',
  ], (require) => {
    require('intl');
    require('intl/locale-data/jsonp/en.js');
    require('intl/locale-data/jsonp/id.js');
    require('intl/locale-data/jsonp/km.js');
    require('intl/locale-data/jsonp/zh.js');
  });
}

// eslint-disable-next-line
const IntlCustomProvider = ({ lang, children }) => (
  <IntlProvider locale={lang} messages={messages[lang]}>
    {children}
  </IntlProvider>
);

IntlCustomProvider.defaultProps = {
  lang: FAIL_DEFAULT_LANGUAGE,
  children: {}
};

IntlCustomProvider.propsType = {
  lang: PropTypes.string.isRequired,
  children: PropTypes.object,
};

const mapState = state => ({
  lang: state.langReducer.lang || FAIL_DEFAULT_LANGUAGE
});
const mapDispatch = { changeLang };
export default connect(mapState, mapDispatch)(IntlCustomProvider);
