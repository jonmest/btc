const crypto = require('crypto');

function sha256Hasher (toHash, existingSalt) {
    const salt = existingSalt || generateRandomString(16)
    const hash = crypto.createHmac('sha256', salt)
    hash.update(toHash)
    const value = hash.digest('hex')
    return value.concat(salt)
}

function generateRandomString (length) {
    return crypto.randomBytes(Math.ceil(length/2))
                .toString('hex')
                .slice(0, length)
}


module.exports = sha256Hasher