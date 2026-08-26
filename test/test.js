const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AnimeNFT Contract", function () {
  let animeNFT;
  let owner;
  let addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    const AnimeNFT = await ethers.getContractFactory("AnimeNFT");
    animeNFT = await AnimeNFT.deploy();
  });

  it("Should set the correct name and symbol", async function () {
    expect(await animeNFT.name()).to.equal("JJK Anime NFT");
    expect(await animeNFT.symbol()).to.equal("JJKNFT");
  });

  it("Should allow minting a new token", async function () {
    const tokenURI = "https://ipfs.io/ipfs/QmExampleHash/goku.json";
    
    // Mint token 0 to owner
    await animeNFT.mint(tokenURI);

    expect(await animeNFT.ownerOf(0)).to.equal(owner.address);
    expect(await animeNFT.tokenURI(0)).to.equal(tokenURI);
  });

  it("Should revert if trying to view tokenURI of unminted token", async function () {
    await expect(animeNFT.tokenURI(99)).to.be.revertedWith("Token does not exist");
  });
});