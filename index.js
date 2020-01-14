const app = require('express')();
var http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

const playersWaiting = [];

io.on('connection', function(socket){
  console.log('a user connected');
  playersWaiting.push(socket);

  // If there is another player waiting, start a game

  socket.on('disconnect', () => {
    if (playersWaiting.includes(socket)) {
      playersWaiting.splice(playersWaiting.findIndex(socket), 1);
      return;
    }
    // find opponent to end the game
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))