const fs = require('fs')
const http = require('http')
const url = require('url')

const PORT = process.env.PORT || 3000
const SECRET1 = process.env.SECRET1
const SECRET2 = process.env.SECRET2
const SECRET3 = process.env.SECRET3
const DOMAIN = process.env.DOMAIN

let CACHE = {}
const CACHE_FILENAME = `${__dirname}/cache.json`
if(fs.existsSync(CACHE_FILENAME)) {
    CACHE = JSON.parse(fs.readFileSync(CACHE_FILENAME, 'utf8'))
}

const checkParams = (paramsList, toCheck) => {
    return toCheck.filter(paramToCheck => {
        return typeof paramsList[paramToCheck] === 'undefined'
    }).length === 0
}

const checkSecrets = params => {
    return SECRET1 === params.s1
        && SECRET2 === params.s2
        && SECRET3 === params.s3
}

const record = (name, ip) => {
    const notExisting = typeof CACHE[name] === 'undefined'
    if(notExisting || ip !== CACHE[name]) {
        CACHE[name] = ip
        fs.writeFile(CACHE_FILENAME, JSON.stringify(CACHE), err => {
            if(err) {
                console.log("[ERROR] Cache not saved")
            }
        })
        console.log(`[${notExisting ? "ADD" : "UPDATE"}] Node "${name}" set to ${ip}`)
    }
}

const getHosts = () => {
    const list = []
    Object.keys(CACHE).forEach(name => {
        list.push({ name, ip: hosts[hostname] })
    })
    return JSON.stringify(list)
}

const app = http.createServer((req, res) => {
    const params = url.parse(req.url, true).query
    if(!checkParams(params, [ 's1', 's2', 's3', 'name', 'ip' ])) {
        console.log("[ERROR] A parameter is missing")
        res.write('Error')
    } else if(!checkSecrets(params)) {
        console.log("[ERROR] Wrong secrets")
        res.write('Error')
    } else {
        record(params.name, params.ip)
        res.write({ hosts: getHosts(), domain: DOMAIN })
    }
    res.end()
})

app.listen(PORT, () => {
    console.log(`Sync server is listening on port ${PORT}`)
})
