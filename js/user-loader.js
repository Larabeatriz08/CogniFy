async function carregarUsuario(){

  const { data, error } =
  await window.supabaseClient.auth.getUser();

  if(error || !data.user){

    window.location.href =
    "login.html";

    return;
  }

  const user = data.user;

  let nome = "Usuário";



  // LOGIN NORMAL
  if(user.user_metadata?.nome){

    nome =
    user.user_metadata.nome;

  }



  // LOGIN GOOGLE
  else if(user.user_metadata?.full_name){

    nome =
    user.user_metadata.full_name;

  }



  // EMAIL FALLBACK
  else if(user.email){

    nome =
    user.email.split("@")[0];

  }



  // TOPO
  document.getElementById("userName")
  .innerText = nome;

  // DROPDOWN
  document.getElementById("dropdownName")
  .innerText = nome;

  // TITULO
  document.getElementById("welcomeTitle")
  .innerText = `Olá, ${nome}`;

  // AVATAR
  document.getElementById("avatarLetter")
  .innerText =
  nome.charAt(0).toUpperCase();

}



carregarUsuario();