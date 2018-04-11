const util = require("./util")

module.exports = function parseBlock(sel, block, warnings) {
    const out = {
        block: [],
        blockPseudo: [],
        blockPseudo_blockElement: [],
        blockPseudo_blockElementPseudo: []
    }

    util.pushWarnings(block.warnings, warnings)

    // .block
    if (block.css) {
        out.block.push(util.cssToString(sel, block.css.properties))
    }

    // .block:pseudo
    if (block.pseudos) {
        for (const pseudo of block.pseudos) {
            if (pseudo.css) {
                const selector = pseudo.names
                    .map(pseudo => `${sel}${pseudo}`)
                    .join(",\n")

                out.blockPseudo.push(
                    util.cssToString(selector, pseudo.css.properties)
                )
            }

            if (pseudo.elements) {
                for (const e of pseudo.elements) {
                    // block:pseudo block__element
                    if (e.css) {
                        const selector = pseudo.names
                            .map(pseudo => `${sel}${pseudo} ${sel}__${e.name}`)
                            .join(", ")

                        out.blockPseudo_blockElement.push(
                            util.cssToString(selector, e.css.properties)
                        )
                    }

                    // block:pseudo block__element:pseudo
                    if (e.pseudos) {
                        for (const epseudo of e.pseudos) {
                            const names = []
                            for (const bps of pseudo.names) {
                                for (const eps of epseudo.names) {
                                    names.push(`${sel}${bps} ${sel}__${e.name}${eps}`)
                                }
                            }
                            out.blockPseudo_blockElementPseudo.push(
                                util.cssToString(names.join(",\n"), epseudo.css.properties)
                            )
                        }
                    }
                }
            }
        }
    }

    return out
}
