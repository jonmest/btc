const Account = require('../Account.js')
const Transaction = require('../Transaction.js')
let account
let secondAccount
const password = 'Hejallihopa'

beforeEach(() => {
    account = new Account("Jon", "Mester", "0006188296", password, 'cRFVKJZ4HgoWgfAuTLXGYhXp63SxXy6B5vZJSVJtoeS89AFfiPW4')
    secondAccount = new Account("Erik", "Karl", "0006182296", password, 'cS7hs9PrW33UnwT7pPsNsNcSQjTNkyAZUmA16GKLeCmkvqtEsGuo')
})

test('if transaction can be created', async () => {
    const transaction = new Transaction(account, secondAccount, 10)
})

test('if we can fetch all unspent inputs', async () => {
    const inputs = await account.wallet.getAllUnspentInputs()
    console.log(inputs)

})