module.exports = function makeParser(cssTarget, warningsTarget) {
    return function parseCss(sels, csss = []) {
        const sel = sels.join(",\n")
        let css = ""
        for (const { values, warnings } of csss) {
            if (warnings.length) {
                warningsTarget.push(
                    ...warnings.map(
                        w =>
                            `Creating ${sel} {...} gave me this warning:\n${w}\n`
                    )
                )
            }

            for (const prop of values) {
                css += `    ${prop}\n`
            }
        }

        if (css) {
            cssTarget.push(`${sel} {\n${css}}`)
        }
    }
}
