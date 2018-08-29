const fs = require('fs')
const exec = require('child_process').exec
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

const updateNodeHost = (nodeIp, nodeName) => new Promise((resolve, reject) => {
    const SCRIPT = __dirname + '/../hosts-file/define.sh'
    exec(`sh ${SCRIPT} ${nodeIp} ${nodeName} ${CONFIG.name}`, (error, stdout) => {
        if(error) {
            reject(stdout)
        } else {
            console.log(`[HOSTS FILE UPDATE] ${stdout}`)
            resolve()
        }
    })
})

// -----------------------------------------------------------------------

// 1. Retrieving executor MAC address
handle('own-mac', getMacAddress, null, macAddress => {
    
    // 2. Adds the exectutor IP address if it is a node
    defineNodeIP(macAddress, ip.address())

    // 3. Search IPs on the network
    handle('arp-scan', arpScanner, arpScanOptions, arpScanList => {

        // 4. Adds the IPs of the corresponding nodes
        arpScanList.forEach(element => {
            defineNodeIP(element.mac, element.ip)
        })

        // 5. Updates the executor /etc/hosts file
        CONFIG.nodes.forEach(node => {
            updateNodeHost(node.ip, node.name)
        })

    })
})
