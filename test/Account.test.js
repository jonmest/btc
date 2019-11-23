const Account = require('../Account.js')
let account
const password = 'Hejallihopa'

beforeEach(() => {
    account = new Account("Jon", "Mester", "0006188296", password)
})

test('if account exists', () => {
    expect(account).toBeDefined()
})

test('if account has wallet', () => {
    expect(account.wallet).toBeDefined()
})

test('if wallet has private, public key and address', () => {
    expect(account.wallet.privateKey).toBeDefined()
    expect(account.wallet.address).toBeDefined()

    console.log("Private key: " + account.wallet.privateKey)
    console.log("Public key: " + account.wallet.publicKey)
    console.log("Address: " + account.wallet.address)
})

test('is private key is encrypted and decrypted properly', () => {
    expect(account.wallet.getPrivateKey(password, account.salt)).toEqual(account.wallet.privateKey)
})

test('if account wallet can be made from WIF', () => {
    const accountFromWIF = new Account("Erik", "Karlsson", "0006188296", password, 'cSWvrS4KGvnn8RrMNZraCQT4hoqBY99UgB4xbD1EAAYGTibqaRPz')
    expect(accountFromWIF.wallet).toBeDefined()
    expect(accountFromWIF.wallet.getPrivateKey(password, accountFromWIF.salt)).toEqual('cSWvrS4KGvnn8RrMNZraCQT4hoqBY99UgB4xbD1EAAYGTibqaRPz')
})

test('if address P2PKH address starts with a 1 (real network)', () => {
    expect(false).toEqual(account.wallet.address.startsWith('1'))
})