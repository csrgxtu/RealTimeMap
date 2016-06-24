var colors = require('colors')
var maptail = require('../')
var express = require('express')
var bodyParser = require('body-parser');
var app = express.createServer()

app.use(maptail.track())
app.use(maptail.static())
app.use(bodyParser.json()); // for parsing application/json

maptail.attach(app)


app.put('/info', function (req, res) {
  console.log(req.body);

  // ip method path time
  maptail.emit('ip'
  , req.body.ip
  , req.body.ip.white + ' '
    + req.body.method + ' '
    + req.body.path.yellow
    + req.body.user_agent.red
  );

  res.send('ok');
})

app.listen(9999, function() {
  console.log("listen on localhost:9999")
})

function rand () {
  return Math.floor(Math.random() * 256)
}

var all = []
var paths = [ 'home', 'articles', 'img', 'js', 'css' ]
var subpaths = [ 'foo', 'bar', 'foobar' ]
for (var i = paths.length; i--;)
  for (var n = subpaths.length; n--;)
    for (var x = 3; x--;)
      all.push('/' + paths[i] + '/' + subpaths[n] + '/' + Math.floor(Math.random() * Date.now()).toString(36).substr(0, 4))

var ips = ["202.96.128.86", "202.103.224.68", "218.104.128.106", "202.101.224.69"]
for (var i = 10; i--;) {
  ips.push([0,0,0,0].map(rand).join('.'))
}

var n = 0
;(function emitRandomIP () {
  if (Math.random() * 10 < 3) {
    ips.push([0,0,0,0].map(rand).join('.'))
    if (ips.length > 500) ips.shift()
    var ip = ips[Math.floor(Math.random() * (ips.length * 0.7))]
    for (var i = Math.floor(Math.random() * 10) + 1; i--;) {
      setTimeout(function () {
        maptail.emit('ip'
        , ip
        , ip.white + ' '
          + all[Math.floor(Math.random() * all.length)] + ' '
          + 'log line '.yellow
          + 'log line '.red
        )
      }, Math.floor(Math.random() * 500))
    }
  }
  setTimeout(emitRandomIP, Math.floor(Math.random() * 600) + 20)
}());


maptail.config.onlyLookups = true
maptail.config.bufferTime = 30
