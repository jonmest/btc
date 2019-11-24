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

})

test('is private key is encrypted and decrypted properly', () => {
    expect(account.wallet.getPrivateKey(password, account.salt)).toEqual(account.wallet.privateKey)
})

test('if account wallet can be made from WIF', () => {
    const accountFromWIF = new Account("Erik", "Karlsson", "0006188296", password, 'cSWvrS4KGvnn8RrMNZraCQT4hoqBY99UgB4xbD1EAAYGTibqaRPz')
    expect(accountFromWIF.wallet).toBeDefined()
    expect(accountFromWIF.wallet.getPrivateKey(password, accountFromWIF.salt)).toEqual('cSWvrS4KGvnn8RrMNZraCQT4hoqBY99UgB4xbD1EAAYGTibqaRPz')
})

test('if address P2PKH address NOT starts with a 1 (real network)', () => {
    expect(false).toEqual(account.wallet.address.startsWith('1'))
})

test('if we can check balance on empty wallet', async() => {
      const balance = await account.wallet.getBalance()
      expect(await balance).toEqual(0)
      expect(await balance).toBeDefined()
})

test('if we can check balance on funded wallet', async () => {
    const accountFromWIF = new Account("Erik", "Karlsson", "0006188296", password, 'cT4S5cy8aZSF22ir3AuWYYtnKt8MX11tsKkR3AY7JPNjp5xmz9Fh')
    const balance = accountFromWIF.wallet.getBalance()
    expect(await balance).toBeDefined()
    expect(await balance).not.toEqual(0)
})

test('if we can fetch last transaction', async () => {
    const accountFromWIF = new Account("Erik", "Karlsson", "0006188296", password, 'cT4S5cy8aZSF22ir3AuWYYtnKt8MX11tsKkR3AY7JPNjp5xmz9Fh')
    const lastTransaction = accountFromWIF.wallet.lastTransaction()
    expect(await lastTransaction).toBeDefined()
    expect(await typeof lastTransaction).toEqual('object')
})