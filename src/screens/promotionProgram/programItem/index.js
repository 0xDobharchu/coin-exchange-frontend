import React from 'react';
import {connect} from 'react-redux';
import styles from './styles.scss';

class ProgramItem extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    const { logo, title, description, index } = this.props;
    return (
      <div className={styles.programItem} role="button" tabIndex={index}>
        <div className={styles.logo}>
          <img src={logo} alt="" className={styles.image}  />
        </div>
        <div>
          <div className={styles.title}>{title}</div>
          <div className={styles.description}>{description}</div>
        </div>
      </div>
    );
  }
}

const mapState = () => ({
});

const mapDispatch = () => ({
});

export default connect(mapState, mapDispatch)(ProgramItem);
