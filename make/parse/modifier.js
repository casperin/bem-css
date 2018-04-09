const util = require("./util")

module.exports = function parseModifiers(sel, modifiers = [], warnings) {
    const out = {
        blockModifier: [],
        blockModifierPseudo: []
    }

    util.pushWarnings(modifiers.warnings, warnings)

    for (const m of modifiers) {
        const selector = `${sel}--${m.name}`

        // .block--modifier
        if (m.css) {
            out.blockModifier.push(util.cssToString(selector, m.css.properties))
        }

        // .block--modifier:pseudo
        if (m.pseudo) {
            const selectors = m.pseudo.names
                .map(pseudo => `${selector}${pseudo}`)
                .join(",\n")

            out.blockModifierPseudo.push(
                util.cssToString(selectors, m.pseudo.css.properties)
            )
        }
    }

    return out
}
