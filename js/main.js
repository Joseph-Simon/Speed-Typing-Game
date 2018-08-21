window.addEventListener("load", init);

//Available Levels
const levels = {
  easy: 5,
  medium: 3,
  hard: 2,
  ultra: 1
};

// To change level
let currentLevel = levels.easy;

let time = currentLevel;
let score = 0;
let isPlaying;
let highScore;

// Dom Elements
const wordInput = document.querySelector("#word-input");
const currentWord = document.querySelector("#current-word");
const scoreDisplay = document.querySelector("#score");
const timeDisplay = document.querySelector("#time");
const message = document.querySelector("#message");
const seconds = document.querySelector("#seconds");
const bestScore = document.querySelector("#high-score");

const words = [
  "hat",
  "river",
  "lucky",
  "statue",
  "generate",
  "stubborn",
  "cocktail",
  "runaway",
  "joke",
  "developer",
  "establishment",
  "hero",
  "javascript",
  "nutrition",
  "revolver",
  "echo",
  "siblings",
  "investigate",
  "horrendous",
  "symptom",
  "laughter",
  "magic",
  "master",
  "space",
  "definition",
  "peach",
  "trust",
  "what",
  "love",
  "test",
  "replacement",
  "key",
  "representative",
  "descent",
  "governor",
  "bowel",
  "note",
  "myth",
  "exit",
  "accent",
  "stuff",
  "blind",
  "happen",
  "application",
  "circulate"
];

//Initialize Game
function init() {
  getScore();
  //load Word from Array
  showWord(words);
  //start matching on input
  wordInput.addEventListener("input", startMatch);
  // call countdown every second
  setInterval(countdown, 1000);
  // Check Game status
  setInterval(checkStatus, 50);
  //Check local storage
}

function getScore() {
  if (localStorage.getItem("highScore") === null) {
    localStorage.setItem("highScore", 0);
    highScore = localStorage.getItem("highScore");
    bestScore.innerHTML = highScore;
  } else {
    highScore = localStorage.getItem("highScore");
    bestScore.innerHTML = highScore;
  }
}

// Start match
function startMatch() {
  if (matchWords()) {
    isPlaying = true;
    time = currentLevel + 1;
    showWord(words);
    wordInput.value = "";
    score++;
    if (score > highScore) {
      localStorage.setItem("highScore", score);
      highScore = localStorage.getItem("highScore");
      bestScore.innerHTML = highScore;
    }
  }

  if (score === -1) {
    scoreDisplay.innerHTML = 0;
  } else {
    scoreDisplay.innerHTML = score;
  }

  if (score >= 9) {
    currentLevel = levels.ultra;
    seconds.innerHTML = 1;
  } else if (score >= 6) {
    currentLevel = levels.hard;
    seconds.innerHTML = 2;
  } else if (score >= 3) {
    currentLevel = levels.medium;
    seconds.innerHTML = 3;
  } else {
    currentLevel = levels.easy;
    seconds.innerHTML = 5;
  }
}

//Match currentWord to word input
function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {
    message.innerHTML = "Correct!!";
    return true;
  } else {
    message.innerHTML = "";
    return false;
  }
}

//pick and show random word
function showWord(words) {
  //Generate random array index
  const randIndex = Math.floor(Math.random() * words.length);
  //Out put random word
  currentWord.innerHTML = words[randIndex];
}

//countdown timer
function countdown() {
  // Check time is not 0
  if (time > 0) {
    time--;
  } else if (time === 0) {
    // Game is over
    isPlaying = false;
  }
  //show time
  timeDisplay.innerHTML = time;
}

//Check game status
function checkStatus() {
  if (!isPlaying && time === 0) {
    bestScore.innerHTML = localStorage.getItem("highScore");
    message.innerHTML = "Game Over";
    score = -1;
  }
}
