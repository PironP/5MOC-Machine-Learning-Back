const roundResult = require('./result');

module.exports = (playerOne, playerTwo) => {
  let choicePOne = null;
  let choicePTwo = null;
  let round = 1;

  const playersPlayed = () => {
    if (choicePOne && choicePTwo) {
      const result = roundResult(choicePOne, choicePTwo);
      resolveRound(result);
      choicePOne = null;
      choicePTwo = null;
      if (round > 3) {
        playerOne.disconnect();
        playerTwo.disconnect();
        return;
      }
    }
  }

  const resolveRound = (result) => {
    let resultPOne = '';
    let resultPTwo = '';
    if (result === 0) {
      resultPOne = 'draw';
      resultPTwo = 'draw';
    } else if (result === 1) {
      resultPOne = 'win';
      resultPTwo = 'loose';
      round++;
    } else {
      resultPOne = 'loose';
      resultPTwo = 'win';
      round++;
    }
    playerOne.emit('endRound', resultPOne);
    playerTwo.emit('endRound', resultPTwo);
  };

  playerOne.on('choice', (choice) => {
    choicePOne = choice;
    playersPlayed();
  });

  playerTwo.on('choice', (choice) => {
    choicePTwo = choice;
    playersPlayed();
  });
}
