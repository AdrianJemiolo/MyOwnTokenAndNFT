const { expect } = require("chai");

describe("MyToken", function () {
  let MyToken, myToken, owner, addr1;

  beforeEach(async function () {
  
    [owner, addr1] = await ethers.getSigners();

    MyToken = await ethers.getContractFactory("MyToken");
    myToken = await MyToken.deploy(1000000); 
    await myToken.waitForDeployment(); 
  });

  it("Should deploy successfully", async function () {
    const contractAddress = await myToken.getAddress();
    expect(contractAddress).to.properAddress;
  });

  it("Should have the correct initial supply", async function () {
    const totalSupply = await myToken.totalSupply();
    expect(totalSupply).to.equal(1000000);
  });

  it("Should transfer tokens", async function () {
    const transferAmount = 500;

    const tx = await myToken.transfer(addr1.address, transferAmount);
    await tx.wait();

    const addr1Balance = await myToken.balanceOf(addr1.address);
    expect(addr1Balance).to.equal(transferAmount);
  });
});

