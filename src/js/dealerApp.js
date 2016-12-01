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
      self.player.playerValue = handValue(self.player.hand);
      console.log(self.player.playerValue);
    };

    self.hit = function () {
      self.bust = false;
      console.log("Hit");
      self.player.hand = dealHand(1, self.player.hand, self.deck);
      self.player.playerValue = handValue(self.player.hand);

      self.bust = checkBust(self.player.playerValue);
      if (self.bust) {
        self.player.playerValue = self.player.playerValue + " Bust";
      }
      console.log(self.player.playerValue);
    };

    self.stand = function () {
      self.bust = checkBust(self.dealer.dealerValue);
      console.log("Stand");
      if (!self.bust){
        while (handValue(self.dealer.hand) < 17) {
        self.dealer.hand = dealHand(1, self.dealer.hand, self.deck);
        }
        self.dealer.dealerValue = handValue(self.dealer.hand);
        self.bust = checkBust(self.dealer.dealerValue);
        console.log(self.dealer.dealerValue);
        if (self.bust) {
          console.log("Dealer Busts");
        }
      }
    }
  }]);
