import axios from 'axios';
import { Wallet } from 'src/services/Wallets/Wallet.js';
import { StringHelper } from 'src/services/helper';
import { Ethereum } from 'src/services/Wallets/Ethereum.js';
import { TokenERC721 } from 'src/services/Wallets/Collectibles/TokenERC721';

const Web3 = require('web3');

const BN = Web3.utils.BN;
const BigNumber = require('bignumber.js');

const EthereumTx = require('ethereumjs-tx');

const abi = require('src/contracts/Wallet/Axie.json');

export class Axie extends TokenERC721 {
  constructor() {
    super();
    this.className = 'Axie';
    this.isToken = true;
    this.contractAddress = '0xf5b0a3efb8e8e4c201e2a935f110eaaf3ffecb8d';
    this.decimals = 0;
    this.customToken = true;
    this.title = 'Axie';
    this.name = 'AXIE';
  }
}

export default { Axie };
