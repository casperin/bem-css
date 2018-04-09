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
    if (block.pseudo && block.pseudo.css) {
        const selector = block.pseudo.names
            .map(pseudo => `${sel}${pseudo}`)
            .join(",\n")
        out.blockPseudo.push(
            util.cssToString(selector, block.pseudo.css.properties)
        )
    }

    if (block.pseudo && block.pseudo.elements) {
        for (const e of block.pseudo.elements) {
            // block:pseudo block__element
            if (e.css) {
                const selector = block.pseudo.names
                    .map(pseudo => `${sel}${pseudo} ${sel}__${e.name}`)
                    .join(", ")

                out.blockPseudo_blockElement.push(
                    util.cssToString(selector, e.css.properties)
                )
            }

            // block:pseudo block__element:pseudo
            if (e.pseudo) {
                const names = []
                for (const bps of block.pseudo.names) {
                    for (const eps of e.pseudo.names) {
                        names.push(`${sel}${bps} ${sel}__${e.name}${eps}`)
                    }
                }
                out.blockPseudo_blockElementPseudo.push(
                    util.cssToString(names.join(",\n"), e.pseudo.css.properties)
                )
            }
        }
    }

    return out
}
