const botaoComecar =
document.querySelector(".primario-btn");

botaoComecar.addEventListener("click", () => {

  alert(
    "Bem-vindo ao CogniFy - Seu aprendizado com inteligência!"
  );

});



const palavras = [
  "sua rotina.",
  "seus objetivos.",
  "seu ritmo.",
  "você."
];

const elementoDigitando =
document.getElementById("typing-word");

let indicePalavra = 0;
let indiceLetra = 0;
let apagando = false;

function efeitoDigitacao(){

  const palavraAtual =
  palavras[indicePalavra];

  if(apagando){

    elementoDigitando.textContent =
    palavraAtual.substring(0, indiceLetra--);

  } else {

    elementoDigitando.textContent =
    palavraAtual.substring(0, indiceLetra++);

  }

  let velocidade = apagando ? 50 : 100;

  if(
    !apagando &&
    indiceLetra === palavraAtual.length + 1
  ){

    velocidade = 1500;
    apagando = true;
  }

  if(
    apagando &&
    indiceLetra === 0
  ){

    apagando = false;

    indicePalavra++;

    if(indicePalavra >= palavras.length){

      indicePalavra = 0;
    }
  }

  setTimeout(
    efeitoDigitacao,
    velocidade
  );
}

efeitoDigitacao();



const cards =
document.querySelectorAll(".card");

cards.forEach((card, index) => {

  card.style.opacity = "0";

  card.style.transform =
  "translateY(40px)";

  setTimeout(() => {

    card.style.transition =
    "0.7s ease";

    card.style.opacity = "1";

    card.style.transform =
    "translateY(0px)";

  }, index * 180);

});



const contadores =
document.querySelectorAll(".counter");

contadores.forEach(contador => {

  const atualizarContador = () => {

    const alvo =
    +contador.getAttribute("data-target");

    const atual =
    +contador.innerText.replace("%","");

    const incremento = alvo / 60;

    if(atual < alvo){

      contador.innerText =
      `${Math.ceil(atual + incremento)}%`;

      setTimeout(
        atualizarContador,
        25
      );

    } else {

      contador.innerText =
      alvo + "%";
    }
  };

  atualizarContador();
});



const contadorHoras =
document.querySelector(".conta-horas");

if(contadorHoras){

  let atual = 0;

  const alvo =
  Number(contadorHoras.dataset.target);

  const intervalo =
  setInterval(() => {

    atual++;

    contadorHoras.innerHTML =
    atual + "h";

    if(atual >= alvo){

      clearInterval(intervalo);
    }

  }, 70);
}



const contadorMetas =
document.querySelector(".counter-goals");

if(contadorMetas){

  let atual = 0;

  const alvo =
  +contadorMetas.dataset.target;

  const intervalo =
  setInterval(() => {

    atual++;

    contadorMetas.innerText =
    atual + "/10";

    if(atual >= alvo){

      clearInterval(intervalo);
    }

  }, 120);
}



const saudacao =
document.getElementById("greetingText");

const horaAtual =
new Date().getHours();

let textoSaudacao = "";

if(horaAtual >= 5 && horaAtual < 12){

  textoSaudacao =
  "Bom dia, Alex";

}
else if(horaAtual >= 12 && horaAtual < 18){

  textoSaudacao =
  "Boa tarde, Alex";

}
else{

  textoSaudacao =
  "Boa noite, Alex";
}

saudacao.innerText =
textoSaudacao;



lucide.createIcons();