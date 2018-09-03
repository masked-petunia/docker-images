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

const updateHostsFile = (hosts, domain) => {
    hosts.forEach(host => {
        if(typeof CACHE[host.name] === 'undefined' || ip !== CACHE[host.name]) {
            const url = `${host.name}.${domain}`
            hostile.set(host.ip, url, err => {
                if(err) {
                    console.error("[ERROR]", err)
                } else {
                    console.log(`Record for ${url} set to ${host.ip}`)
                    CACHE[host.name] = ip
                    fs.writeFile(CACHE_FILENAME, JSON.stringify(CACHE), err => {
                        if(err) {
                            console.log("[ERROR] Cache not saved")
                        }
                    })
                }
            })
        }
    })
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
        console.log(data)
        if(data === "Error") {
            console.log("[ERROR] Server response")
        } else {
            let jsonData = null
            try {
                jsonData = JSON.parse(data)
            } catch(e) {
            }
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
