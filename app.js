const fs = require('fs')
const getMac = require('getmac').getMac
const ip = require('ip')
const arpScanner = require('arpscan/promise')

// -----------------------------------------------------------------------

const handle = (name, action, param, callback) => {
    action(param)
        .then(callback)
        .catch(() => {
            console.log(`[ERROR] ${name}`)
        })
}

const getMacAddress = () => new Promise((resolve, reject) => {
    getMac((error, macAddress) => {
        if(error) {
            console.log(error)
            reject(error)
        } else {
            resolve(macAddress)
        }
    })
})

// -----------------------------------------------------------------------

const CONFIG = JSON.parse(fs.readFileSync('./config.json', 'utf8'))

const arpScanOptions = { args: [ CONFIG.host.network ], sudo: true }
if(CONFIG.host.interface) {
    arpScanOptions.interface = CONFIG.host.interface
}

// -----------------------------------------------------------------------

const defineNodeIP = (mac, ip) => {
    CONFIG.nodes.map(node => {
        if(mac === node.mac) {
            node.ip = ip
            console.log(`[NODE] ${node.name} is ${node.ip}`)
        }
        return node
    })
}

// -----------------------------------------------------------------------

// 1. Retrieving host MAC address
handle('own-mac', getMacAddress, null, macAddress => {
    
    // 2. Adds the host IP if it is a node
    defineNodeIP(macAddress, ip.address())

    // 3. Search IPs on the network
    handle('arp-scan', arpScanner, arpScanOptions, arpScanList => {

        // 4. Adds the IPs of the corresponding nodes
        arpScanList.forEach(element => {
            defineNodeIP(element.mac, element.ip)
        })

    })
})
