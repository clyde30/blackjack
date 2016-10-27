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
      self.player = new Player(dealNewHand(2, deck));
      self.dealer = new Player(dealNewHand(2, deck));
      self.player.hand.push();
      self.dealer.hand.push();
      console.log(self.player.hand);
    }
  }]);
