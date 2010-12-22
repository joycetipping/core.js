# core.js

*core.js* is a collection of useful functions that I've compiled from my
javascript projects. At its heart is a powerful and useful DOM creation method
`c.cr`.

## Nice features

(Depending on what you consider "nice")

* *No global namespace pollution*: Everything is attached to the `c` object, with a `noConflict` option.
* *Plain javascript, no jQuery*:   Provides useful substitutes for those cases when jQuery can't be used for whatever reason. (If you can use jQuery,
  then I doubt you would need this library anyway.)

## Functions

A quick summary of the functions offered:

1. DOM:
  * new -- `c.nw` -- shortcut for `document.createElement`, with an option to run it through `c.cr` later
  * getId -- `c.getId` -- shortcut for `document.getElementById`
  * create -- `c.cr` -- a full-featured DOM element creation function, with options to add attributes, classes, css, text, and children.
2. Trim functions
  * trim -- `c.trim` -- trims whitespace from around a string
  * left trim -- `c.ltrim` -- trims whitespace from before a string
  * right trime -- `c.rtrim` -- trims whitespace from after a string
3. Ajax -- `c.ajax` -- a simple function to make an ajax call
4. No Conflict -- `c.noConflict` -- resets `c` to whatever it was before and passes you back the `core.js` variable `c` for you to store wherever you choose.

## Versions

I'm always tweaking the code in rather drastic ways, so I've separated it out
into version numbers to preserve some sanity in the programs that depend on it.
