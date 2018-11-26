import axios from 'axios';
import { Wallet } from 'src/services/Wallets/Wallet.js';
import { StringHelper } from 'src/services/helper';
import { Ethereum } from 'src/services/Wallets/Ethereum.js';
import { TokenERC721 } from 'src/services/Wallets/Collectibles/TokenERC721';

const Web3 = require('web3');

const BN = Web3.utils.BN;
const BigNumber = require('bignumber.js');

const EthereumTx = require('ethereumjs-tx');

const abi = require('src/contracts/Wallet/HelloDog.json');

export class HelloDog extends TokenERC721 {
  constructor() {
    super();
    this.className = 'HelloDog';
    this.isToken = true;
    this.contractAddress = '0x9eea7965ee59c304f81d602ae1d9a3d624429d9d';
    this.decimals = 0;
    this.customToken = true;
    this.title = 'HelloDog';
    this.name = 'HD';
  }
}

export default { HelloDog };
