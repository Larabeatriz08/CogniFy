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

const revealElements =
document.querySelectorAll(".reveal");

const revealObserver =
new IntersectionObserver(entries => {

  entries.forEach(entry => {

    if(entry.isIntersecting){

      entry.target.classList.add("active");
    }
  });

}, {
  threshold:0.2
});

revealElements.forEach(el => {
  revealObserver.observe(el);
});


const numerosDashboard =
document.querySelectorAll(".numero-dashboard");

const observerNumeros =
new IntersectionObserver(entries => {

  entries.forEach(entry => {

    if(entry.isIntersecting){

      const numero =
      entry.target;

      const alvo =
      +numero.dataset.target;

      let atual = 0;

      const incremento =
      alvo / 50;

      const animar = () => {

        atual += incremento;

        if(atual < alvo){

          numero.innerText =
          Math.floor(atual);

          requestAnimationFrame(animar);

        } else {

          numero.innerText =
          alvo;

        }
      };

      animar();

      observerNumeros.unobserve(numero);
    }

  });

}, {
  threshold:0.5
});

numerosDashboard.forEach(numero => {
  observerNumeros.observe(numero);
});

const botoes=document.querySelectorAll("button");

botoes.forEach(botao=>{

  botao.addEventListener("mousemove",(e)=>{

    const rect=botao.getBoundingClientRect();

    const x=e.clientX-rect.left-rect.width/2;
    const y=e.clientY-rect.top-rect.height/2;

    botao.style.transform=
    `translate(${x*0.15}px,${y*0.15}px)`;
  });

  botao.addEventListener("mouseleave",()=>{

    botao.style.transform="translate(0,0)";
  });
});

const selectGrafico =
document.getElementById("graficoSelect");

if(selectGrafico){

  const barras =
  document.querySelectorAll(".bar");

  const tituloGrafico =
  document.getElementById("foco-titulo");

  const subtituloGrafico =
  document.getElementById("foco-subtitulo");

  const dados = {

    foco:{
      titulo:"Foco semanal",
      subtitulo:"Últimos 7 dias",

      alturas:[
        85,
        45,
        70,
        78,
        92,
        88,
        65
      ]
    },

    metas:{
      titulo:"Metas concluídas",
      subtitulo:"Performance da semana",

      alturas:[
        40,
        62,
        55,
        80,
        72,
        95,
        90
      ]
    }
  };

  function atualizarGrafico(tipo){

    const info =
    dados[tipo];

    tituloGrafico.innerText =
    info.titulo;

    subtituloGrafico.innerText =
    info.subtitulo;

    const menorValor =
    Math.min(...info.alturas);

    barras.forEach((barra,index)=>{

      barra.classList.remove("low");

      if(
        info.alturas[index] === menorValor
      ){
        barra.classList.add("low");
      }

      barra.style.animation =
      "none";

      void barra.offsetWidth;

      barra.style.height =
      info.alturas[index] + "%";

      barra.style.animation =
      "subirBarra 1s ease";
    });

  }

  selectGrafico.addEventListener(
    "change",
    (e)=>{
      atualizarGrafico(e.target.value);
    }
  );

  atualizarGrafico("foco");

}


const mesSelect =
document.getElementById("mesSelect");

const heatmapGrid =
document.getElementById("heatmapGrid");

const mesTitulo =
document.getElementById("mesTitulo");

const metasAtivas =
document.getElementById("metasAtivas");

const meses = [

  {
    nome:"Janeiro",
    metas:"5 metas ativas",
    dados:[3,1,2,0,1,3,2,1,0,2,1,3,2,2,1,0,1,2,3,1,0]
  },

  {
    nome:"Fevereiro",
    metas:"7 metas ativas",
    dados:[2,2,1,3,3,2,1,0,1,2,2,3,3,1,1,2,0,1,2,3,1]
  },

  {
    nome:"Março",
    metas:"4 metas ativas",
    dados:[1,0,1,2,2,1,0,1,1,2,3,1,0,1,2,2,1,0,1,3,2]
  },

  {
    nome:"Abril",
    metas:"9 metas ativas",
    dados:[3,3,2,1,2,3,3,2,1,2,3,3,1,0,1,2,3,3,2,1,2]
  },

  {
    nome:"Maio",
    metas:"6 metas ativas",
    dados:[2,1,0,1,2,2,3,1,0,1,2,3,2,1,0,1,2,2,1,3,2]
  },

  {
    nome:"Junho",
    metas:"3 metas ativas",
    dados:[0,1,1,0,1,2,1,0,1,1,2,1,0,1,2,1,0,1,1,2,1]
  },

  {
    nome:"Julho",
    metas:"8 metas ativas",
    dados:[3,2,3,2,1,2,3,3,2,1,2,3,2,1,2,3,3,2,1,2,3]
  },

  {
    nome:"Agosto",
    metas:"10 metas ativas",
    dados:[3,3,3,2,2,3,3,3,2,1,2,3,3,2,2,3,3,1,2,3,3]
  },

  {
    nome:"Setembro",
    metas:"6 metas ativas",
    dados:[2,1,2,1,0,1,2,2,1,0,1,2,2,1,0,1,2,2,1,3,2]
  },

  {
    nome:"Outubro",
    metas:"8 metas ativas",
    dados:[3,0,2,2,1,3,2,3,0,1,2,3,3,1,0,2,2,1,3,2,3]
  },

  {
    nome:"Novembro",
    metas:"11 metas ativas",
    dados:[3,3,2,3,3,2,3,3,1,2,3,3,2,1,3,3,2,3,3,1,2]
  },

  {
    nome:"Dezembro",
    metas:"2 metas ativas",
    dados:[1,0,0,1,1,0,1,0,0,1,1,0,1,0,0,1,1,0,1,0,0]
  }

];

function renderHeatmap(index){

  const mes = meses[index];

  mesTitulo.innerText =
  mes.nome;

  metasAtivas.innerText =
  mes.metas;

  heatmapGrid.innerHTML = "";

  mes.dados.forEach(nivel => {

    const bloco =
    document.createElement("div");

    bloco.classList.add("heat");

    if(nivel === 1){
      bloco.classList.add("low");
    }

    if(nivel === 2){
      bloco.classList.add("medium");
    }

    if(nivel === 3){
      bloco.classList.add("active");
    }

    heatmapGrid.appendChild(bloco);

  });

}

mesSelect.addEventListener("change",(e)=>{

  renderHeatmap(e.target.value);

});

renderHeatmap(9);

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

  const botao =
  item.querySelector(".faq-btn");

  botao.addEventListener("click", () => {

    const aberto =
    item.classList.contains("active");

    faqItems.forEach(faq => {

      faq.classList.remove("active");

      const resposta =
      faq.querySelector(".faq-answer");

      const icone =
      faq.querySelector(".faq-btn");

      resposta.style.maxHeight = null;

      icone.innerText = "+";
    });

    if(!aberto){

      item.classList.add("active");

      const resposta =
      item.querySelector(".faq-answer");

      resposta.style.maxHeight =
      resposta.scrollHeight + "px";

      botao.innerText = "−";
    }

  });

});

lucide.createIcons();