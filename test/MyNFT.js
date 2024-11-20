const { expect } = require("chai");

describe("MyNFT", function () {
  let MyNFT, myNFT, owner, addr1;

  beforeEach(async function () {
    // Pobieramy konta testowe
    [owner, addr1] = await ethers.getSigners();

    // Tworzymy fabrykę kontraktów i wdrażamy kontrakt
    MyNFT = await ethers.getContractFactory("MyNFT");
    myNFT = await MyNFT.deploy();
    await myNFT.waitForDeployment(); // Czekamy na zakończenie wdrożenia
  });

  it("Should deploy successfully", async function () {
    // Sprawdzamy, czy kontrakt ma poprawny adres
    const contractAddress = await myNFT.getAddress();
    expect(contractAddress).to.properAddress;
  });

  it("Should mint an NFT", async function () {
    // Mintujemy nowe NFT dla addr1
    const tx = await myNFT.mint(addr1.address);
    await tx.wait();

    // Sprawdzamy, czy addr1 otrzymało token
    const balance = await myNFT.balanceOf(addr1.address);
    expect(balance).to.equal(1);

    // Sprawdzamy właściciela tokenu o ID 1
    const ownerOfToken = await myNFT.ownerOf(1);
    expect(ownerOfToken).to.equal(addr1.address);
  });
});

