require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.19",
  networks: {
    luksoTestnet: {
      url: "https://rpc.testnet.lukso.network", 
      accounts: [process.env.PRIVATE_KEY], 
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};


