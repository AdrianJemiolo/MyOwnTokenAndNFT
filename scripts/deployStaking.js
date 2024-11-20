async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying Staking contract with account:", deployer.address);

  // Adres kontraktu MyToken
  const tokenAddress = "0x081b82d911D717b98E1439B5Bcebd75b6f061516";

  // Utwórz fabrykę kontraktów i wdroż kontrakt stakingu
  const Staking = await ethers.getContractFactory("Staking");
  const staking = await Staking.deploy(tokenAddress, 10); // 10 tokens reward per block

  // Czekaj na zakończenie transakcji wdrożenia
  const receipt = await staking.deploymentTransaction().wait();
  console.log("Staking contract deployed to:", staking.target);

  // Opcjonalnie: zwróć szczegóły transakcji
  console.log("Transaction hash:", receipt.transactionHash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
