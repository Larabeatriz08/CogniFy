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
  document.getElementById("nome").value;

  const email =
  document.getElementById("email").value;

  const senha =
  document.getElementById("senha").value;

  console.log(nome,email,senha);

  const { data, error } =
  await supabase.auth.signUp({

    email: email,

    password: senha,

    options:{
      data:{
        nome: nome
      }
    }

  });

  if(error){

    console.error(error);

    alert(error.message);

    return;
  }

  alert("Conta criada com sucesso!");

  window.location.href =
  "login.html";

}