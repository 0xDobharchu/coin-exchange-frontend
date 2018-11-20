import React from 'react';
import { FaQrcode } from 'react-icons/fa';
import Input from 'src/components/core/controls/input';
import { showQrCode } from 'src/components/BarcodeScanner';
import styles from './styles.scss';

const WalletSelector = ({ value, onChange, onFocus, onBlur }) => (
  <div className={styles.container}>
    <Input
      label="Your wallet address"
      placeholder='Scan QR code or copy wallet address'
      className={styles.input}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
    />
    <FaQrcode
      className={styles.icon}
      size={20}
      onClick={() => {
        showQrCode({
          onData: console.log
        });
      }}
    />
  </div>
);

export default WalletSelector;
