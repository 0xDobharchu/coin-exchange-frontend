import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FAIL_DEFAULT_LANGUAGE } from 'src/resources/constants/languages';
import { getAboutContent } from 'src/screens/landingpage/redux/action';
// import LabelLang from 'src/lang/components/LabelLang';
// import cx from 'classnames';
import { Container, Col, Row } from 'react-bootstrap';
import styles from './styles.scss';

// const aboutHTML = '<h2>Contact us</h2><br />Shanzhai Limited is a technology company founded in 2015 based in Hong Kong. Working in e-commerce field, we aimed at providing customers satisfying experience in purchasing online. To follow growing trend towards crypto, Shanzhai has made a leap into crypto area by launching a new crypto online exchange named CoinBowl.<br /><br />Coinbowl.com is a new crypto exchange specifically designed for people living in Asia, who have had limited access to crypto markets. CoinBowl enables users to trade large amounts of crypto at great prices. Users can buy or sell an uncapped quantity of crypto with 1 price for 1 order.<br /><br />This movement is expected to continue our run of success in other fields and transform Shanzhai into a diversified investment company. We also have offices in New York, California, Jakarta and Phnom Penh.<br /><br />COMPANY INFO:<br />Name: Shanzhai Limited<br />Mailing Address: Flat A, 18/F, 88 Commercial Building, 28-34 Wing Lok Street, Sheung Wan, Hong Kong<br />';

