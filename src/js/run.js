function runApp (numPlayers) {
  var cards = deal(numPlayers);
  hand = new Hand(cards);
  // rankHand(hand);
  return hand;

}
