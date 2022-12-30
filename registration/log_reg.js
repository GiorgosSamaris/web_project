const password = document.getElementById("Pswr");
const char = document.getElementById("characters");
const uppercase = document.getElementById("uppercase");
const symbol  = document.getElementById("symbol");
const number  = document.getElementById("number");
const mess_inv = document.getElementById("message_inv");
const reg_btn = document.getElementById("reg");
const reg_container = document.getElementById("reg_cont");
const email_btn = document.getElementById("submit");
const username = document.getElementById("usrn");
const email = document.getElementById("email");
const eye = document.getElementById("eye");
var usrn_ok = false;
var pswr_ok = false;
var email_ok = false;

reg_btn.onclick = function(){       //when the user clicks in the register button the email input field appears
    document.getElementById("email_cont_inv").id = "email_cont_vis";
    reg_container.classList.remove("reg_vis");
    reg_container.classList.add("reg_inv");


    password.onfocus = function(){
            document.getElementById("message_inv").id = "message_vis";        //when the user clicks on password field a password validation message is dispalyed
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
}




if(char.classList.contains("valid") == true &&      //checks if every requirement is met in order to make the password message invisible
    uppercase.classList.contains("valid") == true && 
    symbol.classList.contains("valid") == true && 
    number.classList.contains("valid") == true)
    {
        document.getElementById("message_vis").id = "message_inv";
    } else {
        if(mess_inv.hasAttribute("message_inv") == true)
        {
            mess_inv.id = "message_vis";
        }
    }

function pswr_vis() {       //changes the type of input in order to make the password visible or invisible
    var x = document.getElementById("Pswr");
    if(x.type === "password") {
        x.type = "text";
        eye.innerHTML = "visibility";
    } else {
        x.type = "password";
        eye.innerHTML = "visibility_off";
    }
}

eye.addEventListener('click', pswr_vis);        //toggles password visiblity
