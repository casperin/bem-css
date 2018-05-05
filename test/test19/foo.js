module.exports = block(
    modifier(
        "red large",
        pseudo(
            ":hover",
            element(
                "el",
                modifier(
                    "blue small",
                    [color("orange")],
                    pseudo([":focus", ":active"], [color("green")])
                )
            )
        )
    )
)
