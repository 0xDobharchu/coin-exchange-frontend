import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import qs from 'querystring';
import { initApp } from 'src/screens/app/redux/action';
// import I18n from '@/components/App/I18n';
import IntlCustomProvider from 'src/lang';
// import Handle from './Handle';
// styles
// import '@/styles/main';
// import '@/styles/custom-icons/styles.css';
import Layout from 'src/screens/app/components/Layout';

class Root extends React.Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
    initApp: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const querystring = window.location.search.replace('?', '');
    const querystringParsed = qs.parse(querystring);
    const { language, ref } = querystringParsed;
    // eslint-disable-next-line
    this.props.initApp(language, ref);
  }

  render() {
    // eslint-disable-next-line
    if (this.props.app.rootLoading) return null;
    // eslint-disable-next-line
    console.log('lfkajsdlfkjaslfkjasdlfkjasldfkjalsdkfj', this.props);
    return (
      <IntlCustomProvider>
        <Layout {...this.props}>
          {this.props.children}
        </Layout>
      </IntlCustomProvider>
    );
  }
}

export default connect(state => ({
  app: state.app,
  router: state.router,
}), { initApp })(Root);
