module.exports = block(
    pseudo(
        ":hover",
        element(
            "el",
            modifier(
                "blue small",
                [color("red")],
                pseudo([":focus", ":active"], [color("green")])
            )
        )
    )
)
