module.exports = block(
    pseudo(":hover", element("bar", pseudo(":active", [color("red")])))
)
