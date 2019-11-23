const CoinKey = require('coinkey') 
const ck = new CoinKey.createRandom()

// Encrypting
const crypto = require('crypto')
const algorithm = 'aes-192-cbc';
const password = 'meatballs2000';
// Key length is dependent on the algorithm. In this case for aes192, it is
// 24 bytes (192 bits).
// Use async `crypto.scrypt()` instead.
const key = crypto.scryptSync(password, 'salt', 24);
// Use `crypto.randomBytes()` to generate a random iv instead of the static iv
// shown here.
// const iv = Buffer.alloc(16, 0); // Initialization vector.


// Hashing
const sha256Hasher  = require('./sha256.js')

class Wallet {
    /**
     * @param  {number} ownerId
     */
    constructor (ownerId, hashedPassword) {
        const ck = new CoinKey.createRandom()
        const privateKey = Buffer.from(ck.privateKey)
        this.ivForPrivateKey = crypto.randomBytes(16)

        this.privateKeyEncrypted = encrypt(privateKey, this.ivForPrivateKey).toString('hex')
        this.publicKey = ck.publicKey.toString('hex')
        this.address = ck.publicAddress.toString('hex')
        this.ownerId = ownerId
        this.hashedPassword = hashedPassword
    }

    getPrivateKey (password, salt) {
        const hashedPassword = sha256Hasher(password, salt)
        if (hashedPassword == this.hashedPassword) {
            const privateKeyEncryptedBuf = Buffer.from(this.privateKeyEncrypted)
            const privateKey = decrypt(privateKeyEncryptedBuf, this.ivForPrivateKey)
            return privateKey.toString('hex')
        }
    }
}



function encrypt (buf, iv) {
    const cipher = crypto.createCipheriv(algorithm, key, iv)
    let encrypted = cipher.update(buf, )
    encrypted = Buffer.concat([encrypted, cipher.final()])
    return encrypted
}

function decrypt (buf, iv) {
    const decipher = crypto.createDecipheriv(algorithm, key, iv)
    let decrypted = decipher.update(buf)
    decrypted = Buffer.concat([decrypted, decipher.final()])
    return decrypted
}

module.exports = Wallet