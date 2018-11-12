import React from 'react';
import { FormattedMessage } from 'react-intl';
import loadingSVG from 'src/assets/images/icon/loading.gif';
import AvatarSVG from 'src/assets/images/icon/avatar.svg';
import ExpandArrowSVG from 'src/assets/images/icon/expand-arrow.svg';
import Image from 'src/components/core/presentation/Image';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import style from './style.scss';


class Me extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
    console.log(this.state);
  }

  render() {
    const { isLoading } = this.state;
    if (isLoading) {
      return (
        <div className={`discover-overlay ${isLoading ? 'show' : ''}`}>
          <Image src={loadingSVG} alt="loading" width="100" />
        </div>
      );
    }
    return (
      <Container className={style.me}>
        <div>
          <Row>
            <Col md={12}>
              <Link className={style.updateProfile} to="/me/profile" title="profile">
                <Image className="avatar" src={AvatarSVG} alt="avatar" />
                <div className="text">
                  <strong><FormattedMessage id="me.feed.profileTitle" /></strong>
                  <p><FormattedMessage id="me.feed.profileDescription" /></p>
                </div>
                <div className="arrow">
                  <Image src={ExpandArrowSVG} alt="arrow" />
                </div>
              </Link>
            </Col>
          </Row>
        </div>
      </Container>
    );
  }
}

export default Me;
