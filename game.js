const roundResult = require('./result');

module.exports = (playerOne, playerTwo) => {
  let choicePOne = null;
  let choicePTwo = null;
  let round = 1;

  const playersPlayed = () => {
    if (choicePOne && choicePTwo) {
      const result = roundResult(choicePOne, choicePTwo);
      round += resolveRound(playerOne, playerTwo, result);
      choicePOne = null;
      choicePTwo = null;
      if (round > 3) {
        playerOne.disconnect();
        playerTwo.disconnect();
        return;
      }
    }
  }

  playerOne.on('choice', (choice) => {
    choicePOne = choice;
    playersPlayed();
  });

  playerTwo.on('choice', (choice) => {
    choicePTwo = choice;
    playersPlayed();
  });
}

const resolveRound = (playerOne, playerTwo, result) => {
  if (result === 0) {
    resultPOne = 'draw';
    resultPTwo = 'draw';
  } else if (result === 1) {
    resultPOne = 'win';
    resultPTwo = 'loose';
  } else {
    resultPOne = 'loose';
    resultPTwo = 'win';
  }
  playerOne.emit('endRound', resultPOne);
  playerTwo.emit('endRound', resultPTwo);
  // increment round;
  return result === 0 ? 0 : 1;
};
