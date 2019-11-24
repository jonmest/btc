const Btc = require('bitcoinjs-lib')
const TestNet = Btc.networks.testnet
const tx = new Btc.TransactionBuilder(TestNet)
const Account = require('./Account.js')
const Wallet = require('./Wallet.js')

const password = 'Hejallihopa'


const account1 = new Account("Jon", "Mester", "0006188296", password)
const account2 = new Account("Erik", "Feliz", "0002488296", password)

const wallet1 = account1.wallet
const wallet2 = account2.wallet

let amountWeHave = 3306
let amountToKeep = 3000

let transactionFee = 100

let amountToSend = amountWeHave - amountToKeep - transactionFee
