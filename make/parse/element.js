const util = require("./util")
const parseModifiers = require("./modifier")

module.exports = function parseElements(sel, elements = [], warnings) {
    const out = {
        block_blockElement: [],
        block_blockElementPseudo: [],
        block_blockElementModifier: [],
        block_blockElementModifierPseudo: []
    }

    util.pushWarnings(elements.warnings, warnings)

    for (const e of elements) {
        const selector = `${sel} ${sel}__${e.name}`

        // .block .block__element
        if (e.css) {
            out.block_blockElement.push(
                util.cssToString(selector, e.css.properties)
            )
        }

        // .block .block__element:pseudo
        if (e.pseudo) {
            const selectors = e.pseudo.names
                .map(pseudo => `${selector}${pseudo}`)
                .join(",\n")

            out.block_blockElementPseudo.push(
                util.cssToString(selectors, e.pseudo.css.properties)
            )
        }

        // .block .block__element--modifier
        // .block .block__element--modifier:pseudo
        const out_ = parseModifiers(selector, e.modifiers, warnings)
        out.block_blockElementModifier.push(out_.blockModifier)
        out.block_blockElementModifierPseudo.push(out_.blockModifierPseudo)
    }

    return out
}
