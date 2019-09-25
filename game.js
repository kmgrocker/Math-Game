var playing = false;
var correct = document.getElementById("correct");
var wrong = document.getElementById("wrong");

document.getElementById("startreset").onclick = function() {
  if (playing === true) {
    location.reload();
  } else if (document.getElementById("startreset").innerHTML === "Play Again") {
    location.reload();
  } else {
    playing = true;

    //? choose any name reset or play again
    // document.getElementById("startreset").innerHTML = "Reset Game";
    document.getElementById("startreset").innerHTML = "reset game";
    var scoreValue = document.getElementById("score-value").innerHTML;
    scoreValue = 0;
    document.getElementById("gameover").style.display = "none";

    //wrapping repeted action in function
    var option = document.getElementsByClassName("box");
    var a, b, c, d;
    function Action() {
      var x = Math.floor(Math.random() * 20) + 1;
      var y = Math.floor(Math.random() * 20) + 1;

      document.getElementById("question").innerHTML = `${x}X${y}`;

      a = x * y;
      var corectAnsPos = 1 + Math.floor(Math.random() * 4);
      document.getElementById(`box${corectAnsPos}`).innerHTML = a;

      var wrong = new Set(); //set will generate unique value

      while (wrong.size !== 6) {
        // wrong.add(Math.floor(Math.random() * 399) + 1);
        wrong.add(
          (Math.floor(Math.random() * 20) + 1) *
            (Math.floor(Math.random() * 20) + 1)
        );
      }
      //   console.log(wrong);   // ? for testing
      if (wrong.has(a) === true) {
        wrong.delete(a);
      }
      var wrongAns = [...wrong]; //make sure that wrong array don't have true value in them

      // console.log(wrongAns);  // ? for testing

      for (var i = 1; i < 5; i++) {
        if (i != corectAnsPos) {
          document.getElementById(`box${i}`).innerHTML = wrongAns[i];
        }
      }
    }
    Action();

    for (let i = 0; i < 4; i++) {
      option[i].addEventListener("click", function(e) {
        if (playing === true) {
          if (e.target.innerHTML == a) {
            correct.style.display = "block";

            scoreValue++;
            document.getElementById("score-value").innerHTML = scoreValue;
            wrong.style.display = "none";
            Action();
          } else {
            wrong.style.display = "block";
          }
        }
      });
    }

    //counter part
    var time = 60;
    document.getElementById("time-remaining").style.display = "block";
    var counter = setInterval(function() {
      time--;
      if (time < 0) {
        clearInterval(counter);
        document.getElementById("total-score").innerHTML = scoreValue;
        document.getElementById("gameover").style.display = "block";
        document.getElementById("startreset").innerHTML = "Play Again";
        correct.style.display = "none";
        playing = false;
      } else {
        document.getElementById("time-remaining-value").innerHTML = time;
      }
    }, 1000);
  }
};
