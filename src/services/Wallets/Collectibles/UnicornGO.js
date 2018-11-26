import axios from 'axios';
import { Wallet } from 'src/services/Wallets/Wallet.js';
import { StringHelper } from 'src/services/helper';
import { Ethereum } from 'src/services/Wallets/Ethereum.js';
import { TokenERC721 } from 'src/services/Wallets/Collectibles/TokenERC721';

const Web3 = require('web3');

const BN = Web3.utils.BN;
const BigNumber = require('bignumber.js');

const EthereumTx = require('ethereumjs-tx');

const abi = require('src/contracts/Wallet/UnicornGO.json');

export class UnicornGO extends TokenERC721 {
  constructor() {
    super();
    this.className = 'UnicornGO';
    this.isToken = true;
    this.contractAddress = '0xcf0010af06edff540af798d06e866d95cbdc8488';
    this.decimals = 0;
    this.customToken = true;
    this.title = 'UnicornGO';
    this.name = 'UNG';
  }
}

export default { UnicornGO };
