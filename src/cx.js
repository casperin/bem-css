module.exports = newCx({})

module.exports.configure = function configure(options) {
    return newCx({
        strict: options.hasOwnProperty('strict') ? options.strict : true,
        bemTree: options.bemTree || null,
        prefix: options.prefix || '',
        warn: options.warn || console.warn
    })
}

function newCx(opt) {
    return function cx() {
        const args = [].slice.call(arguments)
        if (!args.length) {
            return ""
        }
        const block = opt.prefix ? opt.prefix + '-' + args[0] : args[0]
        const elem = typeof args[1] === "string" ? args[1] : null
        let mods = typeof args[1] === "string" ? args[2] : args[1]
        if (mods && {}.toString.call(mods).slice(8, -1) === "Object") {
            mods = Object.keys(mods).reduce(
                (acc, m) => (mods[m] ? acc.concat(m) : acc),
                []
            )
        }
        let result = elem ? block + '__' + elem : block
        const base = result
        for (const m of mods || []) {
            result += ' ' + base + '--' + m
        }
        if (process.env.NODE_ENV !== "production" && opt.strict) {
            checkIfExists(block, elem, mods, opt)
        }
        return result
    }
}

function checkIfExists(block, elem, mods, opt) {
    if (!opt.bemTree) {
        return
    }
    if (!opt.bemTree[block]) {
        opt.warn(
            'Could not find ' + block + '. I have:',
            Object.keys(opt.bemTree)
        )
        return
    }
    if (!elem) {
        if (mods) {
            for (const m of mods) {
                const ms = opt.bemTree[block].modifiers
                if (!ms || !ms[m]) {
                    opt.warn(
                        'Found ' + block + ', but not ' + block + '--' + m + '. I have:',
                        ms
                            ? Object.keys(ms).map(m => block + '--' + m)
                            : 'none'
                    )
                    return
                }
            }
        }
        return
    }

    const bes = opt.bemTree[block].elements
    if (!bes || !bes[elem]) {
        opt.warn(
            'Found ' + block + ', but not ' + block + '__' + elem + '. I have',
            bes
                ? Object.keys(bes).map(e => block + '__' + e)
                : 'no elements under ' + block
        )
        return
    }
    if (!mods) {
        return
    }
    for (const m of mods) {
        const em = opt.bemTree[block].elements[elem].modifiers
        if (!em || !em[m]) {
            opt.warn(
                'Found ' + block + '__' + elem + ', but not the ' + m + ' modifier. I have',
                em
                    ? 'these: ' +
                      Object.keys(em).map(m => bloc + '__' + elem + '--' + m)
                    : 'no modifiers'
            )
            return
        }
    }
}
