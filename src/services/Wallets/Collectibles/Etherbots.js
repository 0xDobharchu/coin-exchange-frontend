import axios from 'axios';
import { Wallet } from 'src/services/Wallets/Wallet.js';
import { StringHelper } from 'src/services/helper';
import { Ethereum } from 'src/services/Wallets/Ethereum.js';
import { TokenERC721 } from 'src/services/Wallets/Collectibles/TokenERC721';

const Web3 = require('web3');

const BN = Web3.utils.BN;
const BigNumber = require('bignumber.js');

const EthereumTx = require('ethereumjs-tx');

const abi = require('src/contracts/Wallet/Etherbots.json');

export class Etherbots extends TokenERC721 {
  constructor() {
    super();
    this.className = 'Etherbots';
    this.isToken = true;
    this.contractAddress = '0xd2f81cd7a20d60c0d558496c7169a20968389b40';
    this.decimals = 0;
    this.customToken = true;
    this.title = 'Etherbots';
    this.name = 'ETHBOT';
  }
}

export default { Etherbots };
