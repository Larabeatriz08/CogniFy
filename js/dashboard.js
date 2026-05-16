lucide.createIcons();

const userTrigger =
document.getElementById("userTrigger");

const dropdown =
document.getElementById("dropdown");


userTrigger.addEventListener("click",(e)=>{

  e.stopPropagation();

  dropdown.classList.toggle("active");

});


document.addEventListener("click",(e)=>{

  if(
    !userTrigger.contains(e.target) &&
    !dropdown.contains(e.target)
  ){

    dropdown.classList.remove("active");

  }

});



async function carregarUsuario(){

  const {
    data:{ user }
  } =
  await window.supabaseClient.auth.getUser();

  if(!user){

    window.location.href =
    "login.html";

    return;
  }



  const nome =
  user.user_metadata.nome || "Usuário";


  const genero =
  user.user_metadata.genero || "masculino";


  const saudacao =
  genero === "feminino"
  ? "Bem-vinda"
  : "Bem-vindo";



  document.getElementById("userName").innerText =
  nome;

  document.getElementById("dropdownName").innerText =
  nome;

  document.getElementById("welcomeText").innerText =
  saudacao;

  document.getElementById("welcomeTitle").innerText =
  `Olá, ${nome}`;



  const primeiraLetra =
  nome.charAt(0).toUpperCase();

  document.getElementById("avatar").innerText =
  primeiraLetra;

}



async function logout(){

  await window.supabaseClient.auth.signOut();

  window.location.href =
  "login.html";

}



carregarUsuario();