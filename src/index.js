const cssProperties = require("./css-properties")

const c = (exports.c = Object.assign({}, cssProperties))

const toArr = x => (Array.isArray(x) ? x : [x])

const arrToCSS = value => (Array.isArray(value) ? c.css(value) : value)

c.css = function css(values) {
    const out = {
        type: "css",
        values: [],
        warnings: []
    }
    for (const value of values) {
        if (value.warning) {
            out.warnings.push(value.warning)
            continue
        }
        out.values.push(value.property)
    }
    return out
}

c.pseudo = c.P = function pseudo(names, ...rest) {
    return mapArguments("pseudo", names, rest, ["csss", "elements"])
}

c.modifier = c.M = function modifier(names, ...rest) {
    return mapArguments("modifier", names, rest, [
        "csss",
        "pseudos",
        "elements"
    ])
}

c.element = c.E = function element(names, ...rest) {
    return mapArguments("element", names, rest, [
        "csss",
        "pseudos",
        "modifiers"
    ])
}

c.block = c.B = function block(...rest) {
    return mapArguments("block", null, rest, [
        "csss",
        "pseudos",
        "modifiers",
        "elements"
    ])
    // TODO: Get warnings up on the block level
}

function mapArguments(type, names, args, allows) {
    const start = { type, warnings: [] }
    if (names) start.names = toArr(names)
    const out = allows.reduce(
        (acc, allow) => Object.assign(acc, { [allow]: [] }),
        start
    )
    for (const arg of args) {
        const v = arrToCSS(arg)
        if (!out[v.type + "s"]) {
            out.warnings.push(
                `You tried to put a ${v.type}, but only ${allows.join(
                    ", "
                )} are allowed`
            )
            continue
        }
        out[v.type + "s"].push(v)
    }
    return out
}
