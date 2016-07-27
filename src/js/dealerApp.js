angular.module('blackjackApp', [])

  .controller('MainCtrl', [function() {
    var self = this;

    // self.dealHand = function (num) {
    //   self.hand1 = runApp(num);
    //   self.hand2 = runApp(num);
    //   console.log(self.hand1);
    //   console.log(self.hand2);
    //
    //   rankPlayers(self.hand1, self.hand2);

      //finds winner. Doesn't work with push.
      //todo -- move to function
    // };

    self.shuffle = function () {
      var numDecks = self.numDecks;
      shuffle(numDecks);
      console.log("Shuffled " + numDecks + " decks");
    };

  }]);
