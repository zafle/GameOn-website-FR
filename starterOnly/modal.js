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
const reservationForm = document.querySelector("form[name='reserve']");
const submitBtn = document.querySelector(".btn-submit");
const firstNameInput = document.getElementById("first");
const lastNameInput = document.getElementById("last");
const emailInput = document.getElementById("email");
const dateInput = document.getElementById("birthdate");
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
 * This function validates the first name
 * Conditions: 2 characters minimum / non empty
 * @throws {Error}
 */
function validateFirstName() {
  let name = firstNameInput.value;
  if (name.length < 2) {
    throw new Error("Ce champ doit comporter au moins 2 caractères");
  }
}
/**
 * This function validates the last name
 * Conditions: 2 characters minimum / non empty
 * @throws {Error}
 */
function validateLastName() {
  let name = lastNameInput.value;
  if (name.length < 2) {
    throw new Error("Ce champ doit comporter au moins 2 caractères");
  }
}

/**
 * This function validates the email
 * @throws {Error}
 */
function validateEmail() {
  let email = emailInput.value;
  let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
  if (!emailRegExp.test(email)) {
    throw new Error("L'email n'est pas valide");
  }
}

/**
 * This function validates the birthdate
 * Condition : 4 years old minimum
 * @throws {Error}
 */
function validateDate() {
  let date = dateInput.value;
  if (date !== "") {
    let dateOfBirth = new Date(date);
    let limitDate = new Date();
    limitDate.setFullYear(limitDate.getFullYear() - 4);
    if ( !(dateOfBirth.toISOString() < limitDate.toISOString()) ) {
      throw new Error("Vous devez indiquer une date de naissance valide");
    }
  } else {
    throw new Error("Vous devez indiquer une date de naissance valide");
  }
}

/**
 * This function validates the quantity of games
 * @throws {Error}
 */
function validateQuantity() {
  let quantity = quantityInput.value;
  if (quantity < 0 || quantity > 99 || quantity === "") {
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
 * This function displays an error message
 * @param {HTMLElement} input
 * @param {string} error
 */
function displayErrorMessage(input, error) {
  const inputParent = input.closest(".formData");
  inputParent.dataset.error = error.message;
  inputParent.dataset.errorVisible = true;
}

/**
 * This function reset error messages
 * @param {HTMLElement} input
 */
function resetErrorMessage(input) {
  const item = input.closest(".formData");
  if (item.dataset.error && item.dataset.errorVisible) {
    delete item.dataset.error;
    delete item.dataset.errorVisible;
  }
}

/**
 * This function erases the previous errors messages,
 * call the validation function for each input (validate parameter)
 * and displays the error message if validation failed
 * @param {HTMLElement} input /to target the good HTML element when erase / display error message
 * @param {function} validate /function to validate the input
 * @param {number} errors /count the number of errors during the submit validation process
 * @return {number}
 */
function validateInput(input, validate, errors) {
  resetErrorMessage(input);
  try {
    validate();
    return errors;
  } catch (error) {
    displayErrorMessage(input, error);
    errors++;
    return errors;
  }
}

/**
 * This function validates the form's entries and sends the form if no errors
 */
function validateForm() {

  let errors = 0;

  // delete all error messages
  for (const item of formData) {
    if (item.dataset.error && item.dataset.errorVisible) {
      delete item.dataset.error;
      delete item.dataset.errorVisible;
    }
  }

  errors = validateInput(firstNameInput, validateFirstName, errors);
  errors = validateInput(lastNameInput, validateLastName, errors);
  errors = validateInput(emailInput, validateEmail, errors);
  errors = validateInput(dateInput, validateDate, errors);
  errors = validateInput(quantityInput, validateQuantity, errors);
  errors = validateInput(locationInputs[0], validateLocation, errors);
  errors = validateInput(agreementInput, validateAgreement, errors);

  console.log("totalerrors : " + errors);

  // if no errors, send the form
  if (errors === 0) {

    reservationForm.submit();
  }
}

// launch validation for each input on change event
firstNameInput.addEventListener("change", (event) => {
  event.preventDefault();
  validateInput(firstNameInput, validateFirstName);
});
lastNameInput.addEventListener("change", (event) => {
  event.preventDefault();
  validateInput(lastNameInput, validateLastName);
});
emailInput.addEventListener("change", (event) => {
  event.preventDefault();
  validateInput(emailInput, validateEmail);
});
dateInput.addEventListener("change", (event) => {
  event.preventDefault();
  validateInput(dateInput, validateDate);
});
quantityInput.addEventListener("change", (event) => {
  event.preventDefault();
  validateInput(quantityInput, validateQuantity);
});
locationInputs.forEach( (input) => {
  input.addEventListener("change", (event) => {
    event.preventDefault();
    validateInput(input, validateLocation);
  });
});
agreementInput.addEventListener("change", (event) => {
  event.preventDefault();
  validateInput(agreementInput, validateAgreement);
});

// launch form validation on submit
submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  validateForm();
});