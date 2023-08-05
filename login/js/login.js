var password = document.getElementById("password");
var username = document.getElementById("username");


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
            success: function (response) {
            console.log(JSON.parse(response));
            console.log(response.status);
            console.log(response.message);
            console.log(response.type);
            if (JSON.parse(response).status === "success") {
                    $("#response").html(JSON.parse(response).message);
                    if(JSON.parse(response).type === "customer"){
                        window.location.href = "/maps/maps.html"; 
                    }
                    if(JSON.parse(response).type === "admin"){
                        // window.location.href = ""; s 
                    }
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