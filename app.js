const fs = require('fs')
const arpScanner = require('arpscan')

const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'))

const syncAddresses = (error, list) => {
    if(error) throw err
    list.forEach(element => {
        config.cluster.map(server => {
            if(server.mac === element.mac) {
                server.ip = element.ip
            }
            return server
        })
    })
    console.log(config.cluster)
}

arpScanner(syncAddresses, {
    interface: config.network.interface,
    args: [ config.network.host ],
    sudo: true,
})
