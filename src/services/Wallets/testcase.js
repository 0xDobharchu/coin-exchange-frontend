

// import { Ethereum } from 'src/services/Wallets/Ethereum.js';

const Ethereum = require('src/services/Wallets/Ethereum.js');

const eth = new Ethereum();
eth.network = 'https://rinkeby.infura.io/';
eth.address = '0x1c0abE5b12257451DDcbe51f53f3F888dde32842';
eth.privateKey = '8563aadf70a33fd058bec918f406187cc03e0f144fd3b7202266fcee15813372';

const toAddress = '0x4AF3CEaE9Cebf2e6Af258E0eC353cCBA8cA96162';

const balance = eth.getBalance();

console.log('balance1', balance);

// eth.transfer(toAddress, 0.0001);
