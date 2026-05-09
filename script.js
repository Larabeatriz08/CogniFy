
const startBotao =
  document.querySelector(".primario-btn");

startBotao.addEventListener("click", () => {
  alert("Bem-vindo ao Cognify AI - sua jornada de aprendizado personalizada começa agora!");
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
let sendoDeletado = false;

function typeEffect(){

  const currentWord =
    words[wordIndex];

  if(sendoDeletado){

    typingElement.textContent =
      currentWord.substring(0, letterIndex--);

  } else {

    typingElement.textContent =
      currentWord.substring(0, letterIndex++);

  }

  let velocidade = sendoDeletado ? 50 : 100;

  if(!sendoDeletado &&
     letterIndex === currentWord.length + 1){

    velocidade = 1500;
    sendoDeletado = true;
  }

  if(sendoDeletado &&
     letterIndex === 0){

    sendoDeletado = false;

    wordIndex++;

    if(wordIndex >= words.length){
      wordIndex = 0;
    }
  }

  setTimeout(typeEffect, velocidade);
}

typeEffect();