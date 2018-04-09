module.exports = block(
    [color("blue")],
    modifier("dark", [padding(10)]),
    element("head", [backgroundColor("brown")]),
    element(
        "tail",
        [backgroundColor("skyblue")],
        modifier("light", [border(1, "purple", "solid")])
    )
)
