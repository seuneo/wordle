//wordle

//read words from text file
import {words} from "./pastWordle.js";
import {validWords} from "./wordList.js";


var word = words[Math.floor(Math.random() * 900)].toUpperCase();

var alert = document.querySelector(".alert");
function alertMessage(m){

  alert.innerText = m;
  //show message
  setTimeout(function(){
    alert.style.display = "block";
  }, 1);

  setTimeout(function(){
    alert.style.display = "none";
  }, 900);
}


var keyboard = document.querySelectorAll("span");

for(let j = 0; j<keyboard.length; j++){
  keyboard[j].addEventListener("click", whichLetter);
}

function Check(line){

  var greens = 0;
 
  var currentLineWord = document.querySelector(".line" + (line+1)).children;
  var userInput = "";

  for(let j = 0; j<5; j++){
    userInput += currentLineWord[j].innerText;
  }

  if(isValidWord(userInput) == true){

  var wordsleft = word;

  var message = [" ", " " ," ", " ", " "];

  for(let i = 0; i<5; i++){
  if(word.charAt(i) == userInput.charAt(i)){
  
    message[i] = "seagreen";
    greens++;
    wordsleft = wordsleft.replace(userInput.charAt(i), "");
    
  }

  else{
    message[i] = "crimson";  
  }
}

for(let i = 0; i<5; i++){
  if(wordsleft.includes(userInput.charAt(i)) == true){
   
    if(message[i] != "seagreen"){
    message[i] = "darkkhaki";
    wordsleft = wordsleft.replace(userInput.charAt(i), "");
    }
    
  }
}

for(let j = 0; j<message.length; j++){
 
  currentLineWord[j].style.backgroundColor = ("" + message[j]);
  currentLineWord[j].style.color = ("white");
  var kbd = document.getElementById("" + currentLineWord[j].innerText);

  if(kbd.style.backgroundColor == ""){
  kbd.style.backgroundColor = ("" + message[j]);
  }
  
  kbd.style.color = ("white");

}

if(greens == 5){
  setTimeout(function(){alertMessage("You win")}, 10);
  document.removeEventListener("keydown", addLetter);

  for(let j = 0; j<keyboard.length; j++){
    keyboard[j].removeEventListener("click", whichLetter);
  }

}

return true;

  }

  else{
    alertMessage("Not in word list");
    return false;
  }

}

var line  = 0;
var i = 0;

document.addEventListener("keydown", addLetter);

function addLetter(e){

  if(line == 6){
    document.removeEventListener("keydown", addLetter);
    for(let j = 0; j<keyboard.length; j++){
      keyboard[j].removeEventListener("click", whichLetter);
    }
  }

  var key = e;

  if((typeof e) !== "string"){
    key = e.key;
  }

  var keyCode = key.codePointAt(0);

  if(key == "Enter"){

    if(i==5 && (Check(line) == true)){
    line++;
    i = 0;
    }

    else if(i < 5){
      alertMessage("Not enough letters");
    }   
  }

  if(i>0){
    if(key == "Backspace"){

      var box = document.querySelectorAll(".box" + i);
      box[line].innerText = "";
        i--;
      }     
    }
  
  if(i<5){
    if( (key.length < 2) && ( (keyCode > 64 && keyCode < 91) || (keyCode > 96 && keyCode < 123) ) ){
      i++;
      var box = document.querySelectorAll(".box" + i);
      box[line].innerText = key.toUpperCase();
     
    }
  }
}

function whichLetter(e){

  var letter = e.target.id;
  addLetter(letter.toString());

}

function isValidWord(w){

var firstLetter = w.charAt(0);

  //check if user has word
  var firstLetters = Object.keys(validWords);
  var index = firstLetters.indexOf(firstLetter);

  var wordsOfLetter = Object.values(validWords)[index];
  return wordsOfLetter.includes(w.toLowerCase()); 
}

var resetButton  = document.querySelector(".reset");

resetButton.addEventListener("click", newGame);

function newGame(){
  alertMessage("Refresh browser for new game")
}
