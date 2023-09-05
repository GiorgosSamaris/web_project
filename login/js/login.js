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

$(document).ready(function(){
    $("#loginForm").submit(function (event){
        event.preventDefault();
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
                    if(response.type === "customer"){
                        sessionStorage.setItem("userId", response.user_id);
                        window.location.href = "/maps/maps.html"; 
                    }
                    if(response.type === "admin"){
                        // window.location.href = ""; s 
                    }
              } else if (response.status === "fail") {
                    $("#response").html(response.message);
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