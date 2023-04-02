/*
 * @name: Assignement 2
 * @Course Code: SODV1201 - Introduction to Web Programming
 * @class: Software Development Diploma program
 * @author: Hugo Vinicius Zeminian Bueno Camargo
 * @id: 440258
 * @e-mail: h.vinicius258@mybvc.ca
/*
/*
************************************************
### STAFF LIST ###
************************************************
*/
/*==============================================
→ ### GET STAFF DATA ### */
//GET DOM INFORMATION
const searchButtonName = document.getElementById("button-search-staff-name");
const searchButtonId = document.getElementById("button-search-staff-id");
const searchButtonSalary = document.getElementById(
  "button-search-staff-salary"
);
const searchButton = document.getElementById("button-search-staff");
const cardContainer = document.getElementById("card-staff-container");

//REFRESH PAGE
const refreshPage = () => {
  location.reload();
};

//CALL API DATA
const fetchStaffInformation = async (type, value) => {
  const url = `http://localhost:3002/api/data/?dataType=${type}&value=${value}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

//DISPLAY STAFF INFORMATION ON THE PAGE IN CARD FORMAT
const displayStaffInformation = (data) => {
  console.log(data);

  cardContainer.innerHTML = "";

  data.staffs.forEach((staff) => {
    const {
      emailAddress,
      firstName,
      jobTitleName,
      lastName,
      salary,
      phoneNumber,
      preferredFullName,
      region,
      staffID,
      userId,
    } = staff;

    const card = document.createElement("div");
    card.classList.add("card-staff");

    const cardTitle = document.createElement("h2");
    cardTitle.textContent = preferredFullName;

    const cardJob = document.createElement("h2");
    cardJob.textContent = jobTitleName;

    const cardFullName = document.createElement("p");
    cardFullName.textContent = `Full Name: ${firstName} ${lastName}`;

    const cardSalary = document.createElement("p");
    cardSalary.textContent = `Salary: ${salary.toLocaleString("en-US", {
      style: "currency",
      currency: "CAD",
    })}`;

    const cardEmail = document.createElement("p");
    cardEmail.textContent = `Email: ${emailAddress}`;

    const cardPhone = document.createElement("p");
    cardPhone.textContent = `Phone: ${phoneNumber}`;

    const cardRegion = document.createElement("p");
    cardRegion.textContent = `Region: ${region}`;

    const cardStaffID = document.createElement("p");
    cardStaffID.textContent = `Staff ID: ${staffID}`;

    const cardUserID = document.createElement("p");
    cardUserID.textContent = `User ID: ${userId}`;

    card.appendChild(cardTitle);
    card.appendChild(cardJob);
    card.appendChild(cardFullName);
    card.appendChild(cardSalary);
    card.appendChild(cardEmail);
    card.appendChild(cardPhone);
    card.appendChild(cardRegion);
    card.appendChild(cardStaffID);
    card.appendChild(cardUserID);

    cardContainer.appendChild(card);
  });
};

//HANDLER MASTER TO CALL THE API FUNCTION AND DISPLAY FUNCTION
const searchHandler = async (type, value) => {
  try {
    const staffData = await fetchStaffInformation(type, value);
    displayStaffInformation(staffData);
  } catch (error) {
    console.error(error);
  }
};

//CLICK EVENT LISTENER TO SEARCH BUTTON (ANONYMOUS FUNCTION). PASS THE FILTER PARAMETER TO API
searchButtonName.addEventListener("click", () => {
  const staffFirstName = document.getElementById("staff-first-name").value;
  searchHandler("name", staffFirstName);
});
searchButtonId.addEventListener("click", () => {
  const staffId = document.getElementById("staff-id").value;
  searchHandler("id", staffId);
});
searchButtonSalary.addEventListener("click", () => {
  const staffSalary = document.getElementById("staff-salary").value;
  searchHandler("salary", staffSalary);
});

//ON LOAD THE PAGE, PASS THE PARAMETER ALL TO API
window.onload = () => searchHandler("all");


// → ### STAFF MODAL ###
// Get the modal element
var modal = document.getElementById("myModal");

// Get the close button element
var closeBtn = modal.querySelector("#button-close");

// Show the modal when a button is clicked
var showModal = function () {
  modal.style.display = "flex";
};

// Hide the modal when the close button is clicked or outside the modal
var hideModal = function (event) {
  if (event.target == closeBtn) {
    modal.style.display = "none";
    // Reset form fields to their initial values
    document.querySelector("#staff-register-job-title").value = "";
    document.querySelector("#staff-register-first-name").value = "";
    document.querySelector("#staff-register-last-name").value = "";
    document.querySelector("#staff-register-preferred-fullname").value = "";
    document.querySelector("#staff-register-region").value = "";
    document.querySelector("#staff-register-phone").value = "";
    document.querySelector("#staff-register-email").value = "";
    document.querySelector("#staff-register-salary").value = "";
  }
};

// Attach event listeners to show and hide the modal
document.addEventListener("click", function (event) {
  if (event.target.matches("#button-show-modal-register")) {
    showModal();
  }
});

modal.addEventListener("click", hideModal);
closeBtn.addEventListener("click", hideModal);

// GET DOM INFORMATION FROM MODAL
document
  .querySelector("#button-register-staff")
  .addEventListener("click", function () {
    let phoneInput = document.querySelector("#staff-register-phone").value;
    let phoneValue = phoneInput.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
    let formData = {
      jobTitleName: document.querySelector("#staff-register-job-title").value,
      firstName: document.querySelector("#staff-register-first-name").value,
      lastName: document.querySelector("#staff-register-last-name").value,
      preferredFullName: document.querySelector("#staff-register-preferred-fullname").value,
      region: document.querySelector("#staff-register-region").value,
      phoneNumber: phoneValue,
      emailAddress: document.querySelector("#staff-register-email").value,
      salary: parseInt(document.querySelector("#staff-register-salary").value),
    };

    console.log('formData',formData);
    sendData(formData);
  });

const sendData = (formData) => {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:3002/api/staffs/register", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      console.log(xhr.response);
    }
  };
  xhr.send(JSON.stringify(formData));
};
