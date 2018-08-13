var HDWalletProvider = require("truffle-hdwallet-provider");

const mnemonic = '';
const token = '';

module.exports = {
  networks: {
    ganache: {
      host: 'localhost',
      port: 7545,
      network_id: '5777'
    },
    ganachecli: {
      host: 'localhost',
      port: 8545,
      network_id: '*'
    },
    rinkeby: {
      provider: () => {
        return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/" + token)
      },
      network_id: '4'
    }
  }
}
