angular.module('blackjackApp', [])

  .controller('MainCtrl', [function() {
    var self = this;

    self.shuffle = function () {
      var numDecks = self.numDecks;
      shuffle(numDecks);
      self.player1 = [];
      self.dealer = [];
      console.log("Shuffled " + numDecks + " decks");
    };

    self.initialDeal = function () {
      self.player1 =  new Player();
      self.dealer = new Player();
      self.player1 = dealCard();
      self.dealer = dealCard();
      console.log(self.player1);
      console.log(self.dealer);
    }


  }]);
