const crypto = require('crypto')
const algorithm = 'aes-192-cbc';
const password = 'meatballs2000';
// Key length is dependent on the algorithm. In this case for aes192, it is
// 24 bytes (192 bits).
// Use async `crypto.scrypt()` instead.
const key = crypto.scryptSync(password, 'salt', 24);
// Use `crypto.randomBytes()` to generate a random iv instead of the static iv
// shown here.
const iv = Buffer.alloc(16, 0); // Initialization vector.
const cipher = crypto.createCipheriv(algorithm, key, iv);

function encrypt (str) {
    const buf = Buffer.from(str)
    const cipher = crypto.createCipheriv(algorithm, key, iv)
    let encrypted = cipher.update(buf)
    encrypted = Buffer.concat([encrypted, cipher.final()])
    return encrypted.toString('hex')
}


module.exports = encrypt