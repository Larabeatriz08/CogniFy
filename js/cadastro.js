lucide.createIcons();

const toggleSenha =
document.getElementById("toggleSenha");

const senha =
document.getElementById("senha");

toggleSenha.addEventListener("click",()=>{

  if(senha.type === "password"){

    senha.type = "text";

  } else {

    senha.type = "password";
  }

});

const buttons =
document.querySelectorAll("button");

buttons.forEach(button=>{

  button.addEventListener("mousemove",(e)=>{

    const rect =
    button.getBoundingClientRect();

    const x =
    e.clientX - rect.left - rect.width / 2;

    const y =
    e.clientY - rect.top - rect.height / 2;

    button.style.transform =
    `translate(${x*0.08}px,${y*0.08}px)`;

  });

  button.addEventListener("mouseleave",()=>{

    button.style.transform =
    "translate(0,0)";

  });

});


async function cadastrar(event){

  event.preventDefault();

  const nome =
  document.getElementById("nome").value;

  const email =
  document.getElementById("email").value;

  const senha =
  document.getElementById("senha").value;

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

    alert(error.message);
    return;

  }

  alert("Conta criada com sucesso!");

  window.location.href =
  "login.html";

}


