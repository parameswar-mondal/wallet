const router = require('express').Router();

// controllers
const home = require('../controllers/home');
const wallet = require('../controllers/wallet');
const transactions = require('../controllers/transactions');

// home 
router.get('/', home.getHome);

// Create a new wallet
router.post('/wallet', wallet.createNewWallet);

// Fetch a wallet by ID
router.get('/wallet/:id', wallet.fetchWalletById);

// Create a new transaction for a wallet
router.post('/wallet/:id/transactions', transactions.createTransaction);

// Fetch all transactions for a wallet
router.get('/wallet/:id/transactions', transactions.fetchTransactionsForWallet);


module.exports = router;