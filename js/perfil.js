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

const userName =
document.getElementById("userName");

const form =
document.getElementById("profileForm");



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



  profileAvatar.innerText =
  primeiraLetra;

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

      alert(error.message);

      saveBtn.disabled = false;

      return;

    }



    userName.innerText =
    nome;



    document.getElementById("dropdownName")
    .innerText =
    nome;



    const primeiraLetra =
    nome.charAt(0).toUpperCase();



    document.getElementById("avatar")
    .innerText =
    primeiraLetra;



    profileAvatar.innerText =
    primeiraLetra;



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

    alert("Erro ao salvar alterações.");

    saveBtn.disabled = false;

  }

});



async function logout(){

  await window.supabaseClient.auth.signOut();



  window.location.href =
  "login.html";

}



carregarUsuario();