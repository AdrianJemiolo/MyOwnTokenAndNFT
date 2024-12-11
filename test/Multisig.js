const { expect } = require("chai");

describe("MultiSigWallet", function () {
    let MultiSigWallet, multiSigWallet, owners, required, addr1, addr2, addr3, nonOwner;

    beforeEach(async function () {
        [addr1, addr2, addr3, nonOwner] = await hre.ethers.getSigners();
        owners = [addr1.address, addr2.address, addr3.address];
        required = 2;

        MultiSigWallet = await hre.ethers.getContractFactory("MultiSigWallet");
        multiSigWallet = await MultiSigWallet.deploy(owners, required);
        await multiSigWallet.waitForDeployment();
    });

    it("should deploy with correct owners and required confirmations", async function () {
        expect(await multiSigWallet.getOwners()).to.deep.equal(owners);
        expect(await multiSigWallet.required()).to.equal(required);
    });

    it("should allow deposits", async function () {
        const depositAmount = hre.ethers.parseEther("1.0");
        const tx = await addr1.sendTransaction({ to: multiSigWallet.getAddress(), value: depositAmount });
        await tx.wait();

        const balance = await hre.ethers.provider.getBalance(multiSigWallet.getAddress());
        expect(balance).to.equal(depositAmount);
    });

    it("should allow owners to submit a transaction", async function () {
        const to = nonOwner.address;
        const value = hre.ethers.parseEther("0.5");
        const data = "0x";

        await multiSigWallet.connect(addr1).submitTransaction(to, value, data);
        const transaction = await multiSigWallet.getTransaction(0);

        expect(transaction.to).to.equal(to);
        expect(transaction.value).to.equal(value);
        expect(transaction.executed).to.be.false;
    });

    it("should allow owners to confirm a transaction", async function () {
        await multiSigWallet.connect(addr1).submitTransaction(nonOwner.address, 100, "0x");

        await multiSigWallet.connect(addr2).confirmTransaction(0);
        const transaction = await multiSigWallet.getTransaction(0);

        expect(transaction.confirmations).to.equal(1);
    });

    it("should execute a transaction after enough confirmations", async function () {
        const depositAmount = hre.ethers.parseEther("1.0");
        await addr1.sendTransaction({ to: multiSigWallet.getAddress(), value: depositAmount });

        const to = nonOwner.address;
        const value = hre.ethers.parseEther("0.5");
        const data = "0x";

        await multiSigWallet.connect(addr1).submitTransaction(to, value, data);
        await multiSigWallet.connect(addr1).confirmTransaction(0);
        await multiSigWallet.connect(addr2).confirmTransaction(0);

        await expect(multiSigWallet.connect(addr1).executeTransaction(0))
            .to.emit(multiSigWallet, "ExecuteTransaction")
            .withArgs(addr1.address, 0);

        const transaction = await multiSigWallet.getTransaction(0);
        expect(transaction.executed).to.be.true;
    });

    it("should not allow non-owners to interact with the wallet", async function () {
        await expect(
            multiSigWallet.connect(nonOwner).submitTransaction(nonOwner.address, 100, "0x")
        ).to.be.revertedWith("Not an owner");
    });
});
