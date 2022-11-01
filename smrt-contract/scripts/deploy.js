const hre = require("hardhat");

async function main(params) {
    const BuyMeCryptoCoffee = await hre.ethers.getContractFactory("BuyMeCryptoCoffee");
    const buyMeCoffee = await BuyMeCryptoCoffee.deploy();

    await buyMeCoffee.deployed();

    console.log("Contract deployed at: ", buyMeCoffee.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });