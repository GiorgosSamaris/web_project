var password = document.getElementById("Pswr");
var char = document.getElementById("characters");
var uppercase = document.getElementById("uppercase");
var symbol  = document.getElementById("symbol");
var number  = document.getElementById("number");
var invis = document.getElementById("message_invis");
var email_vis_btn = document.getElementById("reg");

password.onfocus = function(){
        document.getElementById("message_inv").id = "message_vis";        //when the user clicks on password field a password validation message is dispalyed
}

password.onblur = function(){
        document.getElementById("message_vis").id = "message_inv";        //when user clicks elsewhere the message disappears
}

password.onkeyup = function() {
    // Validate characters
    var char_num = /[a-z]/g;
    if(password.value.match(char_num) && password.value.length >= 8) {  
        char.classList.remove("invalid");       //if the condition is true then the class of characters is changed to valid(green)
        char.classList.add("valid");                //same for the below functions but for different elements
    } else {
        char.classList.remove("valid");
        char.classList.add("invalid");
    }

    // Validate uppercase letter
    var uprcase = /[A-Z]/g;
    if(password.value.match(uprcase)) {  
        uppercase.classList.remove("invalid");
        uppercase.classList.add("valid");
    } else {
        uppercase.classList.remove("valid");
        uppercase.classList.add("invalid");
    }

    // Validate numbers
    var numbers = /[0-9]/g;
    if(password.value.match(numbers)) {  
        number.classList.remove("invalid");
        number.classList.add("valid");
    } else {
        number.classList.remove("valid");
        number.classList.add("invalid");
    }

    var symbols = /(?=.*[^\w\d\s])/g
    if(password.value.match(symbols)){
        symbol.classList.remove("invalid");
        symbol.classList.add("valid");
    } else {
        symbol.classList.remove("valid");
        symbol.classList.add("invalid");
    }
}

email_vis_btn.onclick = function(){
    document.getElementById("email_inv").id = "email_vis";
    document.getElementById("reg_vis").id = "reg_inv";
}