const _ = require("lodash")

const cssProperties = {}

const fnNames = [
    "color",
    "margin",
    "padding",
    "zIndex",
    "background",
    "backgroundColor",
    "border",
    "fontSize",
    "fontWeight",
    "fontStyle",
    "textDecoration"
]

for (const item of fnNames) {
    const [fnName, opt = {}] = Array.isArray(item) ? item : [item]

    cssProperties[fnName] = (...args) => {
        const arg = args
            .map(a => (typeof a !== "number" ? `${a}` : `${a}px`))
            .join(" ")

        return {
            type: "CSS property",
            value: `${_.kebabCase(fnName)}: ${arg}`
        }
    }
}

module.exports = cssProperties
