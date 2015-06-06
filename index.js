var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

var randomUserNames = ['Anonymous Nyan Cat', "Anonymous Llama", "Anonymous Troll", "Anonymous Doge"];
var randomUsername;
var connectedUsers = [];

var usersConnected = [];
io.on('connection', function(socket){
  console.log('a user connected');
	randomUsername = randomUserNames[Math.floor(Math.random()*randomUserNames.length)];
	connectedUsers.push(randomUsername);
  console.log(connectedUsers);

  io.emit('join', connectedUsers);

  socket.on('disconnect', function(){
    console.log('user disconnected');
    connectedUsers.pop();
    console.log(connectedUsers);
  });


  socket.on('writing', function(txt){
    io.emit('writing', txt);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
