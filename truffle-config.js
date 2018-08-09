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
    }
  }
}
