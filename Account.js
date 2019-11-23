const Wallet = require('./Wallet.js')
const sha256Hasher  = require('./sha256.js')
const encrypt = require('./quickEncrypt.js')

class Account {
    constructor (first, last, idNumber, password, WIF) {

        this.firstName = first
        this.lastName = last
        this.idNumber = idNumber

        this.hashedPassword = sha256Hasher(password)
        this.id = encrypt(first.concat(this.last, this.hashedPassword))

        if (WIF) {
            this.wallet = new Wallet(this.id, this.hashedPassword, WIF)
        } else {
            this.wallet = new Wallet(this.id, this.hashedPassword)
        }
    }

    /**
     * @param  {String} password
     */
    getPrivateKey (password) {
        const hashedPassword = sha256Hasher(password, this.salt)
        if (hashedPassword === this.hashedPassword) {
            return this.wallet.getPrivateKey(password, this.salt)
        }
    }

    get salt () {
        return this.hashedPassword.slice(-16)
    }
}

const one = new Account("Jon", "Mester", "0006188296", "Hej")

module.exports = Account
