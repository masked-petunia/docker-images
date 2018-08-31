const fs = require('fs')
const ip = require('ip').address()
const http = require('http')
const hostile = require('hostile')

const SECRET1 = process.env.SECRET1
const SECRET2 = process.env.SECRET2
const SECRET3 = process.env.SECRET3
const NAME = process.env.NAME

let CACHE = {}
const CACHE_FILENAME = `${__dirname}/cache.json`
if(fs.existsSync(CACHE_FILENAME)) {
    CACHE = JSON.parse(fs.readFileSync(CACHE_FILENAME, 'utf8'))
}

const updateHostsFile = hosts => {
    Object.keys(hosts).forEach(hostname => {
        const ip = hosts[hostname]
        if(typeof CACHE[hostname] === 'undefined' || ip !== CACHE[hostname]) {
            hostile.set(ip, hostname, err => {
                if(err) {
                    console.error("[ERROR]", err)
                } else {
                    console.log(`Record for ${hostname} updated to ${ip}`)
                    CACHE[hostname] = ip
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

const options = {
    host: process.env.URL,
    port: process.env.PORT || 3000,
    path: `/?s1=${SECRET1}&s2=${SECRET2}&s3=${SECRET3}&name=${NAME}&ip=${ip}`
}

const callback = response => {
    let data = '';
    response.on('data', chunk => {
        data += chunk
    })
    response.on('end', () => {
        if(data === "Error") {
            console.log("[ERROR] Server response")
        } else {
            updateHostsFile(JSON.parse(data))
        }
    })
}

http.request(options, callback).end()
