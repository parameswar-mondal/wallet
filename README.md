# wallet-coding-challenge!
The openapi specification for the wallet coding challenge. The challenge is to create an API which matches the specification below which allows a customer to create and view a wallet, apply some transcations (debit and withdrawls) and view a list of all transcations for a specific wallet.

## Used technologies
- Node.js (v18.15.0)
- Express.js (v4.18.2)
- OpenAPI/Swagger

## Used PORT
Express Server running Port: ```3000```

## How to install dependencies in the express server?
`npm install`

## How to run the express server?
`npm start`


## OpenAPI/Swagger URL
`http://localhost:3000/api-docs`


## Postman Endpoints

### Creating wallets
```
Method: POST
Endpoint: /wallet
URL: http://localhost:3000/wallet
BODY: {
    "name": "Savings Pot",
    "balance": 10.00
}
```

### Fetching wallets
```
Method: GET
Endpoint: /wallet/{walletId}
URL: http://localhost:3000/wallet/{walletId}
```

### Transactions: Depositing and withdrawing
```
Method: POST
Endpoint: /wallet/{walletId}/transactions
URL: http://localhost:3000/wallet/{walletId}/transactions
BODY: {
    "amount": 20.00,
    "description": "Tea Bill"
}
```

### Transactions List By Wallet ID
```
Method: GET
Endpoint: /wallet/{walletId}/transactions
URL: http://localhost:3000/wallet/{walletId}/transactions
```

