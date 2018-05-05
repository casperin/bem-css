module.exports = block(
    modifier(
        "red large",
        element(
            "el",
            modifier(
                "blue small",
                [color("green")],
                pseudo(":hover", [color("orange")])
            )
        )
    )
)
