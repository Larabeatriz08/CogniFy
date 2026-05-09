console.log("NeuroStudy AI carregado!");

const startButton =
  document.querySelector(".primario-btn");

startButton.addEventListener("click", () => {
  alert("Bem-vindo ao NeuroStudy AI 🚀");
});



const words = [
  "sua rotina.",
  "seus objetivos.",
  "seu ritmo.",
  "você."
];

const typingElement =
  document.getElementById("typing-word");

let wordIndex = 0;
let letterIndex = 0;
let isDeleting = false;

function typeEffect(){

  const currentWord =
    words[wordIndex];

  if(isDeleting){

    typingElement.textContent =
      currentWord.substring(0, letterIndex--);

  } else {

    typingElement.textContent =
      currentWord.substring(0, letterIndex++);

  }

  let speed = isDeleting ? 50 : 100;

  if(!isDeleting &&
     letterIndex === currentWord.length + 1){

    speed = 1500;
    isDeleting = true;
  }

  if(isDeleting &&
     letterIndex === 0){

    isDeleting = false;

    wordIndex++;

    if(wordIndex >= words.length){
      wordIndex = 0;
    }
  }

  setTimeout(typeEffect, speed);
}

typeEffect();