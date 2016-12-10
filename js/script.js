document.addEventListener("DOMContentLoaded", function(event) {
  (function (global){

    var playerturn = 1;

    //Array of gameboard buttons IDs
    var givenselector = new Array();
    for (i=0; i<9; i++){
      j=i+1;
      givenselector[i] = "#btn"+j;
    }

    //Array of gameboard buttons IDs
    var changeTurn = function (nextTurn){
      if (nextTurn == 1){
        document.querySelector("#player-1").innerHTML = '<p class="active-player">player 1</p>';
        document.querySelector("#player-2").innerHTML = '<p>player 2</p>';
      }
      else if (nextTurn == 2){
        document.querySelector("#player-1").innerHTML = '<p>player 1</p>';
        document.querySelector("#player-2").innerHTML = '<p class="active-player">player 2</p>';
      }
    }

    //function to check for pushed button
    var checkPushedButton = function (classes){
      var pushedClass = 0;
      if (classes.indexOf("pushed-1") != -1) {
        pushedClass = 1;
      }
      else if (classes.indexOf("pushed-2") != -1) {
        pushedClass = 2;
      }
      return pushedClass;
    }

    //function that returns class on passing Id
    var classReturn = function (passedId){
      var returnClass = document.querySelector(passedId).className;
      return returnClass;
    }

    //function to check for winnig combination
    var winningCombinationCheck = function (oneTotal){
      var wincomb = [321,654,987,741,852,963,951,753];

      var total = new Array();
      total[0] = (oneTotal)%10;
      total[1] = (((oneTotal)%100)-((oneTotal)%10))/10;
      total[2] = (((oneTotal)%1000)-((oneTotal)%100))/100;
      total[3] = (((oneTotal)%10000)-((oneTotal)%1000))/1000;
      total[4] = (((oneTotal)%100000)-((oneTotal)%10000))/10000;

      for (m=0; m<8; m++){
        var digit1 = (wincomb[m])%10;
        var digit2 = (((wincomb[m])%100)-((wincomb[m])%10))/10;
        var digit3 = (((wincomb[m])%1000)-((wincomb[m])%100))/100;
        var digitmatch=0;
        total[5] = 0;
        for (n=0; n<5; n++){
          if ((total[n]==digit1)||(total[n]==digit2)||(total[n]==digit3)){
            digitmatch++;
          }
        }
        if (digitmatch==3){
          var returnwin = 1;
          break;
        }
      }
      return returnwin;
    }

    //function to check if Game is over
    var isGameOver = function (){
      //check if all boxes are filled
      var boxesFilled = 0;
      var oneFilled = 0;
      var twoFilled = 0;
      var oneTotal = 0;
      var twoTotal = 0;
      var multiplier = 1;

      for (k=0; k<9; k++){
        var toBeTestedId = givenselector[k];
        var classes = classReturn(toBeTestedId);
        if (classes.indexOf("pushed-1") != -1) {
          multiplier = Math.pow(10,oneFilled);
          oneTotal += ((k+1)*multiplier);
          oneFilled++;
          boxesFilled++;
        }
        else if (classes.indexOf("pushed-2") != -1) {
          multiplier = Math.pow(10,twoFilled);
          twoTotal += ((k+1)*multiplier);
          twoFilled++;
          boxesFilled++;
        }
      }
      var tenreturn;
      var onewon = winningCombinationCheck(oneTotal);
      var twowon = winningCombinationCheck(twoTotal);
      if (onewon==1){
        tenreturn=1;
      }
      else if(twowon==1){
        tenreturn=2;
      }
      else {
        if (boxesFilled==9) {
          tenreturn=3;
        }
        else {
          tenreturn=0;
        }
      }
      console.log(tenreturn);
      return ((10*tenreturn)+boxesFilled);
    }


    //Button Click Event Handler
    document.querySelector(givenselector[0]).addEventListener("click",function (event){
      var classes = document.querySelector(givenselector[0]).className;
      document.querySelector("#result-div").innerHTML = "";

      var gameOverCheck = isGameOver();
      var boxesCheck = gameOverCheck % 10;
      var tenCheck = (gameOverCheck-boxesCheck)/10;

      if (tenCheck==0){
        if (checkPushedButton(classes)==0){
          if ((playerturn % 2) != 0){
            classes += " pushed-1";
            document.querySelector(givenselector[0]).innerText = "o";
            playerturn++;
            changeTurn(2);
          }
          else{
            classes += " pushed-2";
            document.querySelector(givenselector[0]).innerText = "x";
            playerturn++;
            changeTurn(1);
          }
          document.querySelector(givenselector[0]).className = classes;
        }
        else{
          document.querySelector("#result-div").innerHTML = "<p>This box is already filled</p>";
        }
        var newgameOverCheck = isGameOver();
        var newboxesCheck = newgameOverCheck % 10;
        var newtenCheck = (newgameOverCheck-newboxesCheck)/10;
        // console.log(newgameOverCheck);
        if (newtenCheck != 0){
          if (newtenCheck==3){
            document.querySelector("#result-div").innerHTML = "<p>Game Over : Game Tie</p>";
          }
          else{
            document.querySelector("#result-div").innerHTML = "<p>Game Over : Player "+newtenCheck+" wins</p>";
          }
        }
      }
      else{
        if (tenCheck==3){
          document.querySelector("#result-div").innerHTML = "<p>Game Over : Game Tie</p>";
        }
        else{
          document.querySelector("#result-div").innerHTML = "<p>Game Over : Player "+tenCheck+" wins</p>";
        }
      }
    });

    document.querySelector(givenselector[1]).addEventListener("click",function (event){var classes = document.querySelector(givenselector[1]).className;document.querySelector("#result-div").innerHTML = "";var gameOverCheck = isGameOver();var boxesCheck = gameOverCheck % 10;var tenCheck = (gameOverCheck-boxesCheck)/10;if (tenCheck==0){if (checkPushedButton(classes)==0){if ((playerturn % 2) != 0){classes += " pushed-1";document.querySelector(givenselector[1]).innerText = "o";playerturn++;changeTurn(2);}else{classes += " pushed-2";document.querySelector(givenselector[1]).innerText = "x";playerturn++;changeTurn(1);}document.querySelector(givenselector[1]).className = classes;}else{document.querySelector("#result-div").innerHTML = "<p>This box is already filled</p>";}var newgameOverCheck = isGameOver();var newboxesCheck = newgameOverCheck % 10;var newtenCheck = (newgameOverCheck-newboxesCheck)/10;if (newtenCheck != 0){if (newtenCheck==3){document.querySelector("#result-div").innerHTML = "<p>Game Over : Game Tie</p>";}else{document.querySelector("#result-div").innerHTML = "<p>Game Over : Player "+newtenCheck+" wins</p>";}}}else{if (tenCheck==3){document.querySelector("#result-div").innerHTML = "<p>Game Over : Game Tie</p>";}else{document.querySelector("#result-div").innerHTML = "<p>Game Over : Player "+tenCheck+" wins</p>";}}});
    document.querySelector(givenselector[2]).addEventListener("click",function (event){var classes = document.querySelector(givenselector[2]).className;document.querySelector("#result-div").innerHTML = "";var gameOverCheck = isGameOver();var boxesCheck = gameOverCheck % 10;var tenCheck = (gameOverCheck-boxesCheck)/10;if (tenCheck==0){if (checkPushedButton(classes)==0){if ((playerturn % 2) != 0){classes += " pushed-1";document.querySelector(givenselector[2]).innerText = "o";playerturn++;changeTurn(2);}else{classes += " pushed-2";document.querySelector(givenselector[2]).innerText = "x";playerturn++;changeTurn(1);}document.querySelector(givenselector[2]).className = classes;}else{document.querySelector("#result-div").innerHTML = "<p>This box is already filled</p>";}var newgameOverCheck = isGameOver();var newboxesCheck = newgameOverCheck % 10;var newtenCheck = (newgameOverCheck-newboxesCheck)/10;if (newtenCheck != 0){if (newtenCheck==3){document.querySelector("#result-div").innerHTML = "<p>Game Over : Game Tie</p>";}else{document.querySelector("#result-div").innerHTML = "<p>Game Over : Player "+newtenCheck+" wins</p>";}}}else{if (tenCheck==3){document.querySelector("#result-div").innerHTML = "<p>Game Over : Game Tie</p>";}else{document.querySelector("#result-div").innerHTML = "<p>Game Over : Player "+tenCheck+" wins</p>";}}});
    document.querySelector(givenselector[3]).addEventListener("click",function (event){var classes = document.querySelector(givenselector[3]).className;document.querySelector("#result-div").innerHTML = "";var gameOverCheck = isGameOver();var boxesCheck = gameOverCheck % 10;var tenCheck = (gameOverCheck-boxesCheck)/10;if (tenCheck==0){if (checkPushedButton(classes)==0){if ((playerturn % 2) != 0){classes += " pushed-1";document.querySelector(givenselector[3]).innerText = "o";playerturn++;changeTurn(2);}else{classes += " pushed-2";document.querySelector(givenselector[3]).innerText = "x";playerturn++;changeTurn(1);}document.querySelector(givenselector[3]).className = classes;}else{document.querySelector("#result-div").innerHTML = "<p>This box is already filled</p>";}var newgameOverCheck = isGameOver();var newboxesCheck = newgameOverCheck % 10;var newtenCheck = (newgameOverCheck-newboxesCheck)/10;if (newtenCheck != 0){if (newtenCheck==3){document.querySelector("#result-div").innerHTML = "<p>Game Over : Game Tie</p>";}else{document.querySelector("#result-div").innerHTML = "<p>Game Over : Player "+newtenCheck+" wins</p>";}}}else{if (tenCheck==3){document.querySelector("#result-div").innerHTML = "<p>Game Over : Game Tie</p>";}else{document.querySelector("#result-div").innerHTML = "<p>Game Over : Player "+tenCheck+" wins</p>";}}});
    document.querySelector(givenselector[4]).addEventListener("click",function (event){var classes = document.querySelector(givenselector[4]).className;document.querySelector("#result-div").innerHTML = "";var gameOverCheck = isGameOver();var boxesCheck = gameOverCheck % 10;var tenCheck = (gameOverCheck-boxesCheck)/10;if (tenCheck==0){if (checkPushedButton(classes)==0){if ((playerturn % 2) != 0){classes += " pushed-1";document.querySelector(givenselector[4]).innerText = "o";playerturn++;changeTurn(2);}else{classes += " pushed-2";document.querySelector(givenselector[4]).innerText = "x";playerturn++;changeTurn(1);}document.querySelector(givenselector[4]).className = classes;}else{document.querySelector("#result-div").innerHTML = "<p>This box is already filled</p>";}var newgameOverCheck = isGameOver();var newboxesCheck = newgameOverCheck % 10;var newtenCheck = (newgameOverCheck-newboxesCheck)/10;if (newtenCheck != 0){if (newtenCheck==3){document.querySelector("#result-div").innerHTML = "<p>Game Over : Game Tie</p>";}else{document.querySelector("#result-div").innerHTML = "<p>Game Over : Player "+newtenCheck+" wins</p>";}}}else{if (tenCheck==3){document.querySelector("#result-div").innerHTML = "<p>Game Over : Game Tie</p>";}else{document.querySelector("#result-div").innerHTML = "<p>Game Over : Player "+tenCheck+" wins</p>";}}});
    document.querySelector(givenselector[5]).addEventListener("click",function (event){var classes = document.querySelector(givenselector[5]).className;document.querySelector("#result-div").innerHTML = "";var gameOverCheck = isGameOver();var boxesCheck = gameOverCheck % 10;var tenCheck = (gameOverCheck-boxesCheck)/10;if (tenCheck==0){if (checkPushedButton(classes)==0){if ((playerturn % 2) != 0){classes += " pushed-1";document.querySelector(givenselector[5]).innerText = "o";playerturn++;changeTurn(2);}else{classes += " pushed-2";document.querySelector(givenselector[5]).innerText = "x";playerturn++;changeTurn(1);}document.querySelector(givenselector[5]).className = classes;}else{document.querySelector("#result-div").innerHTML = "<p>This box is already filled</p>";}var newgameOverCheck = isGameOver();var newboxesCheck = newgameOverCheck % 10;var newtenCheck = (newgameOverCheck-newboxesCheck)/10;if (newtenCheck != 0){if (newtenCheck==3){document.querySelector("#result-div").innerHTML = "<p>Game Over : Game Tie</p>";}else{document.querySelector("#result-div").innerHTML = "<p>Game Over : Player "+newtenCheck+" wins</p>";}}}else{if (tenCheck==3){document.querySelector("#result-div").innerHTML = "<p>Game Over : Game Tie</p>";}else{document.querySelector("#result-div").innerHTML = "<p>Game Over : Player "+tenCheck+" wins</p>";}}});
    document.querySelector(givenselector[6]).addEventListener("click",function (event){var classes = document.querySelector(givenselector[6]).className;document.querySelector("#result-div").innerHTML = "";var gameOverCheck = isGameOver();var boxesCheck = gameOverCheck % 10;var tenCheck = (gameOverCheck-boxesCheck)/10;if (tenCheck==0){if (checkPushedButton(classes)==0){if ((playerturn % 2) != 0){classes += " pushed-1";document.querySelector(givenselector[6]).innerText = "o";playerturn++;changeTurn(2);}else{classes += " pushed-2";document.querySelector(givenselector[6]).innerText = "x";playerturn++;changeTurn(1);}document.querySelector(givenselector[6]).className = classes;}else{document.querySelector("#result-div").innerHTML = "<p>This box is already filled</p>";}var newgameOverCheck = isGameOver();var newboxesCheck = newgameOverCheck % 10;var newtenCheck = (newgameOverCheck-newboxesCheck)/10;if (newtenCheck != 0){if (newtenCheck==3){document.querySelector("#result-div").innerHTML = "<p>Game Over : Game Tie</p>";}else{document.querySelector("#result-div").innerHTML = "<p>Game Over : Player "+newtenCheck+" wins</p>";}}}else{if (tenCheck==3){document.querySelector("#result-div").innerHTML = "<p>Game Over : Game Tie</p>";}else{document.querySelector("#result-div").innerHTML = "<p>Game Over : Player "+tenCheck+" wins</p>";}}});
    document.querySelector(givenselector[7]).addEventListener("click",function (event){var classes = document.querySelector(givenselector[7]).className;document.querySelector("#result-div").innerHTML = "";var gameOverCheck = isGameOver();var boxesCheck = gameOverCheck % 10;var tenCheck = (gameOverCheck-boxesCheck)/10;if (tenCheck==0){if (checkPushedButton(classes)==0){if ((playerturn % 2) != 0){classes += " pushed-1";document.querySelector(givenselector[7]).innerText = "o";playerturn++;changeTurn(2);}else{classes += " pushed-2";document.querySelector(givenselector[7]).innerText = "x";playerturn++;changeTurn(1);}document.querySelector(givenselector[7]).className = classes;}else{document.querySelector("#result-div").innerHTML = "<p>This box is already filled</p>";}var newgameOverCheck = isGameOver();var newboxesCheck = newgameOverCheck % 10;var newtenCheck = (newgameOverCheck-newboxesCheck)/10;if (newtenCheck != 0){if (newtenCheck==3){document.querySelector("#result-div").innerHTML = "<p>Game Over : Game Tie</p>";}else{document.querySelector("#result-div").innerHTML = "<p>Game Over : Player "+newtenCheck+" wins</p>";}}}else{if (tenCheck==3){document.querySelector("#result-div").innerHTML = "<p>Game Over : Game Tie</p>";}else{document.querySelector("#result-div").innerHTML = "<p>Game Over : Player "+tenCheck+" wins</p>";}}});
    document.querySelector(givenselector[8]).addEventListener("click",function (event){var classes = document.querySelector(givenselector[8]).className;document.querySelector("#result-div").innerHTML = "";var gameOverCheck = isGameOver();var boxesCheck = gameOverCheck % 10;var tenCheck = (gameOverCheck-boxesCheck)/10;if (tenCheck==0){if (checkPushedButton(classes)==0){if ((playerturn % 2) != 0){classes += " pushed-1";document.querySelector(givenselector[8]).innerText = "o";playerturn++;changeTurn(2);}else{classes += " pushed-2";document.querySelector(givenselector[8]).innerText = "x";playerturn++;changeTurn(1);}document.querySelector(givenselector[8]).className = classes;}else{document.querySelector("#result-div").innerHTML = "<p>This box is already filled</p>";}var newgameOverCheck = isGameOver();var newboxesCheck = newgameOverCheck % 10;var newtenCheck = (newgameOverCheck-newboxesCheck)/10;if (newtenCheck != 0){if (newtenCheck==3){document.querySelector("#result-div").innerHTML = "<p>Game Over : Game Tie</p>";}else{document.querySelector("#result-div").innerHTML = "<p>Game Over : Player "+newtenCheck+" wins</p>";}}}else{if (tenCheck==3){document.querySelector("#result-div").innerHTML = "<p>Game Over : Game Tie</p>";}else{document.querySelector("#result-div").innerHTML = "<p>Game Over : Player "+tenCheck+" wins</p>";}}});


    //Reset Game through Reset Button
    document.querySelector("#reset-para").addEventListener("click",function (event){
      for (i=1; i<=9; i++){
        var givenselector = "#btn"+i;
        var classes = document.querySelector(givenselector).className;

        document.querySelector("#result-div").innerHTML = "";

        if (classes.indexOf("pushed-1") != -1) {
          classes = classes.replace(" pushed-1","");
          document.querySelector(givenselector).className = classes;
          document.querySelector(givenselector).innerText = "+";
        }
        else if (classes.indexOf("pushed-2") != -1) {
          classes = classes.replace(" pushed-2","");
          document.querySelector(givenselector).className = classes;
          document.querySelector(givenselector).innerText = "+";
        }
      }
      playerturn = 1;
      changeTurn(1);
    });

  })(window);

});
