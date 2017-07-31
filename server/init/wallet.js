import Web3 from 'web3';
import HookedWeb3Provider from 'hooked-web3-provider';
import { keystore, txutils } from 'eth-lightwallet';
import Q from 'q';
import { password, seed, ethereumEndpoint } from './walletconfig.js';
import { controllers } from '../db';
import { sendSMS } from './twilio';

const usersController = controllers && controllers.users;

const web3 = new Web3();

// the seed is stored encrypted by a user-defined password
let globalKeystore;
let globalKey;

keystore.prototype.passwordProvider = function (callback) {
  callback(null, password);
};

export function init() {

  keystore.deriveKeyFromPassword(password, (err, pwDerivedKey) => {

    globalKey = pwDerivedKey;
    globalKeystore = new keystore(
      seed,
      globalKey);

    setWeb3Provider(globalKeystore);
    globalKeystore.generateNewAddress(globalKey, 3);
  });
}

function setWeb3Provider(keystore) {
    const web3Provider = new HookedWeb3Provider({
      host: ethereumEndpoint,
      transaction_signer: keystore
    });

    web3.setProvider(web3Provider);
}

function getBalanceForAccount(address) {
  const deferredBalance = Q.defer();
  web3.eth.getBalance(address, (err, balances) => {
    (err) ? deferredBalance.reject(err) : deferredBalance.resolve((balances / 1.0e18).toFixed(2));
  });

  return deferredBalance.promise;
}

export function getAccounts(req, res) {
  const accounts = [];
  const deferredBalances = [];
  const deferredUsers = [];

  const addresses = globalKeystore.getAddresses();
  addresses.forEach((address, index) => {
    deferredBalances.push(getBalanceForAccount(address).then((result) => {
      accounts.push({address, balance: result});
    }));
    deferredUsers.push(usersController.getUserFromBlockchain(address).then((user) => {
      return user;
      //console.log(accounts);
      //accounts.find(x => x.address === address).name = user.name;
    }));
  });
  Q.all(deferredBalances).then(() => {
    return Q.all(deferredUsers);
  }).then((users) => {
    accounts.forEach((account) => {
      account.name = users.find(x => x.blockchain_id === account.address).name;
      account.phone = users.find(x => x.blockchain_id === account.address).phone;
    });
    return res.json(accounts);
  });
}

export function getTransactions(req, res) {
  const currAddress = '0x' + req.params.id;
  const transactions = [];

  const numTrans = web3.eth.getTransactionCount(currAddress);
  transactions.push(numTrans);
  /* const endBlockNumber = web3.eth.blockNumber;
  const startBlockNumber = endBlockNumber - 6;

  for (let i = startBlockNumber; i <= endBlockNumber; i++) {
    const block = web3.eth.getBlock(i, true);
    if (block != null && block.transactions != null) {
      block.transactions.forEach((e) => {
        if (currAddress === e.from || currAddress === e.to) {
          transactions.push(e);
          console.log(e);
        }
      });
    }
  } */
  return res.json(transactions);
}

export function sendEth(fromAddr, toAddr, valueEth) {
  const value = parseFloat(valueEth)*1.0e18;
  const gasPrice = 50000000000;
  const gas = 50000;
  web3.eth.sendTransaction({from: fromAddr, to: toAddr, value, gasPrice, gas}, (err, txhash) => {
    //console.log('error: ' + err)
    //console.log('txhash: ' + txhash)
  });
}

export function buyProduct(req, res) {
  const buyerId = req.params.id;
  const prod = req.body;

  if (buyerId === prod.seller_id) {
    return res.status(200).send('BUYERSELLERSAME');
  }
  sendEth(buyerId, prod.seller_id, prod.price);

  return res.status(200).send('SUCCESS');
}

export function transferMoney(req, res) {
  const toPhone = req.params.id;
  const amount = req.body.amount;

  // The money will always come from the SMS Administrator account for now
  //  Blockchain ID: 3cf7dc91837ee0732ff29a42dc084aba6d119aff
  usersController.getUserFromPhone(toPhone).then((toUser) => {
    // Get the blockchain id for the user
    sendSMS({to: toPhone, body:'Administrator transferred $'+amount+' to your account'});
    sendEth('4999e240151dd7a234e2591a84383c3503692639', toUser.blockchain_id, amount);
    return res.status(200).send('Updated successfully');
  });
}

export default {
  init,
  getAccounts,
  getTransactions,
  sendEth,
  buyProduct,
  transferMoney
};
