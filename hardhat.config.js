require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require("dotenv").config();
require("hardhat-deploy");
require("./tasks")




const SEPOLIA_URL = process.env.SEPOLIA_URL
const PRIVATE_ACCOUNTS_KEY_1 = process.env.PRIVATE_ACCOUNTS_KEY_1
const PRIVATE_ACCOUNTS_KEY_2 = process.env.PRIVATE_ACCOUNTS_KEY_2
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
  defaultNetwork: "hardhat",
  networks:{
    sepolia: {
      url: SEPOLIA_URL,           // alchemy, infure,
      accounts: [PRIVATE_ACCOUNTS_KEY_1,PRIVATE_ACCOUNTS_KEY_2],
      chainId: 11155111
    }
  },
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_API_KEY
    }
  },
  namedAccounts:{
    firsetAccount:{
      default: 0
    },
    secondAccount:{
      default: 1
    }
  }
};

/*
https://mainnet.infura.io/v3/00b99ad1cd1448d6b83059081e4f6cdb
00b99ad1cd1448d6b83059081e4f6cdb
*/