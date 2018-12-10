import localStore from 'src/services/localStore';
import { Bitcoin } from 'src/services/Wallets/Bitcoin.js';
import { BitcoinCash } from 'src/services/Wallets/BitcoinCash.js';
import { BitcoinCashTestnet } from 'src/services/Wallets/BitcoinCashTestnet.js';
import { BitcoinTestnet } from 'src/services/Wallets/BitcoinTestnet.js';
import { Ethereum } from 'src/services/Wallets/Ethereum.js';
import { Wallet } from 'src/services/Wallets/Wallet.js';
import { TokenERC20 } from 'src/services/Wallets/Tokens/TokenERC20';
import { Shuriken } from 'src/services/Wallets/Tokens/Shuriken.js';
import { TokenERC721 } from 'src/services/Wallets/Collectibles/TokenERC721';
import { CryptoPunks } from 'src/services/Wallets/Collectibles/CryptoPunks';
import { CryptoStrikers } from 'src/services/Wallets/Collectibles/CryptoStrikers';
import { CryptoKitties } from 'src/services/Wallets/Collectibles/CryptoKitties';
import { Axie } from 'src/services/Wallets/Collectibles/Axie';
import { BlockchainCuties } from 'src/services/Wallets/Collectibles/BlockchainCuties';
import { ChibiFighters } from 'src/services/Wallets/Collectibles/ChibiFighters';
import { CryptoClown } from 'src/services/Wallets/Collectibles/CryptoClown';
import { CryptoCrystal } from 'src/services/Wallets/Collectibles/CryptoCrystal';
import { Cryptogs } from 'src/services/Wallets/Collectibles/Cryptogs';
import { CryptoHorse } from 'src/services/Wallets/Collectibles/CryptoHorse';
import { CryptoSoccr } from 'src/services/Wallets/Collectibles/CryptoSoccr';
import { CryptoZodiacs } from 'src/services/Wallets/Collectibles/CryptoZodiacs';
import { CSCPreSaleFactory } from 'src/services/Wallets/Collectibles/CSCPreSaleFactory';
import { DopeRaider } from 'src/services/Wallets/Collectibles/DopeRaider';
import { Etherbots } from 'src/services/Wallets/Collectibles/Etherbots';
import { EtheremonAsset } from 'src/services/Wallets/Collectibles/EtheremonAsset';
import { EtherLambos } from 'src/services/Wallets/Collectibles/EtherLambos';
import { ExoPlanets } from 'src/services/Wallets/Collectibles/ExoPlanets';
import { Giftomon } from 'src/services/Wallets/Collectibles/Giftomon';
import { HelloDog } from 'src/services/Wallets/Collectibles/HelloDog';
import { OxcertKYC } from 'src/services/Wallets/Collectibles/OxcertKYC';
import { PandaEarth } from 'src/services/Wallets/Collectibles/PandaEarth';
import { PirateKittyToken } from 'src/services/Wallets/Collectibles/PirateKittyToken';
import { UnicornGO } from 'src/services/Wallets/Collectibles/UnicornGO';
import { WarToken } from 'src/services/Wallets/Collectibles/WarToken';
import Helper, { StringHelper } from 'src/services/helper';
import axios from 'axios';
const bip39 = require('bip39');

export class MasterWallet {
  // list coin is supported ...
  static ListDefaultCoin = {
    Ethereum, Bitcoin, BitcoinTestnet, BitcoinCash, BitcoinCashTestnet
  };

  static ListCoin = {
    Ethereum,
    Bitcoin,
    BitcoinTestnet,
    BitcoinCash,
    BitcoinCashTestnet,
    TokenERC20,
    TokenERC721,
    CryptoStrikers,
    CryptoPunks,
    CryptoKitties,
    Axie,
    BlockchainCuties,
    ChibiFighters,
    CryptoClown,
    CryptoCrystal,
    Cryptogs,
    CryptoHorse,
    CryptoSoccr,
    CryptoZodiacs,
    CSCPreSaleFactory,
    DopeRaider,
    Etherbots,
    EtheremonAsset,
    EtherLambos,
    ExoPlanets,
    Giftomon,
    HelloDog,
    OxcertKYC,
    PandaEarth,
    PirateKittyToken,
    UnicornGO,
    WarToken
  };

  static KEY = 'wallets';

  static QRCODE_TYPE = {
    UNKNOW: 0, URL: 1, REDEEM: 2, TRANSFER: 3, CRYPTO_ADDRESS: 4
  };

  // Create an autonomous wallet:

