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



const dashboard =
document.querySelector(".dashboard-section");

let contadoresIniciados = false;

const observerDashboard =
new IntersectionObserver((entries) => {

  entries.forEach(entry => {

    if(
      entry.isIntersecting &&
      !contadoresIniciados
    ){

      iniciarContadores();

      contadoresIniciados = true;
    }

  });

}, {
  threshold:0.35
});

observerDashboard.observe(dashboard);



function iniciarContadores(){

  const contadores =
  document.querySelectorAll(".contador");

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
  document.querySelector(".conta-metas");

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



const tarefas =
document.querySelectorAll(".task");

const contadorTarefas =
document.querySelector(".tasks-header span");

function atualizarLista(){

  let concluidas = 0;

  tarefas.forEach(tarefa => {

    const checkbox =
    tarefa.querySelector(
      'input[type="checkbox"]'
    );

    if(checkbox.checked){

      concluidas++;

      tarefa.classList.add(
        "completed"
      );

    } else {

      tarefa.classList.remove(
        "completed"
      );
    }

  });

  contadorTarefas.innerText =
  `${concluidas} de ${tarefas.length}`;
}

tarefas.forEach(tarefa => {

  const checkbox =
  tarefa.querySelector(
    'input[type="checkbox"]'
  );

  checkbox.addEventListener(
    "change",
    atualizarLista
  );
});

atualizarLista();


const featureCards =
document.querySelectorAll(".feature-card");

featureCards.forEach(card => {

  card.addEventListener("mousemove", e => {

    const rect =
    card.getBoundingClientRect();

    const x =
    e.clientX - rect.left;

    const y =
    e.clientY - rect.top;

    const centerX =
    rect.width / 2;

    const centerY =
    rect.height / 2;

    const rotateX =
    (centerY - y) / 18;

    const rotateY =
    (x - centerX) / 18;

    card.style.transition =
    "0.1s ease";

    card.style.transform =
    `
    perspective(1000px)
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
    translateY(-10px)
    scale(1.02)
    `;
  });

  card.addEventListener("mouseleave", () => {

    card.style.transition =
    "0.5s ease";

    card.style.transform =
    `
    perspective(1000px)
    rotateX(0deg)
    rotateY(0deg)
    translateY(0px)
    scale(1)
    `;
  });

});


lucide.createIcons();