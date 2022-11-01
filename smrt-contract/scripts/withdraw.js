const hre = require("hardhat");
const abi = require("../artifacts/contracts/BuyMeCryptoCoffee.sol/BuyMeCryptoCoffee.json");

async function getBalance(provider, address) {
    const balanceBigInt = await provider.getBalance(address);
    return hre.ethers.utils.formatEther(balanceBigInt);
}
async function main() {
    const contractAddress = "0x4a267209489DE6585A284d07183001B3880dC732";
    const contractABI = abi.abi;

    const provider = await new hre.ethers.providers.AlchemyProvider("goerli", process.env.GOERLI_API_KEY);
    const signer = new hre.ethers.Wallet(process.env.PRIVATE_KEY, provider);
    
    const buyMeCoffee = new hre.ethers.Contract(contractAddress, contractABI, signer);

    console.log("current balance of owner: ", await getBalance(provider, signer.address), "ETH");
    const contractBalance = await getBalance(provider, buyMeCoffee.address);
    console.log("current balance of contract: ", await getBalance(provider, buyMeCoffee.address), "ETH");

    if (contractBalance != "0") {
        console.log("Withdrawing Funds");
        const withdrawTxn = await buyMeCoffee.withdraw();
        await withdrawTxn.wait(); 
    } else {
        console.log("No funds withdrawn");
    }

    console.log("current balance of owner: ", await getBalance(provider, signer.address), "ETH");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
