/**
 * Dict:
 *  b = block
 *  p = pseudo
 *  m = modifier
 *  e = element
 */
const makeParser = require("./parseCss")

module.exports = function parse(name, block, opt) {
    const prefix = opt.blockPrefix ? `.${opt.blockPrefix}-` : `.`
    const sel = prefix + name
    const sels = [sel]
    const csss = []
    const warnings = []
    const parse = makeParser(csss, warnings)
    let s // selector

    // .b
    parse(sels, block.csss)

    /**
     * Elements
     */
    for (const element of block.elements) {
        // .b .b__e
        s = combinations([sels, element.names], (b, e) => `${b} ${b}__${e}`)
        parse(s, element.csss)

        // .b .b__e:p
        for (const pseudo of element.pseudos) {
            s = combinations(
                [sels, element.names, pseudo.names],
                (b, n, p) => `${b} ${b}__${n}${p}`
            )
            parse(s, pseudo.csss)
        }

        // .b .b__e--m
        for (const modifier of element.modifiers) {
            s = combinations(
                [sels, element.names, modifier.names],
                (b, n, p) => `${b} ${b}__${n}--${p}`
            )
            parse(s, modifier.csss)

            // .b .b__e--m:p
            for (const pseudo of modifier.pseudos) {
                s = combinations(
                    [sels, element.names, modifier.names, pseudo.names],
                    (b, e, m, p) => `${b} ${b}__${e}--${m}${p}`
                )
                parse(s, pseudo.csss)
            }
        }
    }

    /**
     * Pseudos
     */
    for (const pseudo of block.pseudos) {
        // .b:p
        s = combinations([sels, pseudo.names], (b, p) => `${b}${p}`)
        parse(s, pseudo.csss)

        for (const element of pseudo.elements) {
            // .b:p .b__e
            s = combinations(
                [sels, pseudo.names, element.names],
                (b, p, e) => `${b}${p} ${b}__${e}`
            )
            parse(s, element.csss)

            // .b:p .b__e:p
            for (const ePseudo of element.pseudos) {
                s = combinations(
                    [sels, pseudo.names, element.names, ePseudo.names],
                    (b, bp, e, ep) => `${b}${bp} ${b}__${e}${ep}`
                )
                parse(s, ePseudo.csss)
            }

            // .b:p .b__e--m
            for (const modifier of element.modifiers) {
                s = combinations(
                    [sels, pseudo.names, element.names, modifier.names],
                    (b, p, e, m) => `${b}${p} ${b}__${e}--${m}`
                )
                parse(s, modifier.csss)

                // .b:p .b__e--m:p
                for (const ePseudo of modifier.pseudos) {
                    s = combinations(
                        [
                            sels,
                            pseudo.names,
                            element.names,
                            modifier.names,
                            ePseudo.names
                        ],
                        (b, p, e, m, mp) => `${b}${p} ${b}__${e}--${m}${mp}`
                    )
                    parse(s, ePseudo.csss)
                }
            }
        }
    }

    /**
     * Modifiers
     */
    for (const modifier of block.modifiers) {
        // .b--m
        s = combinations([sels, modifier.names], (b, m) => `${b}--${m}`)
        parse(s, modifier.csss)

        for (const element of modifier.elements) {
            // .b--m .b__e
            s = combinations(
                [sels, modifier.names, element.names],
                (b, m, e) => `${b}--${m} ${b}__${e}`
            )
            parse(s, element.csss)

            // .b--m .b__e:p
            for (const pseudo of element.pseudos) {
                s = combinations(
                    [sels, modifier.names, element.names, pseudo.names],
                    (b, m, e, p) => `${b}--${m} ${b}__${e}${p}`
                )
                parse(s, pseudo.csss)
            }

            // .b--m .b__e--m
            for (const eModifier of element.modifiers) {
                s = combinations(
                    [sels, modifier.names, element.names, eModifier.names],
                    (b, m, e, em) => `${b}--${m} ${b}__${e}--${em}`
                )
                parse(s, eModifier.csss)

                // .b--m .b__e--m:p
                for (const ePseudo of eModifier.pseudos) {
                    s = combinations(
                        [
                            sels,
                            modifier.names,
                            element.names,
                            eModifier.names,
                            ePseudo.names
                        ],
                        (b, m, e, em, ep) => `${b}--${m} ${b}__${e}--${em}${ep}`
                    )
                    parse(s, ePseudo.csss)
                }
            }
        }

        for (const pseudo of modifier.pseudos) {
            // .b--m:p
            s = combinations(
                [sels, modifier.names, pseudo.names],
                (b, m, p) => `${b}--${m}${p}`
            )
            parse(s, pseudo.csss)

            for (const element of pseudo.elements) {
                // .b--m:p .b__e
                s = combinations(
                    [sels, modifier.names, pseudo.names, element.names],
                    (b, m, p, e) => `${b}--${m}${p} ${b}__${e}`
                )
                parse(s, element.csss)

                // .b--m:p .b__e:p
                for (const ePseudo of element.pseudos) {
                    s = combinations(
                        [
                            sels,
                            modifier.names,
                            pseudo.names,
                            element.names,
                            ePseudo.names
                        ],
                        (b, m, p, e, ep) => `${b}--${m}${p} ${b}__${e}${ep}`
                    )
                    parse(s, ePseudo.csss)
                }

                // .b--m:p .b__e--m
                for (const eModifier of element.modifiers) {
                    s = combinations(
                        [
                            sels,
                            modifier.names,
                            pseudo.names,
                            element.names,
                            eModifier.names
                        ],
                        (b, m, p, e, em) => `${b}--${m}${p} ${b}__${e}--${em}`
                    )
                    parse(s, eModifier.csss)

                    // .b--m:p .b__e--m:p
                    for (const ePseudo of eModifier.pseudos) {
                        s = combinations(
                            [
                                sels,
                                modifier.names,
                                pseudo.names,
                                element.names,
                                eModifier.names,
                                ePseudo.names
                            ],
                            (b, m, p, e, em, ep) =>
                                `${b}--${m}${p} ${b}__${e}--${em}${ep}`
                        )
                        parse(s, ePseudo.csss)
                    }
                }
            }
        }
    }

    return [csss.join("\n"), warnings]
}

module.exports.combinations = combinations // for test
function combinations(xss, fn, inputs = []) {
    if (!xss.length) return fn(...inputs.reverse())
    const [ns, ...mss] = xss
    const out = ns.map(n => combinations(mss, fn, [n, ...inputs]))
    return flatten(out)
}

function flatten(arrs) {
    const out = []
    for (const arr of arrs) {
        if (Array.isArray(arr)) {
            out.push(...arr)
        } else {
            out.push(arr)
        }
    }
    return out
}
