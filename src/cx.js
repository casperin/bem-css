const defaultOpt = {
    strict: true,
    bemTree: null,
    warn: (...msg) => console.warn(...msg)
}
let opt = defaultOpt

cx.configure = function configure(options) {
    opt = Object.assign({}, defaultOpt, options)
}

cx.reset = function reset() {
    opt = defaultOpt
}

module.exports = cx
function cx(...args) {
    if (!args.length) {
        return ""
    }
    const block = args[0]
    const elem = typeof args[1] === "string" ? args[1] : null
    let mods = typeof args[1] === "string" ? args[2] : args[1]
    if (mods && {}.toString.call(mods).slice(8, -1) === "Object") {
        mods = Object.keys(mods).reduce(
            (acc, m) => (mods[m] ? [...acc, m] : acc),
            []
        )
    }
    let result = elem ? `${block}__${elem}` : block
    const base = result
    for (const m of mods || []) {
        result += ` ${base}--${m}`
    }
    if (process.env.NODE_ENV !== "production" && opt.strict) {
        checkIfExists(block, elem, mods)
    }
    return result
}

function checkIfExists(block, elem, mods) {
    if (!opt.bemTree) {
        return
    }
    if (!opt.bemTree[block]) {
        return barf(block)
    }
    if (!elem) {
        if (mods) {
            for (const m of mods) {
                if (!opt.bemTree[block].modifiers || !opt.bemTree[block].modifiers[m]) {
                    return barf(`${block}--${m}`)
                }
            }
        }
        return
    }

    if (!opt.bemTree[block].elements || !opt.bemTree[block].elements[elem]) {
        return barf(`${block}__${elem}`)
    }
    if (!mods) {
        return
    }
    for (const m of mods) {
        const e = opt.bemTree[block].elements[elem]
        if (!e.modifiers || !e.modifiers[m]) {
            return barf(`${block}__${elem}--${m}`)
        }
    }
}

function barf(sel) {
    opt.warn(`Could not find ${sel} in the bemTree that you provided:`, opt.bemTree)
}
