module.exports = function makeBemClass(block) {
    const out = { modifiers: {}, elements: {} }

    for (const m of block.modifiers || []) {
        out.modifiers[m.name] = true
    }

    for (const e of block.elements || []) {
        out.elements[e.name] = {}

        for (const m of e.modifiers || []) {
            out.elements[e.name][m.name] = true
        }
    }

    return out
}
