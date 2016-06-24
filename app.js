var colors = require('colors')
var maptail = require('maptail')
var express = require('express')
var bodyParser = require('body-parser');
var app = express.createServer()

app.use(maptail.track())
app.use(maptail.static())
app.use(bodyParser.json()); // for parsing application/json

maptail.attach(app)

app.put('/info', function (req, res) {
  console.log(req.body.ip)

  maptail.emit('ip'
  , req.body.ip
  , req.body.ip.white + ' '
    + req.body.path + ' '
    + 'log line '.yellow
    + 'log line '.red
  )

  res.send('ok')
})

app.listen(8080, 'localhost', function() {
  console.log("listen on localhost:8080")
})

// generate dummy data

// function rand () {
//   return Math.floor(Math.random() * 256)
// }
//
// var all = []
// var paths = [ 'home', 'articles', 'img', 'js', 'css' ]
// var subpaths = [ 'foo', 'bar', 'foobar' ]
// for (var i = paths.length; i--;)
//   for (var n = subpaths.length; n--;)
//     for (var x = 3; x--;)
//       all.push('/' + paths[i] + '/' + subpaths[n] + '/' + Math.floor(Math.random() * Date.now()).toString(36).substr(0, 4))
// var ips = []
// for (var i = 10; i--;) {
//   // ips.push([0,0,0,0].map(rand).join('.'))
//   ips.push("124.232.154.82")
//   ips.push("61.140.89.129")
//   ips.push("202.197.224.4")
//   ips.push("116.211.121.164")
//   ips.push("106.120.124.210")
//   ips.push("210.39.3.164")
//   ips.push("202.117.1.13")
//   ips.push("202.200.32.20")
//   ips.push("202.112.14.178")
//   ips.push("218.22.21.21")
//   ips.push("61.167.60.70")
//   ips.push("210.41.4.68")
//   ips.push("111.115.76.75")
//   ips.push("210.27.177.240")
//   ips.push("202.201.0.216")
// }
//
// var n = 0
// ;(function emitRandomIP () {
//   if (Math.random() * 10 < 3) {
//     ips.push([0,0,0,0].map(rand).join('.'))
//     if (ips.length > 500) ips.shift()
//     var ip = ips[Math.floor(Math.random() * (ips.length * 0.7))]
//     for (var i = Math.floor(Math.random() * 10) + 1; i--;) {
//       setTimeout(function () {
//         console.log(ip);
//         maptail.emit('ip'
//         , ip
//         , ip.white + ' '
//           + all[Math.floor(Math.random() * all.length)] + ' '
//           + 'log line '.yellow
//           + 'log line '.red
//         )
//       }, Math.floor(Math.random() * 500))
//     }
//   }
//   setTimeout(emitRandomIP, Math.floor(Math.random() * 600) + 20)
// }());

maptail.config.onlyLookups = true
maptail.config.bufferTime = 3000
