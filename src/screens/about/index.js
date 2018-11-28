import React from 'react';
import { makeRequest } from 'src/redux/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { API_URL } from 'src/resources/constants/url';
import style from './style.scss';
// import cx from 'classnames';
// const aboutHTML = '<h2>Contact us</h2><br />Shanzhai Limited is a technology company founded in 2015 based in Hong Kong. Working in e-commerce field, we aimed at providing customers satisfying experience in purchasing online. To follow growing trend towards crypto, Shanzhai has made a leap into crypto area by launching a new crypto online exchange named CoinBowl.<br /><br />Coinbowl.com is a new crypto exchange specifically designed for people living in Asia, who have had limited access to crypto markets. CoinBowl enables users to trade large amounts of crypto at great prices. Users can buy or sell an uncapped quantity of crypto with 1 price for 1 order.<br /><br />This movement is expected to continue our run of success in other fields and transform Shanzhai into a diversified investment company. We also have offices in New York, California, Jakarta and Phnom Penh.<br /><br />COMPANY INFO:<br />Name: Shanzhai Limited<br />Mailing Address: Flat A, 18/F, 88 Commercial Building, 28-34 Wing Lok Street, Sheung Wan, Hong Kong<br />';


class About extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: '',
    };
  }

  componentDidMount() {
    this.props.getAbout({
      type: 'SCREENS/ABOUT',
      url: API_URL.LANDING.STATIC_PAGE,
      params: { language: this.props.locale, page: 'about_us' },
      withAuth: false,
      onSuccess: (data) => {
        this.setState({ data: data.content });
      },
      onError: (err) => {
        console.log(err);
      }
    });
  }

  render() {
    return (
      <div className="container">
        <div className={style.contactWrap + ' ' + 'row justify-content-md-center'}>
          <div dangerouslySetInnerHTML={{ __html: this.state.data }} />
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  locale: state ?.app.locale || 'en',
});

const mapDispatch = dispatch => ({
  getAbout: bindActionCreators(makeRequest, dispatch),
});

const connectedContactPage = connect(mapState, mapDispatch)(About);
export default connectedContactPage;
