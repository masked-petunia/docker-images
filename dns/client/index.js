const fs = require('fs')
const ip = require('ip').address()
const hostile = require('hostile')

const PORT = process.env.PORT || 3000
const http = require(`http${PORT === '443' ? 's' : ''}`)

let CACHE = {}
const CACHE_FILENAME = `${__dirname}/cache.json`
if(fs.existsSync(CACHE_FILENAME)) {
    CACHE = JSON.parse(fs.readFileSync(CACHE_FILENAME, 'utf8'))
}

const updateHost = (ip, url) => new Promise((resolve, reject) => {
    hostile.set(ip, url, err => {
        if(err) {
            console.error("[ERROR]", err)
            reject()
        } else {
            console.log(`Record for ${url} set to ${host.ip}`)
            CACHE[host.name] = host.ip
            fs.writeFile(CACHE_FILENAME, JSON.stringify(CACHE), err => {
                if(err) {
                    console.log("[ERROR] Cache not saved")
                }
            })
            resolve()
        }
    })
})

const updateHostsFile = (hosts, domain) => {
    Promise.all(hosts.filter(host => {
        return typeof CACHE[host.name] === 'undefined' || ip !== CACHE[host.name]
    }).map(host => updateHost(host.ip, `${host.name}.${domain}`)))
}

http.request({
    host: process.env.URL,
    port: PORT,
    path: `/?s1=${process.env.SECRET1}`
        + `&s2=${process.env.SECRET2}`
        + `&s3=${process.env.SECRET3}`
        + `&name=${process.env.NAME}`
        + `&ip=${ip}`
}, response => {
    let data = '';
    response.on('data', chunk => {
        data += chunk
    })
    response.on('end', () => {
        if(data === "Error") {
            console.log("[ERROR] Server response")
        } else {
            let jsonData = null
            try {
                jsonData = JSON.parse(data)
            } catch(e) {}
            if(jsonData === null) {
                console.log("[ERROR] JSON parse")
            } else if(typeof jsonData.hosts === "undefined") {
                console.log("[ERROR] Hosts missing from response")
            } else if(typeof jsonData.domain === "undefined") {
                console.log("[ERROR] Domain missing from response")
            } else {
                updateHostsFile(jsonData.hosts, jsonData.domain)
            }
        }
    })
}).end()
