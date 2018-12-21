import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import qs from 'querystring';
import { initApp, getCountryCurrency, getSupportCountry, getSupportLanguages, getSupportCryptoCurrencies } from 'src/screens/app/redux/action';
import { getProfileAction } from 'src/screens/auth/redux/action';
import currentUser from 'src/utils/authentication';
import PwaInstallRequest from 'src/components/pwaInstallRequest';

// import I18n from 'src/components/App/I18n';
import IntlCustomProvider from 'src/lang';
// import Handle from './Handle';
// styles
// import 'src/styles/main';
// import 'src/styles/custom-icons/styles.css';
import 'src/assets/styles/someone-fonts/light.css';
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
      getCountryCurrency(_country);
    }
  }

  componentDidMount() {
    // const querystring = window.location.search.replace('?', '');
    // const querystringParsed = qs.parse(querystring);
    // const { language, ref } = querystringParsed;
    const { getSupportCountry, getSupportLanguages, getSupportCryptoCurrencies, getProfileAction, getCountryCurrency, ipInfo: { country: countryFromIp } } = this.props;
    // initApp(language, ref);
    getSupportCountry();
    getSupportLanguages();
    getSupportCryptoCurrencies();
    getCountryCurrency(countryFromIp);
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
          <PwaInstallRequest />
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
}), { initApp, getCountryCurrency, getSupportCountry, getSupportLanguages, getProfileAction, getSupportCryptoCurrencies })(Root);
