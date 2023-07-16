var password = document.getElementById("Pswr");
var char = document.getElementById("characters");
var uppercase = document.getElementById("uppercase");
var symbol  = document.getElementById("symbol");
var number  = document.getElementById("number");
var mess_inv = document.getElementById("message_inv");
var reg_btn = document.getElementById("register");
var reg_container = document.getElementById("reg_cont");
var email_btn = document.getElementById("submit");
var login_btn = document.getElementById("lgn_vis");


reg_btn.onclick = function(){
    document.getElementById("email_inv").id = "email_vis";
    reg_container.classList.remove("reg_vis");
    reg_container.classList.add("reg_inv");
    login_btn.id = "lgn_inv";

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
}

if(char.classList.contains("valid") == true && 
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