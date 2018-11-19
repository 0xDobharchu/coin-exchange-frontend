import React, { Component } from 'react';
import { FaArrowsAltH } from 'react-icons/fa';
import Input from 'src/components/core/controls/input';
import styles from './styles.scss';

class Exchange extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className={styles.container}>
        <Input
          label="Amount to buy"
          placeholder="0.0"
        />
        <FaArrowsAltH className={styles.arrowIcon} />
        <Input
          label="Amount to buy"
          placeholder="0.0"
        />
      </div>
    );
  }
}

export default Exchange;
