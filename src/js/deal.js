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
