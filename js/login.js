lucide.createIcons();

const toggleSenha =
document.getElementById("toggleSenha");

const senha =
document.getElementById("senha");

if(toggleSenha){

  toggleSenha.addEventListener("click",()=>{

    senha.type =
    senha.type === "password"
    ? "text"
    : "password";

  });

}

const toggleCadastro =
document.getElementById("toggleCadastro");

const senhaCadastro =
document.getElementById("senhaCadastro");

if(toggleCadastro){

  toggleCadastro.addEventListener("click",()=>{

    senhaCadastro.type =
    senhaCadastro.type === "password"
    ? "text"
    : "password";

  });

}