const path = require("path")
var fs = require("fs")
const tapeCb = require("tape")
const tapePromise = require("tape-promise").default
const tape = tapePromise(tapeCb)
const make = require("../make")

const tests = [
    ["test01", "block"],
    ["test02", "block:pseudo"],
    ["test03", "block:pseudo block__element"],
    ["test04", "block:pseudo block__element:pseudo"],
    ["test05", "block--modifier"],
    ["test06", "block--modifier:pseudo"],
    ["test07", "block block__element"],
    ["test08", "block block__element:pseudo"],
    ["test09", "block block__element--modifier"],
    ["test10", "block block__element--modifier:pseudo"],
    ["test11", "Multiple files"],
    ["test12", "Warns if files with same name", { warn: true }],
    ["test13", "Can handle multiple elements"],
    ["test14", "Can handle multiple pseudos"],
    ["_gone_", "Errors if not given a path to a dir", { error: true }]
]

for (const [dn, title, opt = {}] of tests) {
    tape(title, async function(t) {
        const dir = path.join(__dirname, dn)

        const [actual, _cssSingle, _bemClasses, warnings, err] = await make(dir)

        if (opt.warn) {
            t.ok(warnings.length > 0, "should have warning")
            return
        }
        t.deepEqual(warnings, [], "should not have warning")

        if (opt.error) {
            t.ok(err, "should have error")
            return
        }
        t.notOk(err, "should not have error")

        const expected = fs
            .readFileSync(path.join(dir, "result.css"), "utf8")
            .trim()

        t.equal(actual.trim(), expected, "actual should equal result.css")
    })
}
