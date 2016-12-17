var main = angular.module('blackjackApp', ['ngStorage'])

  main.controller('MainCtrl', function($scope, $localStorage, $sessionStorage) {
    var self = this;
    self.storage = $localStorage;
    self.bet = 0;
    self.showDealButton = false;

    self.shuffle = function () {
      var numDecks = self.numDecks;
      self.deck = shuffle(numDecks);
      console.log("Shuffled " + numDecks + " decks");
    };
    self.resetBankroll = function () {
      self.storage.bankroll = 1000;
    }

    self.initialDeal = function () {
      self.showDealButton = false;
      self.showWinnings = false;
      var deck = self.deck;
      console.log("Dealing");
      self.player = new Player();
      self.dealer = new Player();
      self.player.hand = dealHand(1, self.player.hand, deck);
      self.dealer.hand = dealHand(1, self.dealer.hand, deck);
      self.player.hand = dealHand(1, self.player.hand, deck);
      self.dealer.hand = dealHand(1, self.dealer.hand, deck);
      self.player.playerValue = handValue(self.player.hand);
      if (blackjack(self.player.hand)) {
        self.player.wins = true;
        self.dealer.wins = false;
        self.endHand();
      }
      console.log(self.player.playerValue);
    };

    self.makeBet = function (val) {
      self.bet = self.bet + val;
      self.storage.bankroll = self.storage.bankroll - val;
      self.showDealButton = true;
    }

    self.hit = function () {
      var playerVal;
      console.log("Hit");
      self.player.hand = dealHand(1, self.player.hand, self.deck);
      self.player.playerValue = handValue(self.player.hand);
      self.player.isBust = checkBust(self.player.playerValue);
      if (self.player.isBust) {
        self.push = false;
        self.player.wins = false;
        self.dealer.wins = true;

        self.endHand();
      };
    };

    self.stand = function () {
      console.log("Stand");
      while (!checkBust(self.player.playerValue) && handValue(self.dealer.hand) < 17) {
        self.dealer.hand = dealHand(1, self.dealer.hand, self.deck);
      }
      self.dealer.dealerValue = handValue(self.dealer.hand);
      console.log(self.dealer.dealerValue);
      self.dealer.isBust = checkBust(self.dealer.dealerValue);
      self.push = checkPush(self.dealer.dealerValue, self.player.playerValue);
      if (self.dealer.isBust) {
        self.player.wins = true;
        self.dealer.wins = false;
      }else {
        if (!self.push) {
          self.player.wins = playerWins(self.dealer.dealerValue, self.player.playerValue);
          self.dealer.wins = dealerWins(self.dealer.dealerValue, self.player.playerValue);
        }
      }
      self.endHand();
    };

    self.endHand = function () {
      self.winnings = calculatedWinnings(self.bet, self.player.wins);
      self.showWinnings = true;
      self.storage.bankroll = calculatedBankroll(self.storage.bankroll, self.winnings);
      self.bet = 0;
      self.showDealButton = true;
    };

  });
