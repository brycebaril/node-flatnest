var test = require("tape").test

var seek = require("../seek")

test("init", function (t) {
  t.equals(typeof seek, "function", "it's a function")
  t.end()
})

test("seek", function (t) {
  var obj = {
    aa: "100",
    bb: {cc: [{dd: 110, ee: 120}]},
    ff: [[130], [140]]
  }

  t.equals(seek(obj, "aa"), obj["aa"])
  t.deepEquals(seek(obj, "bb"), obj["bb"])
  t.deepEquals(seek(obj, "bb.cc"), obj["bb"]["cc"])
  t.equals(seek(obj, "bb.cc[0].ee"), obj["bb"]["cc"][0]["ee"])
  t.equals(seek(obj, "ff[0][1]"), obj["ff"][0][1])
  t.end()
})