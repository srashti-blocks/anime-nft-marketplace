const hre = require("hardhat");

async function main() {
  const AnimeNFT = await hre.ethers.getContractFactory("AnimeNFT");
  const nft = await AnimeNFT.deploy();
  await nft.waitForDeployment();
  console.log("Contract deployed to:", await nft.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});