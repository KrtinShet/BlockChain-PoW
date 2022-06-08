# BlockChain-PoW

---

### A Simple and clear concept build of proof of work Blockchain

#### How to Deploy

1. Clone the repo

   `git clone https://github.com/KrtinShet/BlockChain-PoW.git`

2. Run a redis server from docker

   `docker run -d --name redis-pow -p 6379:6379 redis`

3. Install the dependencies

   `npm i`

4. Run the main root instance

   `npm start`

5. Run peer instance

   `npm run dev-peer`

   > for N instances run this code n times

### API Docs

GET /api/blocks  
desc: returns the chain

POST /api/mine  
body: expects any random data
desc: adds the blocks to the chain  
**_this is just for testing that data can be inserted into blockchian_**

POST /api/transact
desc: adds the transaction to the transactionPool

GET /api/transaction-pool-map  
desc: retuns list of transactions (Transaction Object)

GET /api/mine-transactions  
desc: takes the transactions from Pool, mines and then adds the block to the chain

GET /api/wallet-info  
desc: Retuns the Json object containing address and balance of the wallet
