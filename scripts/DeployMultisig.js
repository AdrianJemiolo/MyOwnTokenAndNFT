const ethers = require("ethers");

async function main() {
  const [addr1] = await hre.ethers.getSigners();

  console.log("Deploying MultiSigWallet contract with the account:", addr1.address);

  const wallet1 = ethers.Wallet.createRandom();
  const wallet2 = ethers.Wallet.createRandom();

  const owners = [
    addr1.address, 
    wallet1.address, 
    wallet2.address, 
  ];

  const requiredConfirmations = 2;

  const MultiSigWallet = await hre.ethers.getContractFactory("MultiSigWallet");
  const multiSigWallet = await MultiSigWallet.deploy(owners, requiredConfirmations);
  await multiSigWallet.waitForDeployment();

  console.log("MultiSigWallet deployed to:", await multiSigWallet.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
