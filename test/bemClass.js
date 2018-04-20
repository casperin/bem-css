const path = require("path")
const tapeCb = require("tape")
const tapePromise = require("tape-promise").default
const tape = tapePromise(tapeCb)
const make = require("../make")

tape("bemClass parsing", async function(t) {
    const [_cssAll, _cssSingle, bc, _warnings, _err] = await make(
        path.join(__dirname, "classTest1")
    )
    const expected = require("./classTest1/result.json")
    t.deepEqual(bc, expected)
})

tape("bemClass with prefix", async function(t) {
    const opt = { blockPrefix: "xx" }
    const [_1, _2, bc, _3, _4] = await make(
        path.join(__dirname, "classTest2"),
        opt
    )
    const expected = require("./classTest2/result.json")
    t.deepEqual(bc, expected)
})
