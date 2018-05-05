module.exports = block(
    element(
        "el",
        modifier(
            "blue small",
            [color("red")],
            pseudo([":focus", ":active"], [color("green")])
        )
    )
)
