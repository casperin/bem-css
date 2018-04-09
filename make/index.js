const file = require("./file")
const errors = require("./errors")
const defaultOptions = require("./defaultOptions")
const { c } = require("../src")
const parseBlock = require("./parse")
const makeBemClass = require("./bemClass")

module.exports = async function make(p, opt = {}) {
    const warnings = []
    opt = Object.assign({}, defaultOptions, opt)

    if (!file.isDir(p)) {
        return [null, null, null, warnings, errors.notDir(p)]
    }

    if (opt.globalC) {
        for (const k in c) {
            global[k] = c[k]
        }
    }

    const [files, globErr] = await file.glob(file.join(p, opt.glob))
    if (globErr) {
        const err = errors.wrap(
            "We got this error when trying to read your files:",
            globErr
        )
        return [null, null, null, warnings, err]
    }

    const cssAll = []
    const cssSingle = {}
    const bemClasses = {}
    const seenNames = {}

    for (const p of files) {
        const name = file.name(p)
        if (name[0] === "_") {
            continue
        }
        if (seenNames[name]) {
            warnings.push(errors.duplicateBlock(name, seenNames[name], p))
            continue
        }
        seenNames[name] = p

        const block = require(p)
        if (block.type !== "block") {
            continue
        }

        const css = parseBlock(name, block, opt)
        cssAll.push(css)
        cssSingle[name] = css
        bemClasses[name] = makeBemClass(block)
    }

    return [cssAll.join("\n\n"), cssSingle, bemClasses, warnings, null]
}
