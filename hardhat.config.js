require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // Dodajemy obsługę zmiennych środowiskowych

module.exports = {
  solidity: "0.8.19",
  networks: {
    luksoTestnet: {
      url: "https://rpc.testnet.lukso.network", // URL LUKSO Testnet RPC
      accounts: [process.env.PRIVATE_KEY], // Pobieranie klucza prywatnego z pliku .env
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};


