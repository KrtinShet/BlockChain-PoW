const { GENESIS_BLOCK_DATA } = require("../config");
const cryptoHash = require("./../utils/cryptoHash");
const Block = require("./Block");
describe("Block", () => {
  const timestamp = 2000;
  const lastHash = "foo-hash";
  const hash = "bar-hash";
  const data = ["blockchain", "data"];
  const block = new Block({
    timestamp,
    lastHash,
    hash,
    data,
  });

  it("has a timestamp, lastHash, hash, and data property", () => {
    expect(block.timestamp).toEqual(timestamp);
    expect(block.lastHash).toEqual(lastHash);
    expect(block.hash).toEqual(hash);
    expect(block.data).toEqual(data);
    // expect(block.nonce).toEqual(nonce);
    // expect(block.difficulty).toEqual(difficulty);
  });

  describe("genesis()", () => {
    const genesisBlock = Block.genesis();
    it("returns genesis block ", () => {
      expect(genesisBlock instanceof Block).toBe(true);
    });
    it("returns genesis data ", () => {
      expect(genesisBlock).toEqual(GENESIS_BLOCK_DATA);
    });
  });

  describe("mineBlock()", () => {
    const lastBlock = Block.genesis();
    const data = "mined data";
    const minedBlock = Block.mineBlock({ lastBlock, data });

    it("returns a Block instance", () => {
      expect(minedBlock instanceof Block).toBe(true);
    });

    it("`lastHash` to be the `hash` of lastBlock", () => {
      expect(minedBlock.lastHash).toEqual(lastBlock.hash);
    });
    it("sets  the `data`", () => {
      expect(minedBlock.data).toEqual(data);
    });
    it("sets  the `timestamp`", () => {
      expect(minedBlock.timestamp).not.toEqual(undefined);
    });
    it("creates a SHA-256 `hash` based on the proper inputs", () => {
      expect(minedBlock.hash).toEqual(
        cryptoHash(
          minedBlock.timestamp,
          lastBlock.hash,
          data
        )
      );
    });
  });
});
