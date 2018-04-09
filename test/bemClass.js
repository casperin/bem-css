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