  static createMasterWallets(password) {
    const t0 = performance.now();

    // let mnemonic = 'canal marble trend ordinary rookie until combine hire rescue cousin issue that';
    // let mnemonic = 'book trial moral hunt riot ranch yard trap tool horse good barely';

    const mnemonic = bip39.generateMnemonic(); // generates string

    const masterWallet = [];

    let defaultWallet = [1, 3];// eth main, eth test, btc main, btc test => local web
    if (APP_ENV.isProduction) { // // eth main, eth test, btc main, btc test => live web
      defaultWallet = [0, 1, 2];
    }

    for (const k1 in MasterWallet.ListDefaultCoin) {
      for (const k2 in MasterWallet.ListDefaultCoin[k1].Network) {
        // check production, only get mainnet:
        if (APP_ENV.isProduction && k2 != 'Mainnet') {
          break;
        }
        // init a wallet:
        const wallet = new MasterWallet.ListDefaultCoin[k1]();
        // set mnemonic, if not set then auto gen.
        wallet.mnemonic = mnemonic;
        wallet.network = MasterWallet.ListDefaultCoin[k1].Network[k2];
        // create address, private-key ...
        wallet.createAddressPrivatekey();

        // encrypt secret data of wallet
        wallet.enscrypt(password);
        masterWallet.push(wallet);
      }
    }

    // set default item:
    for (let i = 0; i < defaultWallet.length; i++) {
      masterWallet[defaultWallet[i]].default = true;
    }    

    const t1 = performance.now();

    MasterWallet.log(`Call to createMasterWallet took ${t1 - t0} milliseconds.`);
    return masterWallet;
  }

  static updateNewPassword(oldPassword, newPassword){

  }

  // return list coin temp for create/import:
  static getListCoinTemp() {
    const tempWallet = [];
    for (const k1 in MasterWallet.ListDefaultCoin) {
      for (const k2 in MasterWallet.ListDefaultCoin[k1].Network) {
        // check production, only get mainnet:
        if (APP_ENV.isProduction && k2 != 'Mainnet') {
          break;
        }
        const wallet = new MasterWallet.ListDefaultCoin[k1]();
        wallet.network = MasterWallet.ListCoin[k1].Network[k2];
        tempWallet.push(wallet);
      }
    }
    if (tempWallet.length > 0) tempWallet[0].default = true;
    return tempWallet;
  }

  // for create new wallet (add new wallet from user):
  static createNewWallet(listCoinTemp, mnemonic, password) {
    let isImport = false;
    if (mnemonic == '') {
      mnemonic = bip39.generateMnemonic(); // generates string
    } else if (!bip39.validateMnemonic(mnemonic)) {
      return false;
    } else {
      isImport = true;
    }
    let listCoinSelected = [];
    listCoinTemp.forEach((wallet) => {
      if (wallet.default) {
        wallet.default = false;
        wallet.mnemonic = mnemonic;
        wallet.protected = isImport;
        // create address, private-key ...
        wallet.createAddressPrivatekey();
        wallet.enscrypt(password);
        listCoinSelected.push(wallet);
      }
    });
    return listCoinSelected;
  }

  static UpdateBalanceItem(item, wallets) {    
    wallets.forEach((wallet) => {
      if (wallet.address === item.address && wallet.network === item.network) {
        wallet.balance = item.balance;
      }
    });    
  }

  static filterWalletByName(wallets, coinName) {

    const BreakException = {};
    const result = [];
    try {
      if (coinName !== '') {
        wallets.forEach((wallet) => {
          if (coinName === wallet.name) {
            result.push(wallet);
          }
        });
      }
    } catch (e) {
      if (e !== BreakException) throw e;
    }

    return result;
  }

  // Get list wallet from list wallet:
  static getWalletDefault(wallets, coinName) {

    if (wallets === false) return false;

    const BreakException = {};
    try {
      if (coinName !== '') {
        wallets.forEach((wallet) => {
          if (wallet.default && coinName === wallet.name) {
            return wallet;
          }
        });
      }
    } catch (e) {
      if (e !== BreakException) throw e;
    }
    return false;
  }
  // Get list wallet from list wallet:
  static getWalletsDefault(wallets) {

    if (wallets === false) return false;

    const BreakException = {};
    try {
      const lstDefault = {};

      wallets.forEach((wallet) => {
        if (!lstDefault.hasOwnProperty(wallet.name)) { lstDefault[wallet.name] = null; }
        if (wallet.default) {
          if (APP_ENV.isProduction) {
            if (wallet.network === MasterWallet.ListCoin[wallet.className].Network.Mainnet) {
              lstDefault[wallet.name] = wallet;
            }
          } else { lstDefault[wallet.name] = wallet }
        }
      });
      return lstDefault;
    } catch (e) {
      if (e !== BreakException) throw e;
    }
    return false;
  }

