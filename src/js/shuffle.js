function shuffle(numDecks) {
  var deck = [];
  deck = buildDeck(numDecks);
  return shuffleDeck(deck);
}

function buildDeck(numDecks) {
  var suits = ["H", "D", "S", "C"];
  var deck = [];

for (var j = 0; j < numDecks; j++) {
  for (var i = 0; i < suits.length; i++) {
    buildCardObjects(suits[i]);
  }
}

  function buildCardObjects(suit) {
    for(var i=2; i<=14;i++){
        deck.push(new card(i,suit))
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
  this.val = getCardValue(number);
};

function pickCardImage(number, suit) {

  if (suit === "H") {suit = "hearts"};
  if (suit === "D") {suit = "diamonds"};
  if (suit === "S") {suit = "spades"};
  if (suit === "C") {suit = "clubs"};

  if (number === 11) {number = "jack"};
  if (number === 12) {number = "queen"};
  if (number === 13) {number = "king"};
  if (number === 14) {number = "ace"};


  return number + "_of_"+suit+".jpg";
}

function getFaceCard (number) {
  var faceName;

  if (number <   11) {faceName = number};
  if (number === 11) {faceName = "jack"};
  if (number === 12) {faceName = "queen"};
  if (number === 13) {faceName = "king"};
  if (number === 14) {faceName = "ace"};
  return faceName;
}

function getCardValue(number) {
  var cardValue = 10;
  if (number < 10) {cardValue = number};
  if (number === 14) {cardValue = 11};

  return cardValue;
}
