const path = require("path")
const express = require('express')
const app = express()

const { c } = require("../src")
const parseBlock = require("../make/parse")

for (const k in c) {
    global[k] = c[k]
}

app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname + '/index.html'))
})

app.get("/parse", function(req, res) {
    let c = ``
    const code = `c = ${req.query.code}`
    try {
        eval(code)
    } catch (e) {
        res.json({error: e.message})
        return
    }

    const [css, warnings] = parseBlock("my-block", c, {})
    res.json({
        code: c,
        css,
        warnings
    })
})

app.listen(8080, () => console.log('Example app listening on port 3000!'))
