import axios from 'axios';
import { Wallet } from 'src/services/Wallets/Wallet.js';
import { StringHelper } from 'src/services/helper';
import { Ethereum } from 'src/services/Wallets/Ethereum.js';
import { TokenERC721 } from 'src/services/Wallets/Collectibles/TokenERC721';

const Web3 = require('web3');

const BN = Web3.utils.BN;
const BigNumber = require('bignumber.js');

const EthereumTx = require('ethereumjs-tx');

const abi = require('src/contracts/Wallet/CryptoKitties.json');

export class CryptoPunks extends TokenERC721 {
  constructor() {
    super();
    this.className = 'CryptoPunks';
    this.isToken = true;
    this.contractAddress = '0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB';
    this.decimals = 0;
    this.customToken = true;
    this.title = 'CRYPTOPUNKS';
    this.name = 'C';
  }
}

export default { CryptoPunks };
