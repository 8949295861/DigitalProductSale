require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

let secret = require("./secreate")
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 module.exports = {
  solidity: "0.8.4",
  networks: {
    matic:{
      url:secret.url,
      accounts:[secret.key]
    },
    rinkeby:{
      url:secret.url,
      accounts:[secret.key]
    }
  },
  etherscan:{
    apiKey:"P7FPKC85UQRR8ICI5QZNMWUW6X5NR3RSA3"
  }
};
