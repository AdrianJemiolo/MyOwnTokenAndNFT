const { expect } = require("chai");

describe("MyNFT", function () {
  let MyNFT, myNFT, owner, addr1;

  beforeEach(async function () {

    [owner, addr1] = await ethers.getSigners();

  
    MyNFT = await ethers.getContractFactory("MyNFT");
    myNFT = await MyNFT.deploy();
    await myNFT.waitForDeployment(); 
  });

  it("Should deploy successfully", async function () {
 
    const contractAddress = await myNFT.getAddress();
    expect(contractAddress).to.properAddress;
  });

  it("Should mint an NFT", async function () {

    const tx = await myNFT.mint(addr1.address);
    await tx.wait();


    const balance = await myNFT.balanceOf(addr1.address);
    expect(balance).to.equal(1);


    const ownerOfToken = await myNFT.ownerOf(1);
    expect(ownerOfToken).to.equal(addr1.address);
  });
});

