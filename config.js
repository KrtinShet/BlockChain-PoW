const MINE_RATE = 1000;
const INITIAL_DIFFICULTY = 3;

const STARTING_BALANCE = 1000;

const REWARD_INPUT = { address: "*authorized-reward*" };
const GENESIS_BLOCK_DATA = {
  timestamp: 1,
  lastHash: "-----",
  hash: "hash-one",
  difficulty: INITIAL_DIFFICULTY,
  nonce: 0,
  data: [],
};

const MINING_REWARD = 50;

module.exports = {
  GENESIS_BLOCK_DATA,
  MINE_RATE,
  STARTING_BALANCE,
  REWARD_INPUT,
  MINING_REWARD,
};
