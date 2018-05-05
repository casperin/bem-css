module.exports = block(
    modifier(
        "red large",
        element(
            "el",
            [color("blue")],
            pseudo(":hover", [color("green")])
        )
    )
)
