import axios from 'axios';
import { Wallet } from 'src/services/Wallets/Wallet.js';
import { StringHelper } from 'src/services/helper';
import { Ethereum } from 'src/services/Wallets/Ethereum.js';
import { TokenERC721 } from 'src/services/Wallets/Collectibles/TokenERC721';

const Web3 = require('web3');

const BN = Web3.utils.BN;
const BigNumber = require('bignumber.js');

const EthereumTx = require('ethereumjs-tx');

const abi = require('src/contracts/Wallet/CryptoStrikers.json');

export class CryptoStrikers extends TokenERC721 {
  constructor() {
    super();
    this.className = 'CryptoStrikers';
    this.isToken = true;
    this.contractAddress = '0xdcaad9fd9a74144d226dbf94ce6162ca9f09ed7e';
    this.decimals = 0;
    this.customToken = true;
    this.title = 'CryptoStrikers';
    this.name = 'STRK';
  }
}

export default { CryptoStrikers };
