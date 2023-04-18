const uuid = require('uuid');

// In-memory data store for wallets and transactions
const wallets = require('../localdb/wallets');

// Create a new wallet
exports.createNewWallet = (req, res, next) => {
    try {
        const { name, balance } = req.body;
        if (!name || !balance || balance < 0) {
            return res.status(400).json({ error: 'Invalid request body supplied' });
        }
        const id = uuid.v4();
        const createdDate = new Date().toISOString();
        wallets[id] = { id, name, balance, createdDate };
        return res.status(201).json(wallets[id]);
    } catch (err) {
        next(err);
    }
};

// Fetch a wallet by ID
exports.fetchWalletById = (req, res, next) => {
    try {
        const wallet = wallets[req.params.id];
        if (!wallet) {
            return res.status(404).json({ error: 'Wallet not found' });
        }
        return res.json(wallet);
    } catch (err) {
        next(err);
    }
};