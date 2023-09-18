var password = document.getElementById("password");
var username = document.getElementById("username");
var passwordInput = document.getElementById("input-password");
var eye = document.getElementById("eye");

eye.addEventListener("click", function () {
    if (password.type === "password") {
        password.type = "text";
        eye.classList.remove("fa-eye-slash");
        eye.classList.add("fa-eye");
    } else {
        password.type = "password";
        eye.classList.remove("fa-eye");
        eye.classList.add("fa-eye-slash");
    }
});

function showLoader() {
    document.querySelector('.loader').style.display = 'block';
}
  
function hideLoader() {
    document.querySelector('.loader').style.display = 'none';
}
  


$(document).ready(function () {
    $("#loginForm").submit(function (event) {
        event.preventDefault();
        showLoader();
        var loginData = {
            username: $("#username").val(),
            password: $("#password").val(),
        };

        $.ajax({
            type: "POST",
            url: "validate_user.php",
            data: loginData,
            dataType: "json",
            success: function (response) {
                console.log(response);

                if (response.status === "success") {
                    $("#response").html(response.message);
                    if (response.type === "customer") {
                        sessionStorage.setItem("userId", response.user_id);
                        sessionStorage.setItem("isAdmin", false);
                        window.location.href = "/maps/maps.html";
                    }
                    if (response.type === "admin") {
                        sessionStorage.setItem("userId", response.user_id);
                        sessionStorage.setItem("isAdmin", true);
                        window.location.href = "/maps/maps.html";
                    }
                } else if (response.status === "fail") {
                    hideLoader();
                    $("#response").html(response.message);
                } else {
                    hideLoader();
                    $("#response").html("An error occurred while processing your request.");
                }
            },
            error: function (xhr, status, error) {
                hideLoader();
                console.error("AJAX Error:", status, error);
                $("#response").html("An error occurred while processing your request.");
                console.log(xhr.responseText);
            },
        });
    });
});