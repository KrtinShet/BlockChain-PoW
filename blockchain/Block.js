const cryptoHash = require("../utils/cryptoHash");
const { GENESIS_BLOCK_DATA } = require("./../config");
class Block {
  constructor({ timestamp, lastHash, hash, data }) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
  }
  static genesis() {
    return new Block(GENESIS_BLOCK_DATA);
  }

  static mineBlock({ lastBlock, data }) {
    const timestamp = Date.now();
    const lastHash = lastBlock.hash;
    return new this({
      timestamp,
      data,
      hash: cryptoHash(timestamp, lastHash, data),
      lastHash,
    });
  }
}

module.exports = Block;
