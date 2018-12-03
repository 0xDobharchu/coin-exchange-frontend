import { Bitcoin } from 'src/services/Wallets/Bitcoin';
const bitcore = require('bitcore-lib');

export class BitcoinTestnet extends Bitcoin {
    static Network = { Testnet: 'https://test-insight.bitpay.com/api' }

    constructor() {
      super();
      this.coinType = 1;
      this.name = 'BTC';
      this.title = 'Bitcoin';
      this.className = 'BitcoinTestnet';
    }

    setDefaultNetwork() {
      bitcore.Networks.defaultNetwork = bitcore.Networks.testnet;
    }
}

export default { BitcoinTestnet };
