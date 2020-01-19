const app = require('express')();
var http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
const game = require('./game');

const playersWaiting = [];

io.on('connection', function(socket){
  console.log('New user connected');

  socket.on('play', () => {
    playersWaiting.push(socket);
    console.log('A player is waiting for a game');

    console.log('Players waiting for a game: ' + playersWaiting.length);
    if (playersWaiting.length >= 2) {
      const firstPlayer = playersWaiting[0];
      const secondPlayer = playersWaiting[1];
      playersWaiting.splice(0, 2);
      firstPlayer.emit('gameOn');
      secondPlayer.emit('gameOn');
      setTimeout(() => {
        game(firstPlayer, secondPlayer);
      }, 1000);
    }
  });


  socket.on('disconnect', () => {
    console.log('A user has diconnect');
    if (playersWaiting.includes(socket)) {
      playersWaiting.splice(playersWaiting.findIndex((player) => player == socket), 1);
      return;
    }
    // find opponent to end the game
  });
});

http.listen(port, () => console.log(`App listening on port ${port}!`))