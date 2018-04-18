const tape = require("tape")
const combinations = require("../make/parse").combinations

tape("combinations", t => {
    const tests = [
        {
            input: [["a", "b"], ["c", "d"]],
            output: ["a-c", "a-d", "b-c", "b-d"]
        },
        {
            input: [["a", "b"], ["c", "d", "e"], ["f", "g"]],
            output: [
                "a-c-f",
                "a-c-g",
                "a-d-f",
                "a-d-g",
                "a-e-f",
                "a-e-g",
                "b-c-f",
                "b-c-g",
                "b-d-f",
                "b-d-g",
                "b-e-f",
                "b-e-g"
            ]
        },
        {
            input: [["a"], ["b", "c", "d"]],
            output: ["a-b", "a-c", "a-d"]
        }
    ]

    t.plan(tests.length)

    const fn = (...args) => args.join("-")

    for (const { input, output } of tests) {
        t.deepEqual(combinations(input, fn), output)
    }
})
