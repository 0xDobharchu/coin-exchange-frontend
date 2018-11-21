import React from 'react';
import { Container, Row } from 'react-bootstrap';
import detectWindow from 'src/screens/coin/styles.scss';
import style from './style.scss';
import TabNavigation from './navigation/TabNavigation';
import SideBarNavigation from './navigation/SideBarNavigation';


class Me extends React.PureComponent {
  render() {
    return (
      <div className={style.me}>
        <Container>
          <div className={detectWindow.desktop} style={{ height: '100%' }}>
            <SideBarNavigation {...this.props} />
          </div>
          <div className={detectWindow.mobile}>
            <Row md={12} style={{ justifyContent: 'center', flexDirection: 'column' }}>
              <TabNavigation {...this.props} />
            </Row>
          </div>
        </Container>
      </div>
    );
  }
}

export default Me;
