const fs = require('fs');
module.exports = () => {
    let data = fs.readFileSync("./.env")
    data = data.toString()
    data.split("\n").forEach(line => {
        line = line.split("=")
        Object.defineProperty(process.env, line[0], {
            value: line[1]
        })
    })
}