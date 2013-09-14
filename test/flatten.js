var test = require("tape").test

var flatten = require("../flatten")

test("init", function (t) {
  t.equals(typeof flatten, "function", "it's a function")
  t.end()
})

test("flatten", function (t) {
  var struct = {
    aa: "bar",
    bb: 12.141,
    cc: null,
    dd: ["a", "b", "c"],
    ee: {},
    ff: {},
    gg: {greeting: "Hello", bye: false},
    hh: {ii: ["d", "e", "f"], jj: [{kk: "deeep"}, {ll: "blah"}]},
    mm: [],
    nn: [["g", "h"], ["i", "j"]]
  }

  var expect = {
    aa: "bar",
    bb: 12.141,
    cc: null,
    "dd[0]": "a",
    "dd[1]": "b",
    "dd[2]": "c",
    "ee.": null,
    "ff.": null,
    "gg.greeting": "Hello",
    "gg.bye": false,
    "hh.ii[0]": "d",
    "hh.ii[1]": "e",
    "hh.ii[2]": "f",
    "hh.jj[0].kk": "deeep",
    "hh.jj[1].ll": "blah",
    "mm[]": null,
    "nn[0][0]": "g",
    "nn[0][1]": "h",
    "nn[1][0]": "i",
    "nn[1][1]": "j",
  }
  t.deepEquals(flatten(struct), expect, "Correct transformation")
  t.end()
})

test("circular", function (t) {
  var aa = {hi: "there"}
  var bb = {aa: {dd: aa}}
  aa.bye = bb

  var expect = {
    "aa.dd.hi": "there",
    "aa.dd.bye": "[Circular (this)]"
  }
  t.deepEquals(flatten(bb), expect, "Correct handling of circular refs")

  aa.cc = {foo: aa}

  expect = {
    "aa.dd.hi": "there",
    "aa.dd.bye": "[Circular (this)]",
    "aa.dd.cc.foo": "[Circular (aa.dd)]"
  }

  t.deepEquals(flatten(bb), expect, "Correct handling of circular refs")
  t.end()
})