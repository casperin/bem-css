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
    const modifierSplitter = opt.modifierSplitter || " "
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
                (b, e, p) => `${b} ${b}__${e}${p}`
            )
            parse(s, pseudo.csss)
        }

        // .b .b__e--m
        for (const modifier of element.modifiers) {
            s = combinations(
                [sels, element.names, modifier.names],
                (b, e, m) => {
                    const bem = m.split(modifierSplitter).map(m => `${b}__${e}--${m}`).join("")
                    return `${b} ${bem}`
                }
            )
            parse(s, modifier.csss)

            // .b .b__e--m:p
            for (const pseudo of modifier.pseudos) {
                s = combinations(
                    [sels, element.names, modifier.names, pseudo.names],
                    (b, e, m, p) => {
                        const bem = m.split(modifierSplitter).map(m => `${b}__${e}--${m}`).join("")
                        return `${b} ${bem}${p}`
                    }
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
                    (b, p, e, m) => {
                        const bem = m.split(modifierSplitter).map(m => `${b}__${e}--${m}`).join("")
                        return `${b}${p} ${bem}`
                    }
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
                        (b, p, e, m, mp) => {
                            const bem = m.split(modifierSplitter).map(m => `${b}__${e}--${m}`).join("")
                            return `${b}${p} ${bem}${mp}`
                        }
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
        s = combinations(
            [sels, modifier.names],
            (b, m) => m.split(modifierSplitter).map(m => `${b}--${m}`).join("")
        )
        parse(s, modifier.csss)

        for (const element of modifier.elements) {
            // .b--m .b__e
            s = combinations(
                [sels, modifier.names, element.names],
                (b, m, e) => {
                    const bm = m.split(modifierSplitter).map(m => `${b}--${m}`).join("")
                    return `${bm} ${b}__${e}`
                }
            )
            parse(s, element.csss)

            // .b--m .b__e:p
            for (const pseudo of element.pseudos) {
                s = combinations(
                    [sels, modifier.names, element.names, pseudo.names],
                    (b, m, e, p) => {
                        const bm = m.split(modifierSplitter).map(m => `${b}--${m}`).join("")
                        return `${bm} ${b}__${e}${p}`
                    }
                )
                parse(s, pseudo.csss)
            }

            // .b--m .b__e--m
            for (const eModifier of element.modifiers) {
                s = combinations(
                    [sels, modifier.names, element.names, eModifier.names],
                    (b, m, e, em) => {
                        const bm = m.split(modifierSplitter).map(m => `${b}--${m}`).join("")
                        const bem = em.split(modifierSplitter).map(em => `${b}__${e}--${em}`).join("")
                        return `${bm} ${bem}`
                    }
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
                        (b, m, e, em, ep) => {
                            const bm = m.split(modifierSplitter).map(m => `${b}--${m}`).join("")
                            const bem = em.split(modifierSplitter).map(em => `${b}__${e}--${em}`).join("")
                            return `${bm} ${bem}${ep}`
                        }
                    )
                    parse(s, ePseudo.csss)
                }
            }
        }

        for (const pseudo of modifier.pseudos) {
            // .b--m:p
            s = combinations(
                [sels, modifier.names, pseudo.names],
                (b, m, p) => {
                    const bm = m.split(modifierSplitter).map(m => `${b}--${m}`).join("")
                    return `${bm}${p}`
                }
            )
            parse(s, pseudo.csss)

            for (const element of pseudo.elements) {
                // .b--m:p .b__e
                s = combinations(
                    [sels, modifier.names, pseudo.names, element.names],
                    (b, m, p, e) => {
                        const bm = m.split(modifierSplitter).map(m => `${b}--${m}`).join("")
                        return `${bm}${p} ${b}__${e}`
                    }
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
                        (b, m, p, e, ep) => {
                            const bm = m.split(modifierSplitter).map(m => `${b}--${m}`).join("")
                            return `${bm}${p} ${b}__${e}${ep}`
                        }
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
                        (b, m, p, e, em) => {
                            const bm = m.split(modifierSplitter).map(m => `${b}--${m}`).join("")
                            const bem = em.split(modifierSplitter).map(em => `${b}__${e}--${em}`).join("")
                            return `${bm}${p} ${bem}`
                        }
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
                            (b, m, p, e, em, ep) => {
                                const bm = m.split(modifierSplitter).map(m => `${b}--${m}`).join("")
                                const bem = em.split(modifierSplitter).map(em => `${b}__${e}--${em}`).join("")
                                return `${bm}${p} ${bem}${ep}`
                            }
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
