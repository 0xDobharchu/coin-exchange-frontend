import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import qs from 'querystring';
import { initApp, getCountryCurrency, getSupportCountry } from 'src/screens/app/redux/action';
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
    if (prevProps.ipInfo?.country !== this.props.ipInfo?.country) {
      this.props.ipInfo?.country && this.props.getCountryCurrency(this.props.ipInfo?.country);
    }
  }

  componentDidMount() {
    const querystring = window.location.search.replace('?', '');
    const querystringParsed = qs.parse(querystring);
    const { language, ref } = querystringParsed;
    // eslint-disable-next-line
    this.props.initApp(language, ref);
    this.props.getSupportCountry();
  }

  render() {
    return (
      <IntlCustomProvider>
        <Layout {...this.props}>
          {this.props.children}
          <BarcodeScanner />
        </Layout>
      </IntlCustomProvider>
    );
  }
}

export default connect(state => ({
  app: state.app,
  ipInfo: state.app.ipInfo,
  router: state.router,
}), { initApp, getCountryCurrency, getSupportCountry })(Root);
