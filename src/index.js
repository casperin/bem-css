const cssProperties = require("./css-properties")

const c = (exports.c = Object.assign({}, cssProperties))

c.css = function css(properties) {
    return {
        type: "css",
        properties
    }
}

c.pseudo = function pseudo(names, ...rest) {
    return Object.assign(
        {
            type: "pseudo",
            names: Array.isArray(names) ? names : [names]
        },
        mapArguments(rest)
    )
}

c.block = c.B = function block(...args) {
    return Object.assign({ type: "block" }, mapArguments(args))
}

c.element = c.E = function element(name, ...rest) {
    return Object.assign({ type: "element", name }, mapArguments(rest))
}

c.modifier = c.M = function modifier(name, ...rest) {
    return Object.assign({ type: "modifier", name }, mapArguments(rest))
}

const arrToCSS = value => (Array.isArray(value) ? c.css(value) : value)

function mapArguments(args) {
    const result = {}

    for (const arg of args) {
        const v = arrToCSS(arg)
        if (v.type === "css") {
            result[v.type] = v
            continue
        }
        if (v.type === "pseudo" || v.type === "element" || v.type === "modifier") {
            if (!result[v.type + "s"]) {
                result[v.type + "s"] = []
            }
            result[v.type + "s"].push(v)
            continue
        }
        throw new Error("You gave us something weird man")
    }

    return result
}
