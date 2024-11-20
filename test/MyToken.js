const { expect } = require("chai");

describe("MyToken", function () {
  let MyToken, myToken, owner, addr1;

  beforeEach(async function () {
    // Pobieramy konta testowe
    [owner, addr1] = await ethers.getSigners();

    // Tworzymy fabrykę kontraktów i wdrażamy kontrakt
    MyToken = await ethers.getContractFactory("MyToken");
    myToken = await MyToken.deploy(1000000); // Podajemy początkową podaż
    await myToken.waitForDeployment(); // Czekamy na zakończenie wdrożenia
  });

  it("Should deploy successfully", async function () {
    // Sprawdzamy, czy kontrakt ma poprawny adres
    const contractAddress = await myToken.getAddress();
    expect(contractAddress).to.properAddress;
  });

  it("Should have the correct initial supply", async function () {
    // Sprawdzamy początkową podaż
    const totalSupply = await myToken.totalSupply();
    expect(totalSupply).to.equal(1000000);
  });

  it("Should transfer tokens", async function () {
    const transferAmount = 500;

    // Transferujemy tokeny do addr1
    const tx = await myToken.transfer(addr1.address, transferAmount);
    await tx.wait();

    // Sprawdzamy saldo addr1
    const addr1Balance = await myToken.balanceOf(addr1.address);
    expect(addr1Balance).to.equal(transferAmount);
  });
});

