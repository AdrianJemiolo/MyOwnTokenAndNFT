const { expect } = require("chai");

describe("Staking", function () {
  let Staking, staking, Token, token, owner, addr1, addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    Token = await ethers.getContractFactory("MyToken");
    token = await Token.deploy(1000000);
    await token.waitForDeployment();

    Staking = await ethers.getContractFactory("Staking");
    staking = await Staking.deploy(token.getAddress(), 10); // 10 tokens reward per block
    await staking.waitForDeployment();

    await token.transfer(addr1.address, 1000);
    await token.transfer(addr2.address, 1000);
  });

  it("Should allow staking tokens", async function () {
    await token.connect(addr1).approve(staking.getAddress(), 100);
    await staking.connect(addr1).stake(100);

    const stakeInfo = await staking.stakes(addr1.address);
    expect(stakeInfo.amount).to.equal(100);
  });

  it("Should calculate pending rewards correctly", async function () {
    await token.connect(addr1).approve(staking.getAddress(), 100);
    await staking.connect(addr1).stake(100);

    // Simulate blocks passing
    await network.provider.send("evm_mine");
    await network.provider.send("evm_mine");

    const pendingRewards = await staking.pendingRewards(addr1.address);
    expect(pendingRewards).to.be.above(0);
  });

  it("Should allow withdrawal of staked tokens", async function () {
    await token.connect(addr1).approve(staking.getAddress(), 100);
    await staking.connect(addr1).stake(100);

    await staking.connect(addr1).withdraw(50);

    const stakeInfo = await staking.stakes(addr1.address);
    expect(stakeInfo.amount).to.equal(50);
  });
});