  static convertObject(walletJson) {
    try {
      const wallet = new MasterWallet.ListCoin[walletJson.className]();
      wallet.mnemonic = walletJson.mnemonic;
      wallet.address = walletJson.address;
      wallet.privateKey = walletJson.privateKey;
      wallet.coinType = walletJson.coinType;
      wallet.default = walletJson.default;
      wallet.balance = walletJson.balance;
      wallet.network = walletJson.network;
      wallet.name = walletJson.name;
      wallet.title = walletJson.title;
      wallet.protected = walletJson.protected;
      wallet.isReward = walletJson.isReward;
      wallet.chainId = walletJson.chainId;
      if (walletJson.isToken) wallet.isToken = walletJson.isToken;
      if (walletJson.decimals) wallet.decimals = walletJson.decimals;
      if (walletJson.contractAddress) wallet.contractAddress = walletJson.contractAddress;
      if (walletJson.customToken) wallet.customToken = walletJson.customToken;
      if (walletJson.isCollectibles) wallet.isCollectibles = walletJson.isCollectibles;
      if (walletJson.secret) wallet.secret = walletJson.secret;
      if (walletJson.publicKey) wallet.publicKey = walletJson.publicKey;
      if (walletJson.hideBalance) wallet.hideBalance = walletJson.hideBalance;

      return wallet;
    } catch (e) {
      return false;
    }
  }

  static IsJsonString(str) {
    try {
      return JSON.parse(str);
    } catch (e) {
      return false;
    }
  }  

  static log(data, key = MasterWallet.KEY) {
    console.log(`%c ${StringHelper.format('{0}: ', key)}`, 'background: #222; color: #bada55', data);
  } 

  /**
  * Get coin type from its wallet address
  * @param {String} address
  */
  static getCoinSymbolFromAddress(address) {
    for (const i in MasterWallet.ListDefaultCoin) {
      const wallet = new MasterWallet.ListDefaultCoin[i]();
      if (wallet.checkAddressValid(address) === true) {
        return {
          symbol: wallet.name, name: wallet.title, address, amount: ''
        };
      }
    }
    return false;
  }

  static getQRCodeDetail(text) {
    // 0: any data ...
    // 1: website:
    // 2: ninja-redeem:code?value=25
    // 3: <coin-title>:<address>?amount=<number>
    // 4: <address-only>

    const keyRedem = 'ninja-redeem';

    function url(text) {
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      if (!urlRegex.test(text)) {
        return false;
      }
      const match = text.match(urlRegex);
      return match[0];
    }
    function redeem(text) {
      if (text.includes(keyRedem)) {
        const dataSplit = text.split('?');
        const code = dataSplit[0].split(':')[1];
        const param = Helper.getQueryStrings(`?${dataSplit[1]}`);
        return { code, value: param.value };
      }
      return false;
    }
    function transfer(text) {
      const dataSplit = text.split('?');
      for (const i in MasterWallet.ListDefaultCoin) {
        const wallet = new MasterWallet.ListDefaultCoin[i]();
        if (dataSplit[0].toLowerCase().includes((wallet.title.replace(/\s/g, '')).toLowerCase())) {
          const listData = dataSplit[0].split(':');
          if (listData.length > 0) {
            const address = listData[1];
            const param = Helper.getQueryStrings(`?${dataSplit[1]}`);
            return { symbol: wallet.name, address, amount: param.amount };
          }

          return false;
        }
      }
      return false;
    }
    function address(text) {
      return MasterWallet.getCoinSymbolFromAddress(text);
    }
    // let check:
    // web:
    const result = { type: MasterWallet.QRCODE_TYPE.UNKNOW, data: {}, text };

    let tmpResult = url(text);
    if (tmpResult !== false) {
      result.type = MasterWallet.QRCODE_TYPE.URL;
      result.data = tmpResult;
      return result;
    }

    tmpResult = redeem(text);

    if (tmpResult !== false) {
      result.type = MasterWallet.QRCODE_TYPE.REDEEM;
      result.data = tmpResult;
      return result;
    }

    tmpResult = transfer(text);
    if (tmpResult !== false) {
      result.type = MasterWallet.QRCODE_TYPE.TRANSFER;
      result.data = tmpResult;
      return result;
    }
    tmpResult = address(text);
    if (tmpResult !== false) {
      result.type = MasterWallet.QRCODE_TYPE.CRYPTO_ADDRESS;
      result.data = tmpResult;
      return result;
    }
    return result;
  }

  static readContacts() {
    const listContact = localStore.get('contacts');
    if (listContact == false) return [];
    return listContact;
  }

  static removeContact(contact) {
    const listContact = localStore.get('contacts');
    const listTemp = [];
    if (listContact.length > 0) {
      listContact.forEach((cont) => {
        if (cont.address.address !== contact.address.address) {
          listTemp.push(cont);
        }
      });
    }
    localStore.save('contacts', listTemp);
    return listTemp;
  }

  static addContact(contact) {
    console.log('contact need add', contact);
    let flag = false;
    let listContact = MasterWallet.readContacts();
    if (listContact.length > 0) {
      for (let i = 0; i < listContact.length; i++) {
        const cont = listContact[i];
        if (cont.email === contact.email || cont.address.address === contact.address.address) {
          flag = true;
          break;
        }
      }
    } else {
      listContact = [];
    }
    if (flag) {
      return 'Entry already exist';
    }

    listContact.push(contact);

    localStore.save('contacts', listContact);
    return true;
  }
}

export default { MasterWallet };
