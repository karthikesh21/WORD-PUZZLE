// Word and Hints Object
const options = {
  cheetah: "This is the fastest land animal on Earth.",
  pepper: "Salt's partner",
  kiwi: "This fruit contains more vitamin C than an orange.",
  Tongue: "This part of the body has unique prints, just like fingerprints.",
  liver: "This is the largest internal organ in the human body.",
  Sponge: "I’m full of holes but still holds water. What am I?",
  keyboard: "I have keys but open no doors.",
  joke: "I can make you laugh without saying a word. What am I?",
  machine: "Device or appliance",
};

// Initial References
const message = document.getElementById("message");
const hintRef = document.querySelector(".hint-ref");
const controls = document.querySelector(".controls-container");
const startBtn = document.getElementById("start");
const letterContainer = document.getElementById("letter-container");
const userInpSection = document.getElementById("user-input-section");
const resultText = document.getElementById("result");
const word = document.getElementById("word");

const words = Object.keys(options);
let randomWord = "", randomHint = "";
let winCount = 0, lossCount = 0;

const generateRandomValue = (array) => Math.floor(Math.random() * array.length);

const blocker = () => {
  let lettersButtons = document.querySelectorAll(".letters");
  lettersButtons.forEach((button) => button.disabled = true);
  stopGame();
};

const startGame = () => {
  controls.classList.add("hide");
  init();
};

const stopGame = () => {
  controls.classList.remove("hide");
};

const generateWord = () => {
  letterContainer.classList.remove("hide");
  userInpSection.innerText = "";
  randomWord = words[generateRandomValue(words)];
  randomHint = options[randomWord];

  hintRef.innerHTML = `<div id="wordHint"><span>Hint: </span>${randomHint}</div>`;

  let displayItem = "";
  randomWord.split("").forEach(() => {
    displayItem += '<span class="inputSpace">_ </span>';
  });

  userInpSection.innerHTML = displayItem;
  userInpSection.innerHTML += `<div id='chanceCount'>Chances Left: ${lossCount}</div>`;
};

const init = () => {
  winCount = 0;
  lossCount = 5;
  randomWord = "";
  word.innerText = "";
  randomHint = "";
  message.innerText = "";
  userInpSection.innerHTML = "";
  resultText.innerHTML = "";
  resultText.className = "";
  letterContainer.classList.add("hide");
  letterContainer.innerHTML = "";

  generateWord();

  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
    button.innerText = String.fromCharCode(i);

    button.addEventListener("click", () => {
      message.innerText = `Correct Letter`;
      message.style.color = "#008000";
      let charArray = randomWord.toUpperCase().split("");
      let inputSpace = document.getElementsByClassName("inputSpace");

      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          if (char === button.innerText) {
            button.classList.add("correct");
            inputSpace[index].innerText = char;
            winCount += 1;
            if (winCount === charArray.length) {
              resultText.innerHTML = " 🎉You guessed it right!🎉";
              resultText.className = "win";
              startBtn.innerText = "Restart";
              blocker();
            }
          }
        });
      } else {
        button.classList.add("incorrect");
        lossCount -= 1;
        document.getElementById("chanceCount").innerText = `Chances Left: ${lossCount}`;
        message.innerText = `Incorrect Letter`;
        message.style.color = "#ff0000";
        if (lossCount === 0) {
          word.innerHTML = `The word was: <span>${randomWord}</span>`;
          resultText.innerHTML = "Game Over!";
          resultText.className = "lose";
          blocker();
        }
      }

      button.disabled = true;
    });

    letterContainer.appendChild(button);
  }
};

startBtn.addEventListener("click", startGame);
window.onload = () => init();
