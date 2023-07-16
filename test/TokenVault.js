const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Vault", function () {
  let vault;
  let token;

  beforeEach(async function () {
    // Deploying the Vault contract
    const Vault = await ethers.getContractFactory("TokenVault");
    vault = await Vault.deploy("0xTOKEN_ADDRESS"); // Replace with your token address
    await vault.deployed();

    // Deploying the Token contract
    const Token = await ethers.getContractFactory("ERC20Mock");
    token = await Token.deploy("DummyToken", "DMT");
    await token.deployed();

    // Minting 1000 tokens to the deployer account
    await token.mint(ethers.utils.parseEther("1000"));

    // Approving the Vault contract to spend 100 tokens
    await token.approve(vault.address, ethers.utils.parseEther("100"));
  });

  it("should deposit tokens correctly", async function () {
    // Depositing 10 tokens
    await vault.depositTokens(ethers.utils.parseEther("10"));

    // Checking the balance of the Vault contract
    expect(await token.balanceOf(vault.address)).to.equal(
      ethers.utils.parseEther("10")
    );

    // Checking the total supply of the Vault shares
    expect(await vault.totalShares()).to.equal(ethers.utils.parseEther("10"));

    // Checking the balance of the user
    expect(
      await vault.shareBalances(await ethers.getSigner(0).getAddress())
    ).to.equal(ethers.utils.parseEther("10"));
  });

  it("should withdraw tokens correctly", async function () {
    // Depositing 10 tokens
    await vault.depositTokens(ethers.utils.parseEther("10"));

    // Withdrawing 5 shares
    await vault.withdrawTokens(ethers.utils.parseEther("5"));

    // Checking the balance of the Vault contract
    expect(await token.balanceOf(vault.address)).to.equal(
      ethers.utils.parseEther("5")
    );

    // Checking the total supply of the Vault shares
    expect(await vault.totalShares()).to.equal(ethers.utils.parseEther("5"));

    // Checking the balance of the user
    expect(
      await vault.shareBalances(await ethers.getSigner(0).getAddress())
    ).to.equal(ethers.utils.parseEther("5"));
  });

  it("should calculate shares correctly", async function () {
    // Depositing 10 tokens
    await vault.depositTokens(ethers.utils.parseEther("10"));

    // Checking the balance of the Vault contract
    expect(await token.balanceOf(vault.address)).to.equal(
      ethers.utils.parseEther("10")
    );

    // Checking the total supply of the Vault shares
    expect(await vault.totalShares()).to.equal(ethers.utils.parseEther("10"));

    // Checking the balance of the user
    expect(
      await vault.shareBalances(await ethers.getSigner(0).getAddress())
    ).to.equal(ethers.utils.parseEther("10"));
  });

  it("should revert when trying to withdraw more shares than available", async function () {
    // Depositing 10 tokens
    await vault.depositTokens(ethers.utils.parseEther("10"));

    // Withdrawing 15 shares should revert
    await expect(
      vault.withdrawTokens(ethers.utils.parseEther("15"))
    ).to.be.revertedWith("ERC20: burn amount exceeds balance");
  });
});
