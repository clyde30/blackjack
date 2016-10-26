angular.module('blackjackApp', [])

  .controller('MainCtrl', [function() {
    var self = this;

    self.shuffle = function () {
      var numDecks = self.numDecks;
      shuffle(numDecks);
      // self.player1.hand = [];
      // self.dealer.hand = [];
      console.log("Shuffled " + numDecks + " decks");
    };

    self.initialDeal = function () {
      console.log("Dealing");
      var player =  new Player();
      var dealer = new Player();
      player.hand.push(dealCard());
      dealer.hand.push(dealCard());
      console.log(player.hand);
      console.log(dealer.hand);
    }


  }]);
