require("@nomiclabs/hardhat-waffle");
const fs = require("fs")
const privateKey = fs.readFileSync(".secret").toString()
const projectId = "2d0a50a521e7130e5038f1550e3a5e80f1709ee6"

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    hardhat: {
      chainId: 1337
    },
    mumbai: {
      url: `https://rpc-mumbai.maticvigil.com/v1/${projectId}`,
      accounts: [privateKey]
    },
    mainnet:{
      url: `https://rpc-mumbai.maticvigil.com/v1/${projectId}`,
      accounts: [privateKey]
    }
  },
  solidity: "0.8.9",
};
