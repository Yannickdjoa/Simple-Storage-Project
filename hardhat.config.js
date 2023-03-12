require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
require("@nomiclabs/hardhat-etherscan")
require("hardhat-gas-reporter")
require("solidity-coverage")

const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY
const GOERLI_URL = process.env.GOERLI_URL
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.18",
    defaultNetwork: "hardhat",
    networks: {
        goerli: {
            url: GOERLI_URL,
            accounts: [GOERLI_PRIVATE_KEY],
            chainId: 5,
        },
        localhost: {
            url: "http://localhost:8545",
            chainId: 31337,
        },
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    gasReporter: {
        enabled: true,
        coinmarketcap: COINMARKETCAP_API_KEY,
        outputFile: "gas-report.txt",
        token: "MATIC",
        currency: "USD",
        noColors: true,
    },
}
