import axios from 'axios';
import { Wallet } from 'src/services/Wallets/Wallet.js';
import { StringHelper } from 'src/services/helper';
import { Ethereum } from 'src/services/Wallets/Ethereum.js';
import { TokenERC721 } from 'src/services/Wallets/Collectibles/TokenERC721';

const Web3 = require('web3');

const BN = Web3.utils.BN;
const BigNumber = require('bignumber.js');

const EthereumTx = require('ethereumjs-tx');

const abi = require('src/contracts/Wallet/DopeRaider.json');

export class DopeRaider extends TokenERC721 {
  constructor() {
    super();
    this.className = 'DopeRaider';
    this.isToken = true;
    this.contractAddress = '0x3bcbd2093e991363b98cf0f51d40fecd94a55a0d';
    this.decimals = 0;
    this.customToken = true;
    this.title = 'DopeRaider';
    this.name = 'DOPR';
  }
}

export default { DopeRaider };
