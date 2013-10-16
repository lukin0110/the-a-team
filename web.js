var express = require("express");
var socket = require('socket.io');
var http = require('http');
var eco = require('eco');
var fs = require('fs');
var path = require('path');

var app = express();

app.use(express.logger());

app.get('/', function(request, response) {
    var template = fs.readFileSync(path.join(__dirname, "templates/index.eco.html"), "utf-8")
    var context = {};
    response.send(eco.render(template, context));
});

// Serve static content
app.use("/static", express.static(__dirname + "/static"));


var port = process.env.PORT || 5000;
var server = http.createServer(app);
server.listen(port);

// Using websockets on Heroku
// https://devcenter.heroku.com/articles/node-websockets
// But for now we're still using socket.io since it supports fallback mechanism :)
var io = socket.listen(server);
io.sockets.on('connection', function(socket){
    console.log("We've got a connection");
});
