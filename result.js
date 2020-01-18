module.exports = (choicePOne, choicePTwo) => {
  if (choicePOne === choicePTwo) {
    return 0;
  } else if (choicePOne === 'Vide') {
    return 2;
  } else if (choicePTwo === 'Vide') {
    return 1
  } else if (
    (choicePOne === 'Pierre' && choicePTwo === 'Ciseau')
    || (choicePOne === 'Ciseau' && choicePTwo === 'Feuille')
    || (choicePOne === 'Feuille' && choicePTwo === 'Pierre')
    ) {
      return 1
    } else {
      return 2
    }
}