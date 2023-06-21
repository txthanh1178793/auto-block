import { HardhatUserConfig } from "hardhat/config";
import { privateKey } from "./config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.14",
  networks: {
    goerli: {
      url: "https://ethereum-goerli.publicnode.com",
      accounts: [privateKey],
      allowUnlimitedContractSize: true
    },
    eth: {
      url: "https://ethereum.publicnode.com",
      gasPrice: 14 * (10 ** 9),
      accounts: [privateKey],
      allowUnlimitedContractSize: true
    }
  },
};

export default config;
