$("#level-title").one('click', function(e) {
    // conts
    var btn;
    var colors = ["green", "yellow", "red", "blue"];
    // variables
    var randClicked = [];
    var userClicked = [];
    var round = 1;
    var lose = false;
    var i = 0
    // start the game
    $("h1").text("Level " + round);
    // select random color
    rand(round);
    // go to the next round
    round++;
    // decet what users clicks
    $(".btn").on("click", function(event) {
      if (colors.includes(event.target.classList[1])) {
        btnClicked = event.target.classList[1];
        var sound = new Audio("sounds/" + btnClicked + ".mp3");
        $("#" + btnClicked).fadeOut(100).fadeIn(100);
        setTimeout(() => {
          sound.play();
        }, 100);
        userClicked.push(btnClicked);
        wait(userClicked.length, randClicked.length);
      }
    })

    // select random color between from the colors array
    function rand(round) {
      for (; i < round; i++) {
        randColor = colors[Math.floor(Math.random() * colors.length)];
        var sound = new Audio("sounds/" + randColor + ".mp3");
        $("#" + randColor).fadeOut(100).fadeIn(100);
        setTimeout(() => {
          sound.play();
        }, 100);
        randClicked.push(randColor);
      }
      console.log("ROUND " + round + " random " + randClicked);
    }
    // compare the two arrays
    function compare(a, b) {
      for (var i = 0; i < a.length; i++)
        if (a[i] != b[i])
          return false;
      return true;
    }
    // waits until the user finish clicking
    function wait(param1, param2) {
      if (param1 != param2) {
        setTimeout(wait, 100, param1, param2)
      } else { // if the user wins the round
        if (compare(userClicked, randClicked)) {
          setTimeout(() => {
            rand(round);
          $("h1").text("Level " + round);
          round++;
          userClicked = [];
        }, 1000);

      } else { // if the user loses the round
          $("h1").text("GAME OVER!");
          var sound = new Audio("sounds/wrong.mp3");
          sound.play();
          var $el = $("body"),
            x = 700,
            originalColor = $el.css("background");
          $el.css("background", "red");
          setTimeout(function() {
            $el.css("background", originalColor);
          }, x);
          setTimeout(() => {
          location.reload();
        }, 1000);
          return;
        }

      }
    }
});
