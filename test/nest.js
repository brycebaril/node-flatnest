var test = require("tape").test

var nest = require("../nest")

test("init", function (t) {
  t.equals(typeof nest, "function", "it's a function")
  t.end()
})

test("nest", function (t) {
  var struct = {
    aa: "bar",
    bb: 12.141,
    cc: null,
    "dd[0]": "a",
    "dd[1]": "b",
    "dd[2]": "c",
    "gg.greeting": "Hello",
    "gg.bye": false,
    "hh.ii[0]": "d",
    "hh.ii[1]": "e",
    "hh.ii[2]": "f",
    "hh.jj[0].kk": "deeep",
    "hh.jj[1].ll": "blah",
    "nn[0][0]": "g",
    "nn[0][1]": "h",
    "nn[1][0]": "i",
    "nn[1][1]": "j",
  }

  var expect = {
    aa: "bar",
    bb: 12.141,
    cc: null,
    dd: ["a", "b", "c"],
    gg: {greeting: "Hello", bye: false},
    hh: {ii: ["d", "e", "f"], jj: [{kk: "deeep"}, {ll: "blah"}]},
    nn: [["g", "h"], ["i", "j"]]
  }
  t.deepEquals(nest(struct), expect, "Correct transformation")
  t.end()
})

test("circular", function (t) {
  var aa = {hi: "there"}
  var bb = {aa: {dd: aa}}
  aa.bye = bb
  aa.cc = {foo: aa}

  var flat = {
    "aa.dd.hi": "there",
    "aa.dd.bye": "[Circular (this)]",
    "aa.dd.cc.foo": "[Circular (aa.dd)]"
  }

  var nested = nest(flat)
  t.equals(nested["aa"]["dd"]["hi"], "there")
  t.equals(nested["aa"]["dd"]["bye"]["aa"]["dd"]["hi"], "there")
  t.equals(nested["aa"]["dd"]["cc"]["foo"]["hi"], "there")
  t.end()
})