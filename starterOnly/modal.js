function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// ####### DOM Elements ########

// modal
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeModalBtn = document.querySelector(".close");
const modalContent = document.querySelector(".content");

// form
const formData = document.querySelectorAll(".formData");


// ######## open / close modal #######

// ------- open --------

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// ------- close --------

// launch close modal event
closeModalBtn.addEventListener("click", closeModal);

// close modal form
function closeModal() {

  const closeModalKeyframes = [
    {
      transform: "translateY(0px)",
      opacity: 1
    },
    {
      transform: "translateY(-150px)",
      opacity: 0,
    }
  ];

  const closeModalTimingOptions = {
    duration: 400,
  };

  const closeModalAnimation = modalContent.animate(closeModalKeyframes, closeModalTimingOptions);

  closeModalAnimation.play();

  closeModalAnimation.onfinish = () => {
    modalbg.style.display = "none";
  };
}
