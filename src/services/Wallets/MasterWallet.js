import localStore from '@/services/localStore';
import {Bitcoin} from '@/services/Wallets/Bitcoin.js';
import {BitcoinCash} from '@/services/Wallets/BitcoinCash.js';
import {BitcoinCashTestnet} from '@/services/Wallets/BitcoinCashTestnet.js';
import {BitcoinTestnet} from '@/services/Wallets/BitcoinTestnet.js';
import {Ethereum} from '@/services/Wallets/Ethereum.js';
import {Wallet} from '@/services/Wallets/Wallet.js';
import {TokenERC20} from '@/services/Wallets/Tokens/TokenERC20';
import {Shuriken} from '@/services/Wallets/Tokens/Shuriken.js';
import {TokenERC721} from '@/services/Wallets/Collectibles/TokenERC721';
import {CryptoPunks} from '@/services/Wallets/Collectibles/CryptoPunks';
import {CryptoStrikers} from '@/services/Wallets/Collectibles/CryptoStrikers';
import {CryptoKitties} from '@/services/Wallets/Collectibles/CryptoKitties';
import {Axie} from '@/services/Wallets/Collectibles/Axie';
import {BlockchainCuties} from '@/services/Wallets/Collectibles/BlockchainCuties';
import {ChibiFighters} from '@/services/Wallets/Collectibles/ChibiFighters';
import {CryptoClown} from '@/services/Wallets/Collectibles/CryptoClown';
import {CryptoCrystal} from '@/services/Wallets/Collectibles/CryptoCrystal';
import {Cryptogs} from '@/services/Wallets/Collectibles/Cryptogs';
import {CryptoHorse} from '@/services/Wallets/Collectibles/CryptoHorse';
import {CryptoSoccr} from '@/services/Wallets/Collectibles/CryptoSoccr';
import {CryptoZodiacs} from '@/services/Wallets/Collectibles/CryptoZodiacs';
import {CSCPreSaleFactory} from '@/services/Wallets/Collectibles/CSCPreSaleFactory';
import {DopeRaider} from '@/services/Wallets/Collectibles/DopeRaider';
import {Etherbots} from '@/services/Wallets/Collectibles/Etherbots';
import {EtheremonAsset} from '@/services/Wallets/Collectibles/EtheremonAsset';
import {EtherLambos} from '@/services/Wallets/Collectibles/EtherLambos';
import {ExoPlanets} from '@/services/Wallets/Collectibles/ExoPlanets';
import {Giftomon} from '@/services/Wallets/Collectibles/Giftomon';
import {HelloDog} from '@/services/Wallets/Collectibles/HelloDog';
import {OxcertKYC} from '@/services/Wallets/Collectibles/OxcertKYC';
import {PandaEarth} from '@/services/Wallets/Collectibles/PandaEarth';
import {PirateKittyToken} from '@/services/Wallets/Collectibles/PirateKittyToken';
import {UnicornGO} from '@/services/Wallets/Collectibles/UnicornGO';
import {WarToken} from '@/services/Wallets/Collectibles/WarToken';
import Helper, {StringHelper} from '@/services/helper';
import axios from 'axios';
const bip39 = require('bip39');

