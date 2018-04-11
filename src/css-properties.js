const cssProperties = {
    cssProp: (name, ...args) => {
        const arg = args
            .map(a => (typeof a !== "number" ? `${a}` : `${a}px`))
            .join(" ")

        return {
            type: "CSS property",
            value: `${name}: ${arg}`
        }
    }
}

const fnNames = [
    "animation",
    "animation-delay",
    "animation-direction",
    "animation-duration",
    "animation-fill-mode",
    "animation-iteration-count",
    "animation-name",
    "animation-play-state",
    "animation-timing-function",
    "background",
    "background-attachment",
    "background-clip",
    "background-color",
    "background-image",
    "background-origin",
    "background-position",
    "background-repeat",
    "background-size",
    "border",
    "border-bottom",
    "border-bottom-color",
    "border-bottom-left-radius",
    "border-bottom-right-radius",
    "border-bottom-style",
    "border-bottom-width",
    "border-color",
    "border-image",
    "border-image-outset",
    "border-image-repeat",
    "border-image-slice",
    "border-image-source",
    "border-image-width",
    "border-left",
    "border-left-color",
    "border-left-style",
    "border-left-width",
    "border-radius",
    "border-right",
    "border-right-color",
    "border-right-style",
    "border-right-width",
    "border-style",
    "border-top",
    "border-top-color",
    "border-top-left-radius",
    "border-top-right-radius",
    "border-top-style",
    "border-top-width",
    "border-width",
    "color",
    "opacity",
    "height",
    "max-height",
    "max-width",
    "min-height",
    "min-width",
    "width",
    "content",
    "quotes",
    "counter-reset",
    "counter-increment",
    "align-content",
    "align-items",
    "align-self",
    "flex",
    "flex-basis",
    "flex-direction",
    "flex-flow",
    "flex-grow",
    "flex-shrink",
    "flex-wrap",
    "justify-content",
    "order",
    "font",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "list-style",
    "list-style-image",
    "list-style-position",
    "list-style-type",
    "margin",
    "margin-bottom",
    "margin-left",
    "margin-right",
    "margin-top",
    "column-count",
    "column-fill",
    "column-gap",
    "column-rule",
    "column-rule-color",
    "column-rule-style",
    "column-rule-width",
    "column-span",
    "column-width",
    "columns",
    "outline",
    "outline-color",
    "outline-offset",
    "outline-style",
    "outline-width",
    "padding",
    "padding-bottom",
    "padding-left",
    "padding-right",
    "padding-top",
    "page-break-after",
    "page-break-before",
    "page-break-inside",
    "border-collapse",
    "border-spacing",
    "caption-side",
    "empty-cells",
    "table-layout",
    "direction",
    "tab-size",
    "text-align",
    "text-align-last",
    "text-decoration",
    "text-decoration-color",
    "text-decoration-line",
    "text-decoration-style",
    "text-indent",
    "text-justify",
    "text-overflow",
    "text-shadow",
    "text-transform",
    "line-height",
    "vertical-align",
    "letter-spacing",
    "word-spacing",
    "white-space",
    "word-break",
    "word-wrap",
    "backface-visibility",
    "perspective",
    "perspective-origin",
    "transform",
    "transform-origin",
    "transform-style",
    "transition",
    "transition-delay",
    "transition-duration",
    "transition-property",
    "transition-timing-function",
    "display",
    "position",
    "top",
    "right",
    "bottom",
    "left",
    "float",
    "clear",
    "z-index",
    "overflow",
    "overflow-x",
    "overflow-y",
    "resize",
    "clip",
    "visibility",
    "cursor",
    "box-shadow",
    "box-sizing"
]

for (const item of fnNames) {
    const [fnName, opt = {}] = Array.isArray(item) ? item : [item]

    cssProperties[camelCase(fnName)] = (...args) => {
        const values = []
        for (const a of args) {
            if (typeof a !== "number" && !a) {
                throw new Error(`You tried to set ${fnName}: ${a} for one of your components`)
            }
            values.push(typeof a === "number" ? `${a}px` : `${a}`)
        }

        return {
            type: "CSS property",
            value: `${fnName}: ${values.join(" ")}`
        }
    }
}

function camelCase (str) {
    return str
        .split("-")
        .map((s, i) => i ? s[0].toUpperCase() + s.substr(1) : s)
        .join("")
}

module.exports = cssProperties
