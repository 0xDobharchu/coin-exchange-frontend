import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedHTMLMessage, injectIntl } from 'react-intl';

// import { updateModal } from 'src/reducers/app/action';
// import VideoYoutube from 'src/components/core/controls/VideoYoutube';
import { Link } from 'react-router-dom';
// import { LANDING_PAGE_TYPE, URL } from 'src/constants';
// import {
//   Modal, ModalHeader, ModalBody, ModalFooter
// } from 'react-bootstrap';

// style
// import imgNinja from 'src/assets/images/ninja-header-black.svg';
import imgLogo from 'src/assets/images/logo.png';
import { SEOHome } from 'src/components/SEO';
import './styles.scss';

class Index extends React.PureComponent {
  static propTypes = {
    intl: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const appContainer = document.getElementById('root-app');
    appContainer.classList.add('mobileTabletApp');
  }

  handleToggleModal = () => {
    // this.props.updateModal({ show: false })
  }

  render() {
    const { messages } = this.props.intl;
    const {
      name, children, btnToggleLeftMenu, fullWidthContent,
      // modal: { className, show, body, title, centered },
    } = this.props;
    const logo = <Link to="/" className="d-inline-block mt-1"><img src={imgLogo} width="100" alt="logo" /></Link>;
    const navLinks = (
      <span>
        {/* <span><Link className={`${type === 'product' ? 'active' : ''} landing-nav-link`} to={LANDING_PAGE_TYPE.product.url}>Product</Link></span> */}
        {/* <span><Link className={`${type === 'research' ? 'active' : ''} landing-nav-link`} to={LANDING_PAGE_TYPE.research.url}>Research</Link></span> */}
      </span>
    );
    const btnJoin = <span />;// <Link className="btn btn-primary-landing" to={URL.RECRUITING}><FormattedMessage id="landing_page.btn.joinOurTeam" /></Link>

    return (
      <div className={`landing-page ct-${name}`}>
        {SEOHome}
        <div className="landing-background">
          <div>
            {/* mobile */}
            <div className="container">
              <div className="row d-md-none">
                <div className="col-5">
                  {logo}
                </div>
                <div className="col-7">
                  <div className="text-right">
                    {btnJoin}
                  </div>
                </div>
              </div>
              <div className="row d-md-none">
                <div className="col">{btnToggleLeftMenu}</div>
                <div className="col text-right">{navLinks}</div>
              </div>

              {/* desktop */}
              <div className="row d-none d-md-flex">
                <div className="col-2">
                  {logo}
                </div>
                <div className="col-10">
                  <div className="text-right">
                    <span className="mr-4">{navLinks}</span>
                    {btnJoin}
                  </div>
                </div>
              </div>
            </div>

            {
              fullWidthContent ? children : (
                <div className="container">
                  {children}
                </div>
              )
            }

            <div className="container">
              <hr className="landing-hr" />

              <div className="row landing-footer no-gutters">
                <div className="col-12 col-md-1">
                  <img src={imgLogo} width="54" alt="footer-logo" />
                </div>
                <div className="col-12 col-md-7">
                  <div className="align-middle px-1 pt-1">
                    <div><FormattedHTMLMessage id="landing_page.label.footer" /></div>
                  </div>
                </div>
                {
                  name && (
                    <div className="col-12 col-md-4 text-left text-md-right">
                      <div className="pl-1 pt-1">
                        {
                          messages[`landing_page.${name}.joinTelegram`] && (
                            <div>
                              <FormattedHTMLMessage id={`landing_page.${name}.joinTelegram`} />
                            </div>
                          )
                        }
                        {
                          messages[`landing_page.${name}.whitepaper`] && (
                            <div>
                              <FormattedHTMLMessage id={`landing_page.${name}.whitepaper`} />
                            </div>
                          )
                        }
                      </div>
                    </div>
                  )
                }
              </div>
            </div>


          </div>

          {/* <Modal isOpen={show} toggle={this.handleToggleModal} className={className} centered={centered}>
            {title && <ModalHeader toggle={this.handleToggleModal}>{title}</ModalHeader>}
            <ModalBody>
              {body}
            </ModalBody>
          </Modal> */}
        </div>
      </div>
    );
  }
}
const mapState = () => ({
});

const mapDispatch = ({
});

export default injectIntl(connect(mapState, mapDispatch)(Index));
