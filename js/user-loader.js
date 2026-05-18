async function carregarDadosUsuario(){

  const {
    data:{ user }
  } =
  await window.supabaseClient.auth.getUser();

  if(!user) return;



  const nome =
  user.user_metadata.nome || "Usuário";



  const avatarUrl =
  user.user_metadata.avatar_url || "";



  const primeiraLetra =
  nome.charAt(0).toUpperCase();



  const avatar =
  document.getElementById("avatar");



  const userName =
  document.getElementById("userName");



  const dropdownName =
  document.getElementById("dropdownName");



  if(userName){

    userName.innerText =
    nome;

  }



  if(dropdownName){

    dropdownName.innerText =
    nome;

  }



  if(avatar){

    avatar.innerHTML = "";



    if(avatarUrl){

      const img =
      document.createElement("img");

      img.src =
      avatarUrl;

      img.className =
      "top-avatar-image";

      avatar.appendChild(img);

    }else{

      avatar.innerText =
      primeiraLetra;

    }

  }

}

carregarDadosUsuario();