export class MasterWallet {
    // list coin is supported ...
    static ListDefaultCoin = {
      Ethereum, Bitcoin, BitcoinTestnet, BitcoinCash,  BitcoinCashTestnet
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
      if (process.env.isProduction) { // // eth main, eth test, btc main, btc test => live web
        defaultWallet = [0, 1, 2];
      }
      
      for (const k1 in MasterWallet.ListDefaultCoin) {
        for (const k2 in MasterWallet.ListDefaultCoin[k1].Network) {
          // check production, only get mainnet:
          if (process.env.isProduction && k2 != 'Mainnet') {
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

      // Save to local store:
     /// MasterWallet.UpdateLocalStore(masterWallet);

      const t1 = performance.now();

      MasterWallet.log(`Call to createMasterWallet took ${t1 - t0} milliseconds.`);
      return masterWallet;
    }

    static UpdateLocalStore(masterWallet, sync = false) {
      // encrypt wallet:
      // const encryptWalletData = MasterWallet.encrypt(JSON.stringify(masterWallet));

      // localStore.save(MasterWallet.KEY, encryptWalletData);

      // // call api update list address:
      // if (sync) {
      //   MasterWallet.SyncWalletAddress();
      // }
    }

    static getListWalletAddressJson() {
      const masterWallet = MasterWallet.getWalletDataLocalString();

      const listAddresses = [];

      masterWallet.forEach((wallet) => {
        if (listAddresses.indexOf(wallet.address) === -1) {
          listAddresses.push(wallet.address);
        }
      });
      return JSON.stringify(listAddresses);
    }

    static SyncWalletAddress() {
      try {
        const listAddresses = MasterWallet.getListWalletAddressJson();

        console.log('update wallet addresses ...');
        const token = localStore.get(APP.AUTH_TOKEN);

        const defaultHeaders = {
          'Content-Type': 'application/json', Payload: token
        };

        const data = new FormData();
        data.append('wallet_addresses', listAddresses);

        const endpoint = 'user/profile';

        const response = axios({
          method: 'POST',
          timeout: BASE_API.TIMEOUT,
          headers: defaultHeaders,
          url: `${BASE_API.BASE_URL}/${endpoint}`,
          data
        });
        console.log('update wallet response ', response);
      } catch (error) {
        console.error('callAPI: ', error);
      }
    }

    static NotifyUserTransfer(from_address, to_address) {
      const data = {
        notification: {
          title: 'Nofification',
          body: `You have a transaction from ${from_address}`,
          click_action: 'https://ninja.org/wallet',
        },
        data: {
          action: 'transfer',
          data: { to_address, from_address },
        },
        to: to_address,
      };

      const token = localStore.get(APP.AUTH_TOKEN);

      const defaultHeaders = {
        'Content-Type': 'application/json', Payload: token
      };

      const endpoint = 'user/notification';

      const response = axios.post(
        `${BASE_API.BASE_URL}/${endpoint}`,
        JSON.stringify(data),
        { headers: defaultHeaders }
      );

      console.log('called NotifyUserTransfer ', response);
    }

    static UpdateBalanceItem(item) {
      const wallets = MasterWallet.getMasterWallet();
      wallets.forEach((wallet) => {
        if (wallet.address === item.address && wallet.network === item.network) {
          wallet.balance = item.balance;
        }
      });
      MasterWallet.UpdateLocalStore(wallets);
    }

    // Restore wallets:
    static RestoreMasterWallet(masterWalletDataString) {
      // todo: need verify invalid data:
      localStore.save(MasterWallet.KEY, masterWalletDataString);
      const masterWallet = JSON.parse(masterWalletDataString);
      localStore.save(MasterWallet.KEY, masterWallet);
      return masterWallet;
    }


    // get wallet data string local store:
    static getWalletDataLocalString() {
      const wallets = localStore.get(MasterWallet.KEY);

      if (wallets === false) return false;

      // check is json or encrypt data:
      if (typeof (wallets) !== 'object') {
        const walletDecrypt = MasterWallet.decrypt(wallets);
        const walletsObject = MasterWallet.IsJsonString(walletDecrypt);
        if (walletsObject !== false) {
          return walletsObject;
        }
      } else {
        // backup:
        try { localStore.save('backup', CryptoJS.AES.encrypt(JSON.stringify(wallets), 'backup').toString()); } catch (e) { console.log(e); }
        MasterWallet.UpdateLocalStore(wallets);
      }

      return wallets;
    }

    // Get list wallet from store local:
    static getMasterWallet() {
      const wallets = MasterWallet.getWalletDataLocalString();

      if (wallets == false) return false;

      const listWallet = [];
      let hasTestnet = false;

      wallets.forEach((walletJson) => {
        const wallet = MasterWallet.convertObject(walletJson);
        if (wallet != false) {
          listWallet.push(wallet);
        }
      });

      return listWallet;
    }


    static getWallets(coinName = '') {
      const wallets = MasterWallet.getWalletDataLocalString();

      if (wallets === false) return false;

      const BreakException = {};
      const result = [];
      try {
        if (coinName !== '') {
          const wallet = false;
          wallets.forEach((walletJson) => {
            if (coinName === walletJson.name) {
              if (process.env.isLive) {
                if (walletJson.network === MasterWallet.ListCoin[walletJson.className].Network.Mainnet) {
                  result.push(MasterWallet.convertObject(walletJson));
                }
              } else {
                result.push(MasterWallet.convertObject(walletJson));
              }
            }
          });
        } else {
          result.push(MasterWallet.convertObject(walletJson));
        }
      } catch (e) {
        if (e !== BreakException) throw e;
      }

      return result;
    }

    // Get list wallet from store local:
    static getWalletDefault(coinName = '') {
      const wallets = MasterWallet.getWalletDataLocalString();

      if (wallets === false) return false;

      const BreakException = {};
      try {
        if (coinName !== '') {
          let wallet = false;
          wallets.forEach((walletJson) => {
            if (walletJson.default && coinName === walletJson.name) {
              if (process.env.isLive) {
                if (walletJson.network === MasterWallet.ListCoin[walletJson.className].Network.Mainnet) {
                  wallet = MasterWallet.convertObject(walletJson);
                }
              } else { wallet = MasterWallet.convertObject(walletJson); }
            }
          });
          return wallet;
        }

        const lstDefault = {};

        wallets.forEach((walletJson) => {
          if (!lstDefault.hasOwnProperty(walletJson.name)) { lstDefault[walletJson.name] = null; }
          if (walletJson.default) {
            if (process.env.isLive) {
              if (walletJson.network === MasterWallet.ListCoin[walletJson.className].Network.Mainnet) {
                lstDefault[walletJson.name] = MasterWallet.convertObject(walletJson);
              }
            } else { lstDefault[walletJson.name] = MasterWallet.convertObject(walletJson); }
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

    static restoreWallets(dataString) {
      try {
        let jsonData = MasterWallet.IsJsonString(dataString);

        // check encrypt if not json ?
        if (jsonData === false) {
          jsonData = MasterWallet.decrypt(dataString);
          if (jsonData !== false) {
            jsonData = MasterWallet.IsJsonString(jsonData);
          }
        }

        let auth_token = false;
        let wallets = false;
        let chat_encryption_keypair = false;

        if (jsonData !== false) {
          if (jsonData.hasOwnProperty('auth_token')) {
            auth_token = jsonData.auth_token;
          }
          if (jsonData.hasOwnProperty('chat_encryption_keypair')) {
            chat_encryption_keypair = jsonData.chat_encryption_keypair;
          }
          if (jsonData.hasOwnProperty('wallets')) {
            wallets = jsonData.wallets;
          } else {
            // for old user without keys auth_token + chat_encryption_keypair
            wallets = jsonData;
          }

          if (Array.isArray(wallets)) {
            const listWallet = [];
            wallets.forEach((walletJson) => {
              const wallet = MasterWallet.convertObject(walletJson);
              if (wallet) {
                listWallet.push(wallet);
                // throw BreakException;
              }
            });
            MasterWallet.UpdateLocalStore(listWallet);
            if (auth_token !== false) {
              localStore.save(APP.AUTH_TOKEN, auth_token);
            }
            if (chat_encryption_keypair !== false) {
              localStore.save(APP.CHAT_ENCRYPTION_KEYPAIR, chat_encryption_keypair);
            }
            return listWallet;
          }
        }
      } catch (e) {
        // console.log('Wallet is invaild', e);
      }
      return false;
    }

    static log(data, key = MasterWallet.KEY) {
      console.log(`%c ${StringHelper.format('{0}: ', key)}`, 'background: #222; color: #bada55', data);
    }

    // static encrypt(message) {
    //   try {
    //     const WALLET_SECRET_KEY = process.env.WALLET_SECRET_KEY;
    //     const ciphertext = CryptoJS.AES.encrypt(message, WALLET_SECRET_KEY);
    //     return ciphertext.toString();
    //   } catch (e) {
    //     console.log('encrypt', e);
    //     return false;
    //   }
    // }
    //
    // static decrypt(ciphertext) {
    //   try {
    //     const WALLET_SECRET_KEY = process.env.WALLET_SECRET_KEY;
    //     const bytes = CryptoJS.AES.decrypt(ciphertext, WALLET_SECRET_KEY);
    //     const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    //     return plaintext;
    //   } catch (e) {
    //     console.log('decrypt', e);
    //     return false;
    //   }
    // }

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
        for (let i = 0; i < listContact.length; i ++) {
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
