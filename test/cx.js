const tape = require("tape")
const cx = require("../src/cx")

const tests = [
    {
        desc: "cx: Only block",
        input: ["block"],
        expected: "block"
    },
    {
        desc: "cx: Block & element",
        input: ["block", "el"],
        expected: "block__el"
    },
    {
        desc: "cx: Block & modifier",
        input: ["block", ["mod"]],
        expected: "block block--mod"
    },
    {
        desc: "cx: Block & modifiers",
        input: ["block", ["mod", "mod2"]],
        expected: "block block--mod block--mod2"
    },
    {
        desc: "cx: Block, element, & modifier",
        input: ["block", "el", ["mod"]],
        expected: "block__el block__el--mod"
    },
    {
        desc: "cx: Block, element, & modifiers",
        input: ["block", "el", ["mod", "mod2"]],
        expected: "block__el block__el--mod block__el--mod2"
    },
    {
        desc: "cx: Block, element, & modifier object",
        input: ["block", "el", { mod: true, mod2: false, mod3: true }],
        expected: "block__el block__el--mod block__el--mod3"
    },
    {
        desc: "cx: With bemTree",
        confOpt: {
            bemTree: { block1: { modifiers: { mod1: true } } }
        },
        input: ["block1", ["mod1"]],
        expected: "block1 block1--mod1"
    },
    {
        desc: "cx: With bemTree, missing block",
        confOpt: { bemTree: {} },
        input: ["block1", ["mod1"]],
        expected: "block1 block1--mod1",
        expectedWarning: true
    },
    {
        desc: "cx: With bemTree, missing mod",
        confOpt: { bemTree: { block1: {} } },
        input: ["block1", ["mod1"]],
        expected: "block1 block1--mod1",
        expectedWarning: true
    },
    {
        desc: "cx: With bemTree, missing element",
        confOpt: { bemTree: { block1: {} } },
        input: ["block", "el"],
        expected: "block__el",
        expectedWarning: true
    },
    {
        desc: "cx: With bemTree, missing element mod",
        confOpt: {
            bemTree: {
                block: {
                    elements: { el: {} }
                }
            }
        },
        input: ["block", "el", ["mod"]],
        expected: "block__el block__el--mod",
        expectedWarning: true
    }
]

for (const test of tests) {
    tape(test.desc, t => {
        t.plan(test.expectedWarning ? 2 : 1)
        cx.configure(Object.assign({}, test.confOpt, { warn: _ => t.pass() }))
        const actual = cx(...test.input)
        t.equal(actual, test.expected)
        cx.reset()
    })
}
