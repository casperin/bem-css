module.exports = function makeBemClass(block) {
    const out = {
        modifiers: {},
        elements: {}
    }

    for (const m of block.modifiers) {
        for (const name of m.names) {
            out.modifiers[name] = true
        }
    }

    for (const e of block.elements) {
        for (const name of e.names) {
            out.elements[name] = {}

            for (const m of e.modifiers) {
                for (const mName of m.names) {
                    out.elements[name][mName] = true
                }
            }
        }
    }

    return out
}