class About extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      locale: this.props.locale,
    };
  }

  componentDidMount() {
    const { locale } = this.props;
    this.props.getAboutContent({ params: { language: locale, page: 'about_us' } });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (JSON.stringify(nextProps.locale) !== JSON.stringify(prevState.locale)) {
      const { locale } = nextProps;
      nextProps.getAboutContent({ params: { language: locale, page: 'about_us' } });

      return { locale: nextProps.locale };
    }

    return null;
  }

  render1() {

    return (
      <div className={styles.aboutContainer}>
        <Container>          
          <Row>
            <Col xs={12} md={6}>
              <div className="brief">
                <div className="title">
                  About Coinbowl
                </div>
                <div className="desc">
                  <p>
                    Coinbowl.com is a new crypto exchange specifically designed for people living in Asia, who have had limited access to crypto markets. CoinBowl enables users to trade large amounts of crypto at great prices. Users can buy or sell an uncapped quantity of crypto with 1 price for 1 order. CoinBowl is partnered with a secure payment gateway including TNG and Payoneer, accepting both cash payments and bank transfers, making transactions are equally easy on and offline. CoinBowl’s friendly, straightforward UI/UX design makes it accessible for both seasoned traders and newbies alike. We also offer delivery on demand, arranging direct payment in convenient public places like coffee shops. Especially, no fee is charged at all.
                  </p>
                  
                </div>
              </div>
            </Col>

            <Col md={6} className="brief-hongkong d-none d-sm-block">
              <Row>
                <Col> <img alt="coinbowl-hongkong" className="bg" src="https://storage.googleapis.com/coin-exchange-staging/static-pages/about-us/hongkong-map.svg" /> </Col>
              </Row>              
            </Col>

          </Row>

        </Container>

        <div className="grant">
          <Row>
            <Col xs={12} xl={7} md={12} className="col-xxl-12">
              <img alt="coinbolw" src="https://storage.googleapis.com/coin-exchange-staging/static-pages/about-us/btc-atm.png" />
            </Col>
            <Col xs={12} xl={5} md={12} className="col-xxl-12">
              <div className="grant-info">
                <div className="title"> 
                  <span className="title-gray">
                    CoinBowl’s mission is to grant Asian people a&nbsp;
                  </span>
                  <span className="title-blue">
                    direct access to crypto world
                  </span>
                </div>
                <div className="desc">
                  It is reasonable to confidently expect that cryptocurrency based on blockchain technology would be the payment method of future since it is not controlled by any government or organization.
                  <br /><br />
                  This system enabling users to transfer money to anywhere instantly at significantly low price is rebuilding global economy. Cryptocurrency is a tool that can not only improve payment system for the sake of convenience but also stimulate technological innovation in other fields. This is what we choose to make the world greater.
                </div>
              </div>
            </Col>
          </Row>
        </div>

        <Container>
          <Row className="priorities">
            <Col>
              <div className="header">CoinBowl’s Priorities</div>
            </Col>
          </Row>

          <Row className="priorities">                        
            <Col xs={12} md={6}>
              <div className="box-color">
                <div> <img alt="coinbolw" src="https://storage.googleapis.com/coin-exchange-staging/static-pages/about-us/icon-about-coinbowl.svg" /> </div>
                <div className="title">
                  Become the  <br />
                  cheapest source of crypto
                </div>
                <div className="desc">
                  We are trying utmost to give users significantly low price. As crypto market is fluctuating wildly time to time, being able to buy crypto at the most competitive price is the first priority of any investor or trader. To bring substantial benefits for our users, CoinBowl always offers the most attractive price in the market as promised.
                </div>
              </div>
            </Col>
            <Col xs={12} md={6}>
              <div className="box-color">
                <div> <img alt="coinbolw" src="https://storage.googleapis.com/coin-exchange-staging/static-pages/about-us/icon-about-hand.svg" /> </div>
                <div className="title">
                  Become the most <br />
                  convenient exchange
                </div>
                <div className="desc">
                  Cryptocurrency might be the currency of the future but this expectation can not come true unless everyone has the right to own cryptocurrency. Even in crypto supported countries, it is not much easy to buy and sell crypto. CoinBowl, with its straightforward UX/UI design, secure payment gateway and various payment method, will make trading as much convenient as possible.
                </div>
              </div>
            </Col>            
          </Row>          

          <Row className="priorities">
            <Col>
              <div className="header">CoinBowl’s Values</div>
            </Col>
          </Row>

          <Row className="priorities">
            <Col>
              <Row className="item">
                <Col md={1} className="d-none d-sm-block">
                  <div className="icon">
                    <img alt="coinbowl-icon" className="bg" src="https://storage.googleapis.com/coin-exchange-staging/static-pages/about-us/icon-brief-1.svg" />                    
                  </div>
                </Col>
                <Col md={10} xs={10} className="desc-right">
                  <div className="title-value">Effective communication</div>
                  <div className="list-item">
                    <ul className="list">
                      <li>Connecting with thecrypto community via a wide range of channels from online to offline.</li>
                      <li>Sharing precise and valuable information.</li>                      
                    </ul>
                  </div>
                </Col>
              </Row>              

              <Row className="item">
                <Col md={1} className="d-none d-sm-block">
                  <div className="icon">
                    <img alt="coinbowl-icon" className="bg" src="https://storage.googleapis.com/coin-exchange-staging/static-pages/about-us/icon-brief-2.svg" />                    
                  </div>
                </Col>
                <Col md={10} xs={10} className="desc-right">
                  <div className="title-value">Genuine sympathy</div>
                  <div className="list-item">
                    <ul className="list">
                      <li>Taking care of not only about the company, but also our customers.</li>
                      <li>Working towards feasible solutions.</li>                      
                      <li>Considering every incident as a golden opportunity to improve our product.</li>                      
                      <li>Appreciating sincerely any feedback.</li>                      
                      <li>Strengthening strong bond between us and customers via lots of promotion programs.</li>                      
                    </ul>
                  </div>
                </Col>
              </Row>

              <Row className="item">
                <Col md={1} className="d-none d-sm-block">
                  <div className="icon">
                    <img alt="coinbowl-icon" className="bg" src="https://storage.googleapis.com/coin-exchange-staging/static-pages/about-us/icon-brief-3.svg" />                    
                  </div>
                </Col>
                <Col md={10} xs={10} className="desc-right">
                  <div className="title-value">Efficient work</div>
                  <div className="list-item">
                    <ul className="list">
                      <li>Working more efficiently and smarterly rather than working harder.</li>
                      <li>Satisfying customers’ demand rather than promising.</li>                      
                      <li>Providing customers better experience over the time.</li>                                            
                    </ul>
                  </div>
                </Col>
              </Row>

            </Col>
          </Row>


        </Container>
      </div>
    );

  }

  render() {
    const { aboutContent } = this.props;
    return (
      <div className={styles.aboutContainer}>
        {aboutContent && (
          <div dangerouslySetInnerHTML={{ __html: aboutContent }} />
        )}
      </div>
    );
  }


}

const mapState = state => ({
  aboutContent: state.landingReducer.aboutContent,
  locale: state.langReducer.lang || FAIL_DEFAULT_LANGUAGE
});

const mapDispatch = dispatch => ({
  getAboutContent: bindActionCreators(getAboutContent, dispatch),
});

const connectedContactPage = connect(mapState, mapDispatch)(About);
export default connectedContactPage;
