const Account = require('../Account.js')
const Transaction = require('../Transaction.js')
let account
let secondAccount
const password = 'Hejallihopa'

beforeEach(() => {
    account = new Account("Jon", "Mester", "0006188296", password, 'cT4S5cy8aZSF22ir3AuWYYtnKt8MX11tsKkR3AY7JPNjp5xmz9Fh')
    secondAccount = new Account("Erik", "Karl", "0006182296", password)
})

test('if transaction can be created', () => {
    const transaction = new Transaction(account, secondAccount, 100)
})