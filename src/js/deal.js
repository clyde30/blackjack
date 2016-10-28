function dealCard(deck) {
	var card = deck.shift();

	return card;
};

function dealHand(numcards, hand, deck) {
	for (var i = 0; i < numcards; i++) {
		hand.push(dealCard(deck))
	}
	return hand;
}

function handValue(hand) {
	var val = 0;
	for (var i = 0; i < hand.length; i++) {
			var card = hand[i];
			val = val + card.val;
		}
	return val;
}
