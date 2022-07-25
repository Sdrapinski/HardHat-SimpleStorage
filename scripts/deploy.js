//imports
const { network } = require("hardhat");
const hardhat = require("hardhat");
require("@nomiclabs/hardhat-etherscan");

async function main() {
  const SimpleStoragefactory = await hardhat.ethers.getContractFactory(
    "SimpleStorage"
  );
  console.log("Deploying");
  const simpleStorage = await SimpleStoragefactory.deploy();
  await simpleStorage.deployed();
  console.log("Deployed to: " + simpleStorage.address);
  console.log(network.config);
  if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
    await simpleStorage.deployTransaction.wait(6);
    await verify(simpleStorage.address, []);
  }
  const currentValue = await simpleStorage.retrive();
  console.log(`Current value is: ${currentValue}`);

  // update
  const transactionResponse = await simpleStorage.store(7);
  await transactionResponse.wait(1);
  const updatedValue = await simpleStorage.retrive();
  console.log(`updated value: ${updatedValue}`);
}

async function verify(contractAddress, args) {
  console.log("Veryfying contract...");
  try {
    await hardhat.run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already Verified")) {
      console.log("Already verified");
    } else {
      console.log(e);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
