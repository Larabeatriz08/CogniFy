lucide.createIcons();

const userTrigger =
document.getElementById("userTrigger");

const dropdown =
document.getElementById("dropdown");

const nomeInput =
document.getElementById("nome");

const emailInput =
document.getElementById("email");

const senhaInput =
document.getElementById("senha");

const profileAvatar =
document.getElementById("profileAvatar");

const avatarInput =
document.getElementById("avatarInput");

const profileLetter =
document.getElementById("profileLetter");

const userName =
document.getElementById("userName");

const form =
document.getElementById("profileForm");

const customAlert =
document.getElementById("customAlert");

const alertMessage =
document.getElementById("alertMessage");

const alertButton =
document.getElementById("alertButton");



function showAlert(message){

  alertMessage.innerText =
  message;

  customAlert.classList.add("active");

}



alertButton.addEventListener("click",()=>{

  customAlert.classList.remove("active");

});



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
  user.user_metadata.nome || "";



  nomeInput.value =
  nome;



  emailInput.value =
  user.email || "";



  userName.innerText =
  nome || "Usuário";



  document.getElementById("dropdownName")
  .innerText =
  nome || "Usuário";



  const primeiraLetra =
  nome.charAt(0).toUpperCase() || "U";



  document.getElementById("avatar")
  .innerText =
  primeiraLetra;



  const avatarUrl =
  user.user_metadata.avatar_url;



  if(avatarUrl){

    profileAvatar.innerHTML = `
      <img
        src="${avatarUrl}"
        class="profile-image"
      >
    `;

  }else{

    profileAvatar.innerHTML = `
      <span id="profileLetter">
        ${primeiraLetra}
      </span>
    `;

  }

}



form.addEventListener("submit",async(e)=>{

  e.preventDefault();



  const nome =
  nomeInput.value.trim();

  const senha =
  senhaInput.value.trim();



  const saveBtn =
  document.querySelector(".save-btn");



  saveBtn.disabled = true;

  saveBtn.innerHTML = `
    <span>
      Salvando...
    </span>
  `;



  try{

    const updateData = {

      data:{
        nome:nome
      }

    };



    if(senha){

      updateData.password =
      senha;

    }



    const {
      error
    } =
    await window.supabaseClient.auth.updateUser(
      updateData
    );



    if(error){

      if(
        error.message.includes(
          "New password should be different"
        )
      ){

        showAlert(
          "Sua nova senha precisa ser diferente da senha atual."
        );

      }else{

        showAlert(
          "Não foi possível salvar suas alterações."
        );

      }

      saveBtn.disabled = false;

      saveBtn.innerHTML = `
        <span>
          Salvar alterações
        </span>
      `;

      return;

    }



    userName.innerText =
    nome;



    document.getElementById("dropdownName")
    .innerText =
    nome;



    const primeiraLetra =
    nome.charAt(0).toUpperCase() || "U";



    document.getElementById("avatar")
    .innerText =
    primeiraLetra;



    const avatarUrl =
    updateData.data.avatar_url;



    if(avatarUrl){

      profileAvatar.innerHTML = `
        <img
          src="${avatarUrl}"
          class="profile-image"
        >
      `;

    }else{

      profileAvatar.innerHTML = `
        <span id="profileLetter">
          ${primeiraLetra}
        </span>
      `;

    }



    senhaInput.value = "";



    saveBtn.innerHTML = `
      <span>
        Alterações salvas
      </span>
    `;



    setTimeout(()=>{

      saveBtn.innerHTML = `
        <span>
          Salvar alterações
        </span>
      `;

      saveBtn.disabled = false;

    },2000);



  }catch(error){

    showAlert(
      "Ocorreu um erro inesperado. Tente novamente."
    );

    saveBtn.disabled = false;

    saveBtn.innerHTML = `
      <span>
        Salvar alterações
      </span>
    `;

  }

});



async function logout(){

  await window.supabaseClient.auth.signOut();



  window.location.href =
  "login.html";

}



carregarUsuario();