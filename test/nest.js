'use strict'

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

test("complex", function (t) {
  var stats = {
    "ravenwall_agent":"nodejs_0.1.9",
    "system.arch":"x64",
    "system.platform":"linux",
    "system.hostname":"x220",
    "system.uptime":2836104.000152195,
    "system.loadavg.1m":0.1494140625,
    "system.loadavg.5m":0.1513671875,
    "system.loadavg.15m":0.138671875,
    "system.cpu.cores":4,
    "system.cpu.model":"Intel(R) Core(TM) i7-2620M CPU @ 2.70GHz",
    "system.cpu.speed":2701,
    "system.memory.free":424890368,
    "system.memory.total":8255836160,
    "process.pid":26358,
    "process.title":"node",
    "process.uptime":15.239411229733378,
    "process.user":"bryce",
    "process.versions.http_parser":"1.0",
    "process.versions.node":"0.10.12",
    "process.versions.v8":"3.14.5.9",
    "process.versions.ares":"1.9.0-DEV",
    "process.versions.uv":"0.10.11",
    "process.versions.zlib":"1.2.3",
    "process.versions.modules":"11",
    "process.versions.openssl":"1.0.1e",
    "process.active_requests":1,
    "process.active_handles":2,
    "process.memory.rss":20504576,
    "process.memory.heapTotal":16571136,
    "process.memory.heapUsed":5504376,
    "statware.checktime":1372281169541,
    "statware.stats_runtime":0.000482022
  }

  var expect = { ravenwall_agent: 'nodejs_0.1.9',
    system:
     { arch: 'x64',
       platform: 'linux',
       hostname: 'x220',
       uptime: 2836104.000152195,
       loadavg: { '1m': 0.1494140625, '5m': 0.1513671875, '15m': 0.138671875 },
       cpu:
        { cores: 4,
          model: 'Intel(R) Core(TM) i7-2620M CPU @ 2.70GHz',
          speed: 2701 },
       memory: { free: 424890368, total: 8255836160 } },
    process:
     { pid: 26358,
       title: 'node',
       uptime: 15.239411229733378,
       user: 'bryce',
       versions:
        { http_parser: '1.0',
          node: '0.10.12',
          v8: '3.14.5.9',
          ares: '1.9.0-DEV',
          uv: '0.10.11',
          zlib: '1.2.3',
          modules: '11',
          openssl: '1.0.1e' },
       active_requests: 1,
       active_handles: 2,
       memory: { rss: 20504576, heapTotal: 16571136, heapUsed: 5504376 } },
    statware: { checktime: 1372281169541, stats_runtime: 0.000482022 }
  }


  t.deepEquals(nest(stats), expect, "nest complex structure")
  t.end()
})

test("nest empty", function (t) {
  var struct = {}
  var expect = {}
  t.deepEquals(nest(struct), expect, "empty object is still empty")
  t.end()
})

test("no prototype pollution", function (t) {
  nest({'constructor.prototype.fail': true})
  nest({'__proto__.bad': true})
  t.false({}.fail, "constructor.prototype not polluted")
  t.false({}.bad, "__proto__ not polluted")
  t.end()
})
