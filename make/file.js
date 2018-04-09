const fs = require("fs")
const path = require("path")
const glob = require("glob")

exports.glob = function(p) {
    return new Promise(resolve => {
        glob(p, function(err, files) {
            resolve([files, err])
        })
    })
}

exports.join = path.join

exports.isDir = p => fs.existsSync(p) && fs.lstatSync(p).isDirectory()

exports.name = p => path.basename(p, path.extname(p))
