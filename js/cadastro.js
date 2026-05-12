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

async function cadastrar(event){

  event.preventDefault();

  const nome =
  document.getElementById("nome").value.trim();

  const email =
  document.getElementById("email").value.trim();

  const senha =
  document.getElementById("senha").value;

  const termos =
  document.getElementById("termos");

  const botao =
  document.querySelector(".submit");





  if(!nome || !email || !senha){

    mostrarMensagem(
      "Preencha todos os campos.",
      true
    );

    return;

  }



 

  if(!termos.checked){

    mostrarMensagem(
      "Você precisa aceitar os termos.",
      true
    );

    return;

  }




  if(senha.length < 8){

    mostrarMensagem(
      "A senha precisa ter no mínimo 8 caracteres.",
      true
    );

    return;

  }





  const emailValido =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if(!emailValido.test(email)){

    mostrarMensagem(
      "Digite um e-mail válido.",
      true
    );

    return;

  }





  botao.disabled = true;

  botao.innerText =
  "Criando conta...";



  const { data, error } =
  await window.supabaseClient.auth.signUp({

    email: email,

    password: senha,

    options:{
      data:{
        nome:nome
      }
    }

  });




if(error){

  botao.disabled = false;

  botao.innerText =
  "Criar conta gratuita →";



  console.log(error);



  if(
    error.message.toLowerCase().includes("already")
  ){

    mostrarMensagem(
      "Esse e-mail já está cadastrado.",
      true
    );

    return;
  }



  if(
    error.message.toLowerCase().includes("rate limit")
  ){

    mostrarMensagem(
      "Muitas tentativas. Aguarde alguns segundos.",
      true
    );

    return;
  }



  if(
    error.message.toLowerCase().includes("password")
  ){

    mostrarMensagem(
      "Senha muito fraca.",
      true
    );

    return;
  }



  mostrarMensagem(
    "Erro ao criar conta.",
    true
  );

  return;
}




  mostrarMensagem(
    "Conta criada com sucesso!"
  );



  setTimeout(()=>{

    window.location.href =
    "login.html";

  },2000);

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