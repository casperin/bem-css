const app = "bem-js"

exports.wrap = (msg, err) => `${app}: ${msg}\n  ${err}`

exports.notDir = path =>
    `You have to provide ${app} with a directory. You gave ${path}.`

exports.duplicateBlock = (name, path1, path2) =>
    `Seems like you have two blocks named "${name}".\n  1: ${path1}\n  2: ${path2}`
