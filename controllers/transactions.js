const uuid = require('uuid');

// In-memory data store for wallets and transactions
const wallets = require('../localdb/wallets');
const transactions = require('../localdb/transactions');

// Create a new transaction for a wallet
exports.createTransaction = (req, res, next) => {
    try {
        const { amount, description } = req.body;
        if (!amount) {
            return res.status(400).json({ error: 'Invalid request body supplied' });
        }
        const wallet = wallets[req.params.id];
        if (!wallet) {
            return res.status(404).json({ error: 'Wallet not found' });
        }
        if (amount < 0 && Math.abs(amount) > Math.abs(wallet.balance)) {
            return res.status(404).json({ error: 'Insufficient wallet balance, please withdraw within your wallet balance.' });
        }

        const id = uuid.v4();
        const date = new Date().toISOString();
        const balance = wallet.balance + amount;
        const transaction = { id, walletId: wallet.id, amount, balance, description, createdDate: date };
        transactions[id] = transaction;
        wallet.balance += amount;
        return res.status(201).json(transaction);
    } catch (err) {
        next(err);
    }
};

// Fetch all transactions for a wallet
exports.fetchTransactionsForWallet = (req, res, next) => {
    try {
        const wallet = wallets[req.params.id];
        if (!wallet) {
            return res.status(404).json({ error: 'Wallet not found' });
        }
        const walletTransactions = Object.values(transactions)
            .filter((t) => t.walletId === wallet.id)
            .sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
        return res.json(walletTransactions);
    } catch (err) {
        next(err);
    }
};