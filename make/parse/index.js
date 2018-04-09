const parseBlock = require("./block")
const parseModifers = require("./modifier")
const parseElements = require("./element")

module.exports = function parse(name, block, opt) {
    const blockSelector = "." + name

    const b = parseBlock(blockSelector, block, opt)
    const e = parseElements(blockSelector, block.elements, opt)
    const m = parseModifers(blockSelector, block.modifiers, opt)

    const o = Object.assign({}, b, e, m)

    const outArr = [
        ...o.block,
        ...o.blockPseudo,
        ...o.blockPseudo_blockElement,
        ...o.blockPseudo_blockElementPseudo,
        ...o.blockModifier,
        ...o.blockModifierPseudo,
        ...o.block_blockElement,
        ...o.block_blockElementPseudo,
        ...o.block_blockElementModifier,
        ...o.block_blockElementModifierPseudo
    ]

    return outArr.filter(x => x).join(`\n`)
}
