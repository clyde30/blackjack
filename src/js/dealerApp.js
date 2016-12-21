var app = angular.module('blackjackApp', ['firebase'])

  app.controller("AuthCtrl", ["$scope", "$firebaseAuth",
    function($scope, $firebaseAuth) {
      var auth = $firebaseAuth();

      $scope.signIn = function() {
        $scope.firebaseUser = null;
        $scope.error = null;

        auth.$signInAnonymously().then(function(firebaseUser) {
          $scope.firebaseUser = firebaseUser;
        }).catch(function(error) {
          $scope.error = error;
        });
      };
    }
  ]);

  app.controller('MainCtrl', function($scope, $firebaseObject) {

    var ref = firebase.database().ref();

    $scope.data = $firebaseObject(ref);

    $scope.bet = 0;
    $scope.showDealButton = false;

    $scope.shuffle = function () {
      var numDecks = $scope.numDecks;
      $scope.deck = shuffle(numDecks);
      $scope.shuffled = true;
      console.log("Shuffled " + numDecks + " decks");
    };

    $scope.resetBankroll = function () {
      $scope.data.bankroll = 2000;

      $scope.data.$save().then(function(ref) {
        ref.key === $scope.data.$id; // true
      }, function(error) {
        console.log("Error:", error);
      });
    }

    $scope.initialDeal = function () {
      $scope.showDealButton = false;
      $scope.noMoreBets = true;
      $scope.showWinnings = false;
      var deck = $scope.deck;
      console.log("Dealing");
      $scope.player = new Player();
      $scope.dealer = new Player();
      $scope.player.hand = dealHand(1, $scope.player.hand, deck);
      $scope.dealer.hand = dealHand(1, $scope.dealer.hand, deck);
      $scope.player.hand = dealHand(1, $scope.player.hand, deck);
      $scope.dealer.hand = dealHand(1, $scope.dealer.hand, deck);
      $scope.player.playerValue = handValue($scope.player.hand);
      if (blackjack($scope.player.hand)) {
        $scope.player.wins = true;
        $scope.dealer.wins = false;
        $scope.endHand();
      }
      console.log($scope.player.playerValue);
    };

    $scope.makeBet = function (val) {
      $scope.bet = $scope.bet + val;
      $scope.data.bankroll = $scope.data.bankroll - val;
      $scope.madeBet = true;
    }

    $scope.hit = function () {
      var playerVal;
      console.log("Hit");
      $scope.player.hand = dealHand(1, $scope.player.hand, $scope.deck);
      $scope.player.playerValue = handValue($scope.player.hand);
      $scope.player.isBust = checkBust($scope.player.playerValue);
      if ($scope.player.isBust) {
        $scope.push = false;
        $scope.player.wins = false;
        $scope.dealer.wins = true;

        $scope.endHand();
      };
    };

    $scope.stand = function () {
      console.log("Stand");
      while (!checkBust($scope.player.playerValue) && handValue($scope.dealer.hand) < 17) {
        $scope.dealer.hand = dealHand(1, $scope.dealer.hand, $scope.deck);
      }
      $scope.dealer.dealerValue = handValue($scope.dealer.hand);
      console.log($scope.dealer.dealerValue);
      $scope.dealer.isBust = checkBust($scope.dealer.dealerValue);
      $scope.push = checkPush($scope.dealer.dealerValue, $scope.player.playerValue);
      if ($scope.dealer.isBust) {
        $scope.player.wins = true;
        $scope.dealer.wins = false;
      }else {
        if (!$scope.push) {
          $scope.player.wins = playerWins($scope.dealer.dealerValue, $scope.player.playerValue);
          $scope.dealer.wins = dealerWins($scope.dealer.dealerValue, $scope.player.playerValue);
        }
      }
      $scope.endHand();
    };

    $scope.endHand = function () {
      $scope.winnings = calculatedWinnings($scope.bet, $scope.player.wins);
      $scope.showWinnings = true;
      $scope.data.bankroll = calculatedBankroll($scope.data.bankroll, $scope.winnings);
      $scope.bet = 0;
      $scope.madeBet = false;
      $scope.noMoreBets = false;

      //send data to firebase
      $scope.data.$save().then(function(ref) {
        ref.key === $scope.data.$id; // true
      }, function(error) {
        console.log("Error:", error);
      });
    };
  });
