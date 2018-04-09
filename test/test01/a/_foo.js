module.exports = block(
    [color("blue"), zIndex(2), margin(5)],

    pseudo(":hover", [textDecoration("underline")]),

    modifier("big", [fontSize(20)]),

    modifier(
        "small",
        [fontSize(14)],
        pseudo([":hover", ":active"], [backgroundColor("yellow")])
    ),

    element(
        "header",
        [fontWeight(800), color("blue")],
        pseudo(":active", [color("black")]),
        modifier("green", [color("green")], pseudo(":focus", [color("black")])),
        modifier("red", [color("red")])
    ),

    element("content", [padding(10)]),

    element("cta", [color("white"), backgroundColor("red")])
)
