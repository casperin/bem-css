module.exports = block(
    modifier(
        "red large",
        pseudo(
            ":hover",
            element(
                "el",
                pseudo(":focus", [
                    color("green")
                ])
            )
        )
    )
)
