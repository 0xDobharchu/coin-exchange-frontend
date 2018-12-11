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
    const { logo, title, description, programType, index } = this.props;
    return (
      <div className={styles.programItem} onClick={() => this.props.choosePromotionProgram(programType)} onKeyPress={this.props.choosePromotionProgram} role="button" tabIndex={index}>
        <div className={styles.logo}>
          <img src={logo} alt="" />
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
