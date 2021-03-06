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

function cardSum(cardArray) {
	var sum = cardArray.reduce(function(a,b) {
		return a + b;
	}, 0);
	return sum;
}

function revalueAce(val, cardArray) {

}

function handValue(hand) {
	var cardArray = [];
	var val = 0;
	for (var i = 0; i < hand.length; i++) {
			var card = hand[i];
			cardArray.push(card.val);
		}
	val = cardSum(cardArray);
	//Change Aces to ones if bust
	while (val > 21 && cardArray.includes(11)) {
		cardArray[cardArray.indexOf(11)] = 1;
		val = cardSum(cardArray);
	}
	return val;
}
