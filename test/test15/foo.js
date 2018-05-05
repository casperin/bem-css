module.exports = block(
    modifier(
        "red large",
        [color("blue")],
        pseudo([":hover", ":focus"], [
            color("green")
        ])
    )
)
