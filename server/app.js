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
  // ip method path time
  maptail.emit('ip'
  , req.body.ip
  , req.body.ip.white + ' '
    + req.body.method + ' '
    + req.body.path.yellow
    + req.body.user_agent.red
  )

  res.send('ok')
})

app.listen(9999, function() {
  console.log("listen on localhost:9999")
})

maptail.config.onlyLookups = true
maptail.config.bufferTime = 3000
