import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, addLocaleData } from 'react-intl';
import { connect } from 'react-redux';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import zh from 'react-intl/locale-data/zh';
import de from 'react-intl/locale-data/de';
import ja from 'react-intl/locale-data/ja';
import ko from 'react-intl/locale-data/ko';
import ru from 'react-intl/locale-data/ru';
import es from 'react-intl/locale-data/es';
import vi from 'react-intl/locale-data/vi';
import messages from './messages';
import { changeLang } from './action';


addLocaleData([...en, ...fr, ...zh, ...de, ...ja, ...ko, ...ru, ...es, ...vi]);
// let lang = 'vi';

if (!__SERVER__ && !window.Intl) {
  require.ensure([
    'intl',
    'intl/locale-data/jsonp/en.js',
    'intl/locale-data/jsonp/es.js',
    'intl/locale-data/jsonp/fr.js',
    'intl/locale-data/jsonp/it.js',
    'intl/locale-data/jsonp/zh.js',
    'intl/locale-data/jsonp/de.js',
    'intl/locale-data/jsonp/ja.js',
    'intl/locale-data/jsonp/ko.js',
    'intl/locale-data/jsonp/ru.js',
  ], (require) => {
    require('intl');
    require('intl/locale-data/jsonp/en.js');
    require('intl/locale-data/jsonp/es.js');
    require('intl/locale-data/jsonp/fr.js');
    require('intl/locale-data/jsonp/it.js');
    require('intl/locale-data/jsonp/zh.js');
    require('intl/locale-data/jsonp/de.js');
    require('intl/locale-data/jsonp/ja.js');
    require('intl/locale-data/jsonp/ko.js');
    require('intl/locale-data/jsonp/ru.js');
  });
}

// eslint-disable-next-line
const IntlCustomProvider = ({ lang, children }) => (
  <IntlProvider locale={lang} messages={messages[lang]}>
    {children}
  </IntlProvider>
);

IntlCustomProvider.defaultProps = {
  lang: 'en',
  children: {}
};

IntlCustomProvider.propsType = {
  lang: PropTypes.string.isRequired,
  children: PropTypes.object,
};

const mapState = state => ({
  lang: state.langReducer.lang || 'en'
});
const mapDispatch = { changeLang };
export default connect(mapState, mapDispatch)(IntlCustomProvider);
