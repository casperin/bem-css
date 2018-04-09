module.exports = block(
    [color("green")],

    pseudo(
        ":hover",
        [color("red")],
        element(
            "informal",
            [backgroundColor("orange")],
            pseudo(":madness", [color("fuchsia")])
        )
    ),

    element("informal", [fontStyle("italic")])
)
