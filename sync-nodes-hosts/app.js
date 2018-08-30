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

const executeScriptLocal = (script, args) => {
    exec(`sh ${script} ${args}`, (error, stdout) => {
        console.log(`[LOCAL HOSTS FILE] ${stdout}`)
    })
}

const executeScriptSSH = (script, args, targetIp, user, key) => {
    const ssh = `ssh -o "StrictHostKeyChecking no" -i ${key} ${user}@${targetIp}`;
    exec(`${ssh} "sudo bash -s" < ${script} ${args}`, (error, stdout) => {
        console.log(`[REMOTE HOSTS FILE] ${stdout}`)
    })
}

// -----------------------------------------------------------------------

const CONFIG = JSON.parse(fs.readFileSync('./config.json', 'utf8'))

const arpScanOptions = { args: [ CONFIG.executor.network ], sudo: true }
if(CONFIG.executor.interface) {
    arpScanOptions.interface = CONFIG.executor.interface
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

const updateHostsFile = (nodeIp, nodeName, targetIp = null) => {
    const script = `${__dirname}/defineEtcHosts.sh`
    const args = `${nodeIp} ${nodeName} ${CONFIG.name}`
    if(targetIp === null) {
        executeScriptLocal(script, args)
    } else {
        executeScriptSSH(script, args, targetIp, CONFIG.ssh.user, CONFIG.ssh.key)
    }
}

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

        // 5. Check if all nodes have an IP
        CONFIG.nodes = CONFIG.nodes.filter(node => {
            if(typeof node.ip === 'undefined') {
                console.log(`[WARNING] NO IP FOUND FOUND FOR ${node.name}`)
                return false
            }
            return true
        })

        // 6. Updates the /etc/hosts file of all nodes via SSH
        CONFIG.nodes.forEach(parentNode => {
            CONFIG.nodes.forEach(childNode => {
                updateHostsFile(childNode.ip, childNode.name, parentNode.ip)
            })
        })

        // 7. Updates the executor /etc/hosts file
        CONFIG.nodes.forEach(node => {
            updateHostsFile(node.ip, node.name)
        })

    })
})
