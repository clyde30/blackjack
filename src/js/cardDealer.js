function dealCard() {
	var card = deck.shift();

	return card;
};

function buildDeck(numDecks) {
  var suits = ["H", "D", "S", "C"];
  var deck = [];

  for (var i = 1; i <= numDecks; i++) {
    buildCardObjects(suits[i]);
  }

  function buildCardObjects(suit) {
    for(i=2; i<=14;i++){
        deck.push(new card(i,type))
      }
    }
    return deck;
};

function shuffleDeck(deck) {
  var newDeck = [];
  while (0 < deck.length){
    var randomNum = Math.round(Math.random()*(deck.length-1));
    var card = deck[randomNum];
    deck.splice(randomNum,1);
    newDeck.push(card);
  }
  return newDeck;
}

//build card object
function card(number,suit) {
	this.number = number;
	this.suit = suit;
	this.buildCard = getFaceCard(number) + suit;
	this.image = pickCardImage(number, suit);
	this.showCard = getFaceCard(number);
};
