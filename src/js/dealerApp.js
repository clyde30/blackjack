angular.module('blackjackApp', [])

  .controller('MainCtrl', [function() {
    var self = this;

    self.shuffle = function () {
      var numDecks = self.numDecks;
      self.deck = shuffle(numDecks);
      // self.player1.hand = [];
      // self.dealer.hand = [];
      console.log("Shuffled " + numDecks + " decks");
    };

    self.initialDeal = function () {
      console.log(self.deck);
      var deck = self.deck;
      console.log("Dealing");
      var player = new Player(dealNewHand(2, deck));
      // var dealer = new Player();
      player.hand.push();
      // dealer.hand.push(dealCard());
      console.log(player.hand);
      // console.log(dealer.hand);
    }


  }]);
