lucide.createIcons();

const userTrigger =
document.getElementById("userTrigger");
const dropdown =
document.getElementById("dropdown");


userTrigger.addEventListener("click",()=>{

  dropdown.classList.toggle("active");

});


window.addEventListener("click",(e)=>{

  if(
    !e.target.closest(".user-menu")
  ){

    dropdown.classList.remove("active");

  }

});