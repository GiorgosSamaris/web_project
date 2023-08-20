//#region variables
var password = document.getElementById("password");
var char = document.getElementById("characters");
var uppercase = document.getElementById("uppercase");
var symbol = document.getElementById("symbol");
var number = document.getElementById("number");
var requirements = document.getElementById("password-requirements-inv");
var register_btn = document.getElementsByClassName("register");
var container = document.getElementsByClassName("container");
//#endregion


password.onfocus = function () {
  checkRequirementsVisibility();
};

password.onblur = function () {
  // checkRequirementsVisibility();
  requirements.id = "password-requirements-inv";
};

password.onkeyup = function () {
  // Validate characters
  var char_num = /[a-z]/g;
  if (password.value.match(char_num) && password.value.length >= 8) {
    char.classList.remove("invalid");
    char.classList.add("valid");
  } else {
    char.classList.remove("valid");
    char.classList.add("invalid");
  }

  // Validate uppercase letter
  var uprcase = /[A-Z]/g;
  if (password.value.match(uprcase)) {
    uppercase.classList.remove("invalid");
    uppercase.classList.add("valid");
  } else {
    uppercase.classList.remove("valid");
    uppercase.classList.add("invalid");
  }

  // Validate numbers
  var numbers = /[0-9]/g;
  if (password.value.match(numbers)) {
    number.classList.remove("invalid");
    number.classList.add("valid");
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
  }

  var symbols = /(?=.*[^\w\d\s])/g;
  if (password.value.match(symbols)) {
    symbol.classList.remove("invalid");
    symbol.classList.add("valid");
  } else {
    symbol.classList.remove("valid");
    symbol.classList.add("invalid");
  }

  // Check if all conditions are met to hide the requirements element
  checkRequirementsVisibility();
};

function checkRequirementsVisibility(){
    if (
    char.classList.contains("valid") &&
    uppercase.classList.contains("valid") &&
    symbol.classList.contains("valid") &&
    number.classList.contains("valid") ) {
      requirements.id = "password-requirements-inv";
      // requirements.classList.remove("visible");
    } else {
      // requirements.classList.add("visible");
      requirements.id = "password-requirements-vis";
    }
}
$(document).ready(function () {
  $("#registrationForm").submit(function (event) {
    event.preventDefault();

    var registrationData = {
      username: $("#username").val(),
      password: $("#password").val(),
      email: $("#email").val(),
    };
    // console.log(registrationData);
    $.ajax({
      type: "POST",
      url: "register_customer.php",
      data: registrationData,
      success: function (response) {
        console.log(response);
        if (JSON.parse(response).status === "success") {
          $("#response").html(JSON.parse(response).message);
          window.location.href = "/maps/maps.html"; 
        } else if (JSON.parse(response).status === "fail") {
          $("#response").html(JSON.parse(response).message);
        } else {
          $("#response").html("An error occurred while processing your request.");
        }
    },
      error: function (xhr, status, error) {
        console.error("AJAX Error: " + status, error);
        $("#response").html("An error occurred while processing your request.");
        console.log(xhr.responseText); 
      },
    });
  });
});