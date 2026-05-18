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



  const { data:profile } =
  await window.supabaseClient
  .from("profiles")
  .select("*")
  .eq("id", user.id)
  .single();



  const nome =
  profile?.nome || "Usuário";

  const genero =
  profile?.genero || "";



  document.getElementById("userName").innerText =
  nome;

  document.getElementById("dropdownName").innerText =
  nome;

  document.getElementById("welcomeTitle").innerText =
  `Olá, ${nome}`;



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