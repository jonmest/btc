'use strict'
const CoinKey = require('coinkey') 
const ck = new CoinKey.createRandom()

// Encrypting
const crypto = require('crypto')
const algorithm = 'aes-256-cbc'
const password = 'meatballs2000';
// Key length is dependent on the algorithm. In this case for aes192, it is
// 24 bytes (192 bits).
// Use async `crypto.scrypt()` instead.
const key = crypto.scryptSync(password, 'salt', 32);
// Use `crypto.randomBytes()` to generate a random iv instead of the static iv
// shown here.
// const iv = Buffer.alloc(16, 0); // Initialization vector.


// Hashing
const sha256Hasher  = require('./sha256.js')




const Btc = require('bitcoinjs-lib')
const TestNet = Btc.networks.testnet


class Wallet {
    /**
     * @param {string} ownerId
     * @param {string} hashedPassword of user it will belong to
     */
    constructor (ownerId, hashedPassword, WIF) {
        let keyPair = null;
        if (WIF) {
            keyPair = new Btc.ECPair.fromWIF(WIF, TestNet)
        } else {
            keyPair = Btc.ECPair.makeRandom({ network: TestNet })
        }

        this.ivForPrivateKey = crypto.randomBytes(16)

        this.privateKey = keyPair.toWIF()
        this.publicKey = keyPair.publicKey.toString('hex')

        const { address } = Btc.payments.p2pkh({ pubkey: keyPair.publicKey, network: TestNet })
        this.address = address

        this.privateKeyEncrypted = encrypt(this.privateKey, this.ivForPrivateKey)
        this.ownerId = ownerId
        this.hashedPassword = hashedPassword
    }
    /**
     * Get decrypted private WIF key
     * @param  {string} password
     * @param  {string} salt
     */
    getPrivateKey (password, salt) {
        if (!password || !salt) {
            throw new Error('You must include a password and salt.')
        }
        const hashedPassword = sha256Hasher(password, salt)
        if (hashedPassword == this.hashedPassword) {
            const privateKeyEncryptedBuf = this.privateKeyEncrypted
            const privateKey = decrypt(privateKeyEncryptedBuf, this.ivForPrivateKey)
            return privateKey
        } else {
            throw new Error('Incorrect password')
        }
    }
}


function encrypt (buf, iv) {
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv)
    let encrypted = cipher.update(buf)
    encrypted = Buffer.concat([encrypted, cipher.final()])
    return encrypted.toString('hex')
}

function decrypt (buf, iv) {
    const encrypted = Buffer.from(buf, 'hex')
    let decipher = crypto.createDecipheriv(algorithm, key, iv)
    let decrypted = decipher.update(encrypted)
    decrypted = Buffer.concat([decrypted, decipher.final()])
    return decrypted.toString()
}

module.exports = Wallet