var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

var usersConnected = [];
io.on('connection', function(socket){
  console.log('a user connected');


  socket.on('disconnect', function(){
    console.log('user disconnected');

  });


  socket.on('writing', function(txt){
    io.emit('writing', txt);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
