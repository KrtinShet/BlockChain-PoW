const express = require("express");
const BlockChain = require("./blockchain");
const PubSub = require("./utils/pubsub");
const request = require("request");
const isDevelopment = process.env.ENV === "development";

const REDIS_URL = isDevelopment
  ? "redis://127.0.0.1:6379"
  : "redis://h:p05f9a274bd0e2414e52cb9516f8cbcead154d7d61502d32d9750180836a7cc05@ec2-34-225-229-4.compute-1.amazonaws.com:19289";
const DEFAULT_PORT = 3000;
const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`;

const app = express();
const blockchain = new BlockChain();
const pubsub = new PubSub({
  blockchain,
});

app.use(express.json());

app.get("/blocks", (req, res) => {
  res.json(blockchain.chain);
});

app.post("/mine", (req, res) => {
  const { data } = req.body;
  blockchain.addBlock({ data });
  pubsub.broadcastChain();
  res.json(blockchain.chain);
});

const syncWithRootState = () => {
  request({ url: `${ROOT_NODE_ADDRESS}/blocks` }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const rootChain = JSON.parse(body);

      console.log("replace chain on a sync with", rootChain);
      blockchain.replaceChain(rootChain);
    }
  });

  // request(
  //   { url: `${ROOT_NODE_ADDRESS}/transaction-pool-map` },
  //   (error, response, body) => {
  //     if (!error && response.statusCode === 200) {
  //       const rootTransactionPoolMap = JSON.parse(body);

  //       console.log(
  //         "replace transaction pool map on a sync with",
  //         rootTransactionPoolMap
  //       );
  //       transactionPool.setMap(rootTransactionPoolMap);
  //     }
  //   }
  // );
};

let PEER_PORT;

if (process.env.GENERATE_PEER_PORT === "true") {
  PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}

const PORT = process.env.PORT || PEER_PORT || DEFAULT_PORT;
app.listen(PORT, () => {
  console.log(`listening at localhost:${PORT}`);

  if (PORT !== DEFAULT_PORT) {
    syncWithRootState();
  }
});
