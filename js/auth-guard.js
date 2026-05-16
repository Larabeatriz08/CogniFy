async function verificarAuth(){

  const {
    data:{ user }
  } =
  await window.supabaseClient.auth.getUser();

  if(!user){

    window.location.href =
    "login.html";

  }

}

verificarAuth();