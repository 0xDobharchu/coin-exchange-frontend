import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import qs from 'querystring';
import { initApp, getCountryCurrency, getSupportCountry, getSupportLanguages } from 'src/screens/app/redux/action';
import { getProfileAction } from 'src/screens/auth/redux/action';
import currentUser from 'src/utils/authentication';

// import I18n from 'src/components/App/I18n';
import IntlCustomProvider from 'src/lang';
// import Handle from './Handle';
// styles
// import 'src/styles/main';
// import 'src/styles/custom-icons/styles.css';
import Layout from 'src/screens/app/components/Layout';
import BarcodeScanner from 'src/components/barcodeScanner';

class Root extends React.Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
    initApp: PropTypes.func.isRequired,
  }

  componentDidUpdate(prevProps) {
    const { ipInfo: { country: countryFromIp }, profile: { country: userCountry }, getCountryCurrency } = this.props;
    if (prevProps.ipInfo?.country !== countryFromIp || prevProps.profile.country !== userCountry) {
      const _country = userCountry || countryFromIp;
      _country && getCountryCurrency(_country);
    }
  }

  componentDidMount() {
    const querystring = window.location.search.replace('?', '');
    const querystringParsed = qs.parse(querystring);
    const { language, ref } = querystringParsed;
    const { initApp, getSupportCountry, getSupportLanguages, getProfileAction } = this.props;
    initApp(language, ref);
    getSupportCountry();
    getSupportLanguages();
    if(currentUser.isLogin()) {
      getProfileAction();
    }
  }

  render() {
    const { children, ...props } = this.props;
    return (
      <IntlCustomProvider>
        <Layout {...props}>
          {children}
          <BarcodeScanner />
        </Layout>
      </IntlCustomProvider>
    );
  }
}

export default connect(state => ({
  app: state.app,
  ipInfo: state.app.ipInfo || {},
  router: state.router,
  profile: state?.auth?.profile || {}
}), { initApp, getCountryCurrency, getSupportCountry, getSupportLanguages, getProfileAction })(Root);
