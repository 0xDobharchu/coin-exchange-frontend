
import { BitcoinCash } from '@/services/Wallets/BitcoinCash';

const bitcore = require('bitcore-lib-cash');

export class BitcoinCashTestnet extends BitcoinCash {
  static Network = { Testnet: 'https://test-bch-insight.bitpay.com/api' }

  constructor() {
    super();

    this.coinType = 1;
    this.name = 'BCH';
    this.title = 'BitcoinCash Testnet';
    this.className = 'BitcoinCashTestnet';
  }


  setDefaultNetwork() {
    bitcore.Networks.defaultNetwork = bitcore.Networks.testnet;
  }
}

export default { BitcoinCashTestnet };
