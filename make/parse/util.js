exports.cssToString = function cssToString(selector, css) {
    if (!css || !css.length) {
        return ""
    }
    const properties = css.map(p => "    " + p.value + ";\n").join("")
    return `${selector} {\n${properties}}`
}

exports.pushWarnings = function pushWarnings(maybeWarnings = [], target) {
    for (const warning of maybeWarnings) {
        target.push(warning)
    }
}
