# BEM CSS

This is a set of tools for working with CSS&mdash;specifically for writing CSS
that adheres to BEM.

The guiding principles are enforcing correctness of the CSS, being helpful to
its users, while recognizing that CSS may not be the best language to write CSS
in.

There are two sets of tools: One for creators of the BEM CSS and another for
consumers.

1. For creators
   - A way to define blocks, elements, and modules with their CSS, in
     JavaScript.
   - A function that transforms the input to some sort of output. Right now,
     this is
     1. An object with each individual file/block under their respective block
        name.
     2. All the CSS concatinated (so you can save it where you want)
     3. A `bem tree` which descripes the structure of the CSS (see uses below)
2. For users
   - A function for creating the class names needed.
   - If configured with the `bem tree`, then it'll provide helpful help messages
     if you are trying to create a class name that does not point to anything
     defined in the css.

## Api

### Creating BEM CSS

Let's create a `card` block, with a `title` (we will ignore `content` for
simplicity). There is a variant in red. We will also create `button` block,
with only a `green` modification.

```js
// src/card.js
modules.export = block(
  // We provide the css as an array
  [
    backgroundColor('yellow'), // css properties are done with function calls
    padding(10)                // numbers are converted to px. Here "10px"
  ],

  modifier('red', [
    backgroundColor('pink')
  ]),

  element(
    'header',
    [
      fontSize(20)
    ],
    modifier('red', [
      color('#c00')
    ])
  )
)
```

Since each file is its own block (with the name of the file), we have to create
another file for the new block.

```js
// src/button.js
modules.export = block(
  [
    borderRadius(5),
    padding(4, 10)
  ],

  pseudo([":hover", ":active"], [
    boxShadow(0, 0, 3, "rgba(0, 0, 0, .2)")
  ]),

  modification('green', [
    backgroundColor('#0c0')
  ])
)
```

A few things should stand out to you here.

1. We use JavaScript to write CSS. This means you have access to everything
   that javascript can do.
2. One file per block. This is to ease trying to find said blocks later when
   you need to correct the CSS.
3. We use *a lot* of global variables for creating css. I understand this is
   not for everyone, so you can disable this and import everything as needed.

Let's build it.

```js
// build.js
const make = require('bem-css/make')

make(path.join(__dirname, 'src'))
  .then(console.log)
```

The output is an array with results. I suggest you just inspect it (because
this is all very much a work in progress), but as of writing we get five
things: "all css", "single css", "bem tree", "warnings", and "error".

If the error is defined, you should not trust any of the other output (they
will most likely be `null` anyway).

```css
// all css
.card {
  background-color: yellow;
  padding: 10px;
}
.card--red {
  background-color: pink;
}
.card__header {
  font-size: 20px;
}
.card__header--red {
  color: #c00;
}

.button {
  border-radius: 5px;
  padding: 4px 10px;
}
.button:hover, .button:active {
  box-shadow: 0px 0px 3px rgba(0, 0, 0, .2);
}
.button--green {
  background-color: #0c0;
}
```

```js
// single css
{
  "card": "...",  // the "card" part of the css above
  "button": "..." // the "button" part above
}
```

```js
// bem tree
{
  // Some json representation of the blocks above
}
```

### Using BEM CSS

Say we saved the "all css" into a file: `all.css`, and the content of the "bem
tree" into `bemTree.json` in another product that we are building as an SPA. I
will just use React for illustration.

```js
// util/cx.js
import cx from "bem-css/src/cx"
import bemTree from "./bemTree.json"
cx.configure({bemTree})
export default cx
```

Now, in some React component somewhere, we can do:

```jsx
import cx from "../util/cx"

const myBtnClass = cx("button", {green: true}) // "button button--green"
const myBtnClass = cx("button", {green: false}) // "button"
const myCardClass = cx("card") // "card"
const myCardHeaderClass = cx("card", "header") // "card__header"
const myRedCardHeaderClass = cx("card", "header", ["red"]) // "card__header card__header--red"
// and so on...
```

Notice that modifiers are inserted with either an object or an array.

If `cx` was configure with the `bemTree`, then it will (unless `env.NODE_ENV
=== "production"`) warn you if you are trying to create a class name that does
not exist in the bem tree.
