const Btc = require('bitcoinjs-lib')
const TestNet = Btc.networks.testnet
const Account = require('./Account.js')
const Wallet = require('./Wallet.js')


class Transaction {
    constructor (sender, receiver, amountSatoshis) {
        this.sender = sender
        this.receiver = receiver
        this.amount = amountSatoshis
        this.txb = new Btc.TransactionBuilder(TestNet)

        this.transaction = this.createTransaction()
 
    }

    async createTransaction () {
        this.senderLastTransaction = await this.sender.wallet.lastTransaction()
        const lastHash = await this.senderLastTransaction.tx_hash
        const lastOutN = await this.senderLastTransaction.tx_output_n

        this.txb.addInput(await lastHash, await lastOutN)

        this.txb.addOutput(await this.receiver.wallet.address, this.amount)

        const keyPair = Btc.ECPair.fromWIF(this.sender.wallet.privateKey, TestNet)
        this.txb.sign(0, keyPair)


        const transaction = this.txb.build()
        console.log(transaction.toHex())
        return transaction.toHex()
    }

}

module.exports = Transaction