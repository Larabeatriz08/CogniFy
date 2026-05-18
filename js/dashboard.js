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

  const { data, error } =
  await window.supabaseClient.auth.getUser();

  if(error || !data.user){

    window.location.href =
    "login.html";

    return;

  }

  const user = data.user;

  console.log(user);



  const nome =

    user.user_metadata?.nome ||

    user.user_metadata?.full_name ||

    user.user_metadata?.name ||

    user.email?.split("@")[0] ||

    "Usuário";



  const genero =
  user.user_metadata?.genero || "";



  document.getElementById("userName")
  .innerText = nome;



  document.getElementById("dropdownName")
  .innerText = nome;



  document.getElementById("welcomeTitle")
  .innerHTML = `Olá, ${nome}`;



  document.getElementById("avatarLetter")
  .innerText =
  nome.charAt(0).toUpperCase();



  const welcomeText =
  document.querySelector(".welcome-text");



  if(genero === "masculino"){

    welcomeText.innerText =
    "Bem-vindo";

  }

  else if(genero === "feminino"){

    welcomeText.innerText =
    "Bem-vinda";

  }

  else{

    welcomeText.innerText =
    "Boas-vindas";

  }

}



async function logout(){

  await window.supabaseClient.auth.signOut();

  window.location.href =
  "login.html";

}



carregarUsuario();