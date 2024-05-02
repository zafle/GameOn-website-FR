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
// const formData = document.querySelectorAll(".formData");
const reservationForm = document.querySelector("form[name='reserve']");
const submitBtn = document.querySelector(".btn-submit");
const firstNameInput = document.getElementById("first");
const lastNameInput = document.getElementById("last");
const emailInput = document.getElementById("email");
const quantityInput = document.getElementById("quantity");
const locationInputs = document.querySelectorAll("input[name='location']");
const agreementInput = document.getElementById("checkbox1");


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

// ######### Form validation #######



/**
 * This function validates the first name / the last name
 * Conditions: 2 characters minimum / non empty
 * @param {string} name
 * @throws {Error}
 */
function validateName(name) {
  if (name.length < 2) {
    throw new Error("Ce champ doit comporter au moins 2 caractères");
  }
}

/**
 * This function validates the email
 * @param {string} email
 * @throws {Error}
 */
function validateEmail(email) {
  let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
  if (!emailRegExp.test(email)) {
      throw new Error("L'email n'est pas valide");
  }
}

/**
 * This function validates the quantity of games
 * @param {number} quantity
 * @throws {Error}
 */
function validateQuantity(quantity) {
  if ( !( 0 <= quantity ) && !( quantity <= 99 )) {
    throw new Error("La quantité n'est pas valide");
  }
}

/**
 * This function validates the radio button for location selection
 * @throws {Error}
 */
function validateLocation() {
  let radioBtnChecked = 0;
  for (const locationInput of locationInputs) {
    if (locationInput.checked) {
      radioBtnChecked++;
      break;
    }
  }
  if (radioBtnChecked !== 1) {
    throw new Error("Vous devez sélectionner un tournoi");
  }
}

/**
 * This function validates the agreement checkbox
 * @throws {Error}
 */
function validateAgreement() {
  if (!agreementInput.checked) {
    throw new Error("Vous devez accepter les conditions d'utilisation");
  }
}

/**
 * This function validates the form's entries
 */
function validateForm() {
  try {
    let firstName = firstNameInput.value;
    validateName(firstName);

    let lastName = lastNameInput.value;
    validateName(lastName);

    let email = emailInput.value;
    validateEmail(email);

    let quantity = parseInt(quantityInput.value);
    validateQuantity(quantity);

    validateLocation();

    validateAgreement();

    reservationForm.submit();

  } catch (error) {
    console.log(error);
  }
}

// launch form validation on submit
submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  validateForm();
});
