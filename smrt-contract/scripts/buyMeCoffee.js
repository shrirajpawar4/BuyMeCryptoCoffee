const hre = require("hardhat");

async function getBalance(address) {
  const balanceBigInt = await hre.ethers.provider.getBalance(address);

  return hre.ethers.utils.formatEther(balanceBigInt);
}

async function printBalance(addresses) {
  let idx = 0;
  for (const address of addresses) {
  console.log(`Address ${idx} balance: `, await getBalance(address));
  idx++;
  }
}

async function printMessage(memos) {
  for (const memo of memos) {
    const timestamp = memo.timestamp;
    const tipper = memo.name;
    const tipperAddress = memo.from;
    const message = memo.message;
    
    console.log(`At ${timestamp}, ${tipper} (${tipperAddress}) said: "${message}"`);
  }
}

async function main() {
  const [owner, tipper, tipper2, tipper3 ] = await hre.ethers.getSigners();


  const BuyMeCryptoCoffee = await hre.ethers.getContractFactory("BuyMeCryptoCoffee");
  const buyMeCoffee = await BuyMeCryptoCoffee.deploy();

  await buyMeCoffee.deployed();
  console.log("Contract deployed to: ", buyMeCoffee.address);

  const addresses = [owner.address, tipper.address, buyMeCoffee.address];
  console.log("__Start__");
  await printBalance(addresses);


  const tip = {value: hre.ethers.utils.parseEther("1")};
  await buyMeCoffee.connect(tipper).getCoffee("Utkarsh", "Keep it up", tip);
  await buyMeCoffee.connect(tipper2).getCoffee("Sahil", "Great Going", tip);
  await buyMeCoffee.connect(tipper3).getCoffee("Shree", "Lessgo!", tip);

  console.log("__Bought Coffee");
  await printBalance(addresses);

  await buyMeCoffee.connect(owner).withdraw();
  console.log("__funds withdrawn__");
  await printBalance(addresses);

  console.log("__see messages__");
  const memos = await buyMeCoffee.getMemos();
  printMessage(memos);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

  //0x796AAaA799A802Ce35f892Dfc40F7fe973d8Fc19