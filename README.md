# Hardhat LUKSO NFT and Token Project

This repository contains a blockchain project built using the Hardhat framework. The project includes:
1. **MyNFT.sol**: An ERC721 contract for minting and managing NFTs.
2. **MyToken.sol**: An ERC20 contract with an initial token supply.

The contracts are designed for deployment and interaction on the **LUKSO Testnet**.

---

## **Contents of the Repository**
- **`contracts/`**: Contains the smart contracts:
  - `MyNFT.sol`: ERC721 token contract.
  - `MyToken.sol`: ERC20 token contract.
- **`scripts/`**: Deployment scripts for deploying the contracts to a network.
- **`test/`**: Unit tests for both smart contracts.
- **`hardhat.config.js`**: Configuration file for Hardhat.
- **`.gitignore`**: Ensures sensitive files are not committed.
- **`package.json`**: Project dependencies and scripts.
---

## **How to Run the Project**

### **Prerequisites**
Ensure you have the following installed:
- **Node.js**: [Download Node.js](https://nodejs.org/)
- **npm**: Comes with Node.js.

Install project dependencies:
```bash
npm install
```
### **Compile the contracts**
In order to do this run:
```bash
npx hardhat compile
```
### **Testing**
The repository includes unit tests for both `MyNFT` and `MyToken` contracts.
Run command:
```bash
npx hardhat test
```
### **Deploying**
1. Ensure you have a `.env` file in the project root with the following content:
```plaintext
PRIVATE_KEY=your_private_key_here
```
### **Warning:**  **Ensure the wallet has LYXe test tokens.**
2. Deploy by running following command:
```bash
npx hardhat run scripts/deploy.js --network luksoTestnet
```
As a result you will see:
```bash
MyNFT deployed to: 0x123...abc
MyToken deployed to: 0x456...def
```
You can view these contracts on the [LUKSO Block Explorer](https://explorer.execution.testnet.lukso.network/)
--
### **License:**
This project is licensed under the MIT License.


