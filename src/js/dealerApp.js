angular.module('blackjackApp', [])

  .controller('MainCtrl', [function() {
    var self = this;

    self.shuffle = function () {
      var numDecks = self.numDecks;
      self.deck = shuffle(numDecks);
      console.log("Shuffled " + numDecks + " decks");
    };

    self.initialDeal = function () {
      var deck = self.deck;
      console.log("Dealing");
      self.player = new Player();
      self.dealer = new Player();
      self.player.hand = dealHand(1, self.player.hand, deck);
      self.dealer.hand = dealHand(1, self.dealer.hand, deck);
      self.player.hand = dealHand(1, self.player.hand, deck);
      self.dealer.hand = dealHand(1, self.dealer.hand, deck);
    };

    self.hit = function () {
      console.log("Hit");
      self.player.hand = dealHand(1, self.player.hand, self.deck);
    };
  }]);
