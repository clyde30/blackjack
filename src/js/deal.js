function dealCard() {
	var card = deck.shift();

	return card;
};

function dealNewHand(numcards) {
	var hand = [];
	for (var i = 0; i <=numcards; i++) {
		hand.push(dealCard())
	}
	return hand;
}
