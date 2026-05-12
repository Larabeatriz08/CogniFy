
lucide.createIcons();

const toggleSenha =
document.getElementById("toggleSenha");

const senhaInput =
document.getElementById("senha");

toggleSenha.addEventListener("click",()=>{

  if(senhaInput.type === "password"){

    senhaInput.type = "text";

  } else {

    senhaInput.type = "password";

  }

});

async function login(event){

  event.preventDefault();

  const email =
  document.getElementById("email").value.trim();

  const senha =
  document.getElementById("senha").value;

  const botao =
  document.querySelector(".submit-btn");





  if(!email || !senha){

    mostrarMensagem(
      "Preencha todos os campos.",
      true
    );

    return;
  }





  botao.disabled = true;

  botao.innerText =
  "Entrando...";



  const { data, error } =
  await window.supabaseClient.auth.signInWithPassword({

    email: email,

    password: senha

  });



  

  if(error){

    botao.disabled = false;

    botao.innerText =
    "Entrar →";



    mostrarMensagem(
      "Email ou senha inválidos.",
      true
    );

    return;
  }



  

  mostrarMensagem(
    "Login realizado!"
  );



  setTimeout(()=>{

    window.location.href =
    "dashboard.html";

  },1500);

}



function mostrarMensagem(
  texto,
  erro=false
){

  const toast =
  document.createElement("div");

  toast.className =
  erro ? "toast erro" : "toast";

  toast.innerText = texto;

  document.body.appendChild(toast);



  setTimeout(()=>{

    toast.classList.add("show");

  },100);



  setTimeout(()=>{

    toast.classList.remove("show");



    setTimeout(()=>{

      toast.remove();

    },300);

  },3000);

}

