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

function checkBust(handVal) {
	if (handVal > 21) {
		return true;
	} else {
		return false;
	}
}

function handValue(hand) {
	var cardArray = [];
	var val = 0;
	for (var i = 0; i < hand.length; i++) {
			var card = hand[i];
			cardArray.push(card.val);
		}
	for (var i = 0; i < cardArray.length; i++) {
		val = val + cardArray[i]
	}

	for (var i = 0; val > 21 && i < cardArray.length; i++) {
		if (cardArray[i] == 11) {
			cardArray[i] = 1;
		}

			val = 0;
			for (var i = 0; i < cardArray.length; i++) {
				val = val + cardArray[i]
			}
		}
	return val;
}
