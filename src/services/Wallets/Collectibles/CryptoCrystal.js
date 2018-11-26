import axios from 'axios';
import { Wallet } from 'src/services/Wallets/Wallet.js';
import { StringHelper } from 'src/services/helper';
import { Ethereum } from 'src/services/Wallets/Ethereum.js';
import { TokenERC721 } from 'src/services/Wallets/Collectibles/TokenERC721';

const Web3 = require('web3');

const BN = Web3.utils.BN;
const BigNumber = require('bignumber.js');

const EthereumTx = require('ethereumjs-tx');

const abi = require('src/contracts/Wallet/CryptoCrystal.json');

export class CryptoCrystal extends TokenERC721 {
  constructor() {
    super();
    this.className = 'CryptoCrystal';
    this.isToken = true;
    this.contractAddress = '0xcfbc9103362aec4ce3089f155c2da2eea1cb7602';
    this.decimals = 0;
    this.customToken = true;
    this.title = 'CryptoCrystal';
    this.name = 'CC';
  }
}

export default { CryptoCrystal };
