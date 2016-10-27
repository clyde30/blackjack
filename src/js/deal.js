function dealCard(deck) {
	var card = deck.shift();

	return card;
};

function dealNewHand(numcards, deck) {
	var hand = [];
	for (var i = 0; i < numcards; i++) {
		hand.push(dealCard(deck))
	}
	return hand;
}
