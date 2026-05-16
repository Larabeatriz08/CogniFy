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

const userName =
document.getElementById("userName");

const form =
document.getElementById("profileForm");

const avatarTop =
document.getElementById("avatar");

let avatarFile = null;

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



avatarInput.addEventListener("change",(e)=>{

  const file =
  e.target.files[0];

  if(!file) return;

  avatarFile = file;

  const imageUrl =
  URL.createObjectURL(file);



  profileAvatar.innerHTML = `
    <img
      src="${imageUrl}"
      class="profile-image"
    >
  `;



  avatarTop.innerHTML = `
    <img
      src="${imageUrl}"
      class="top-avatar-image"
    >
  `;

});



function renderAvatar(nome,avatarUrl){

  const primeiraLetra =
  nome.charAt(0).toUpperCase() || "U";



  if(avatarUrl){

    profileAvatar.innerHTML = `
      <img
        src="${avatarUrl}"
        class="profile-image"
      >
    `;



    avatarTop.innerHTML = `
      <img
        src="${avatarUrl}"
        class="top-avatar-image"
      >
    `;

  }else{

    profileAvatar.innerHTML = `
      <span
        class="profile-letter"
      >
        ${primeiraLetra}
      </span>
    `;



    avatarTop.innerHTML = `
      <span>
        ${primeiraLetra}
      </span>
    `;

  }

}



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



  const avatarUrl =
  user.user_metadata.avatar_url || "";



  renderAvatar(
    nome,
    avatarUrl
  );

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

    const {
      data:{ user }
    } =
    await window.supabaseClient.auth.getUser();



    const updateData = {

      data:{
        nome:nome
      }

    };



    if(senha){

      updateData.password =
      senha;

    }



    if(avatarFile){

      const fileExt =
      avatarFile.name.split(".").pop();

      const fileName =
      `${user.id}.${fileExt}`;

      const filePath =
      `usuarios/${fileName}`;



      const {
        error:uploadError
      } =
      await window.supabaseClient.storage
      .from("avatars")
      .upload(
        filePath,
        avatarFile,
        {
          upsert:true
        }
      );



      if(uploadError){

        showAlert(
          "Erro ao enviar avatar."
        );

        saveBtn.disabled = false;

        saveBtn.innerHTML = `
          <span>
            Salvar alterações
          </span>
        `;

        return;

      }



      const {
        data:urlData
      } =
      window.supabaseClient.storage
      .from("avatars")
      .getPublicUrl(filePath);



      updateData.data.avatar_url =
      urlData.publicUrl;

    }



    const {
      data:userData,
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



    const novoNome =
    userData.user.user_metadata.nome || nome;



    const avatarUrl =
    userData.user.user_metadata.avatar_url || "";



    userName.innerText =
    novoNome;



    document.getElementById("dropdownName")
    .innerText =
    novoNome;



    renderAvatar(
      novoNome,
      avatarUrl
    );



    senhaInput.value = "";

    avatarFile = null;



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