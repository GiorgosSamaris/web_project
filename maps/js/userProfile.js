var profileContent = "";
var uppercase;
var char;
var numbers;
var symbols;
var requirements;
var newUsername;
let likeDislikeHistory;
let userScore;
let userTokens;
let offersSubmitted = [];
function generateProfileContent() {
    const profileContainer = document.getElementById("profile-container");
    //user credentials  
    var profileContent = '<div class="credentials-container">' +
    '<label for="username" class="user-credentials">Type new username</label>' +
    '<input type="text" class="user-credentials" id="username" value="' + username[0].username + '">' +
    '<button type="button" onclick="checkAndUpdateUsername($(\'#username\').val())">Change username</button>' + // Use escaped single quotes
    '<label for="password" class="user-credentials">Type new password</label>' +
    '<input type="password" class="user-credentials" id="password">' +
    // <i class="fa-regular fa-eye-slash fa-lg" id="eye"></i> to be added
    '<div id ="password-requirements-inv">' +
    '<h3 id="message_h3">Password must contain:</h3>' +
    '<p id="characters" class="invalid"><b>At least 8 characters</b></p>' +
    '<p id="uppercase" class="invalid"><b>At least one uppercase</b></p>'+
    '<p id="symbol" class="invalid"><b>At least one symbol</b></p>' +
    '<p id="number" class="invalid"><b>At least one number</b></p>' +
    '</div>' + '<button onclick="changeValidPassword($(\'#password\').val())">Change password</button>' +
    '</div>';
    
    //user offers history
    profileContent += '<div class = "offers-submitted-container">' + 
    '<label>Offers Submitted</label>' + '<br>' +
    '<ul class = "offers-submitted">';
    offersSubmitted.forEach((offer) => {
                profileContent += '<li>' + offer.name + '<br>' +
                "Status: " + (offer.active === 0? "Not Active" : "Active") + '<br>' +
                                   "Stock: " + offer.in_stock + '<br>' +
                                   //offers submitted likes dislikes container(osld)
                                   '<span id = "osld-container" >' + 
                                   '<i class="fa-solid fa-thumbs-up color-green"></i>' + "&nbsp" + offer.number_of_likes + "&nbsp" + 
                                   '<i class="fa-solid fa-thumbs-down color-red"></i>' + "&nbsp" + offer.number_of_dislikes + 
                                   '</span>' + '<br>' +
                                   "Price when submitted: " + offer.offer_price + "&euro;" + '<br>' +
                                   "Submitted at: " + offer.creation_date + 
                                   '</li>' ;
    });
    profileContent += '</ul>' + '</div>';
    
    //user like dislike history
    profileContent += '<div class = "like-dislike-history-container">' + 
    '<label>Like/Dislike History</label>' + '<br>' + 
    '<ul class = "like-dislike-history">';
    likeDislikeHistory.forEach((like) => {
        profileContent += '<li>' + 
        like.name + '<br>' +
        (like.rate_value === "LIKE"? "Liked" : "Disliked" ) + '<br>' + 
        "Rating date/time: " + like.creation_date +
        '</li>';
    });
    profileContent +=  '</ul>' + '</div>';
    
    //user score
    profileContent += '<div class = "user-score-container">' + '<label>Score</label>' + '<br>' +
    '<p>Current month\'s score: ' + userScore[0].current_score + '</p>' +
    '<p>Total Score: '  + userScore[0].overall_score + '</p>' +
    '</div>';
    //user tokens
    profileContent += '<div class = "user-tokens-container">' + '<label>Tokens</label>' + '<br>' +
    '<p>' + "Previous month's tokens: " + userTokens[0].last_months_tokens + '</p>' +
    '<p>' + "Tokens since registration: " + userTokens[0].overall_tokens + '</p>' +
    '</div>';

    profileContainer.innerHTML = profileContent;

    const password = document.getElementById("password");
    requirements = document.getElementById("password-requirements-inv");
    char = document.getElementById("characters");
    uppercase = document.getElementById("uppercase");
    symbol = document.getElementById("symbol");
    vnumber = document.getElementById("number");

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
        uprcase = /[A-Z]/g;
        if (password.value.match(uprcase)) {
            uppercase.classList.remove("invalid");
            uppercase.classList.add("valid");
        } else {
            uppercase.classList.remove("valid");
            uppercase.classList.add("invalid");
         }

        // Validate numbers
        numbers = /[0-9]/g;
        if (password.value.match(numbers)) {
            number.classList.remove("invalid");
            number.classList.add("valid");
        } else {
            number.classList.remove("valid");
            number.classList.add("invalid");
        }

        symbols = /(?=.*[^\w\d\s])/g;
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
}


// populate profile info
async function fetchUsername(userId) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: 'php/fetch_username.php',
            data: {
                userId: userId
            },
            success: function (username) {
                resolve(username);
            },
            error: function (error) {
                reject(error);
            }
        });
    });
}

async function fetchUserScore(userId) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: 'php/fetch_user_score.php',
            data: {
                userId: userId
            },
            success: function (username) {
                resolve(username);
            },
            error: function (error) {
                reject(error);
            }
        });
    });
}

async function fetchUserTokens(userId) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: 'php/fetch_user_tokens.php',
            data: {
                userId: userId
            },
            success: function (user_tokens) {
                resolve(user_tokens);
            },
            error: function (error) {
                reject(error);
            }
        });
    });
}

async function fetchUserLikeHistory(userId) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: 'php/fetch_user_likes_history.php',
            data: {
                userId: userId
            },
            success: function (user_likes) {
                resolve(user_likes);
            },
            error: function (error) {
                reject(error);
            }
        });
    });
}

async function fetchUserOffers(userId) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: 'php/fetch_user_offers.php',
            data: {
                userId: userId
            },
            success: function (users_offers) { 
                resolve(users_offers);
            },
            error: function (error) {
                reject(error);
            }
        });
    });
}

async function changeUsername(newUsername) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: 'php/change_username.php',
            data: {
                userId: userId,
                newUsername: newUsername
            },
            success: function (username_change) {
                resolve(username_change);
            },
            error: function (error) {
                reject(error);
            }
        });
    });
}

async function checkAndUpdateUsername(newUsername){
    result = await changeUsername(newUsername);
    if(result == 0)
    {
        alert("username changed!");
    }
    else
    {
        alert("username already exists");   
    }
}

async function changePassword(newPassword) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: 'php/change_password.php',
            data: {
                userId: userId,
                newPassword: newPassword
            },
            success: function (password_change) {
                alert("Password changed");
                resolve(password_change);
            },
            error: function (error) {
                alert("Password not changed" + error);
                reject(error);
            }
        });
    });
}

if(userId > 0){
    const profileButton = document.getElementById("tab2");
    profileContainer = document.getElementById("profile-container");
    profileButton.addEventListener("click", async function(){
        if(mapButtonLabel.classList.contains("active")){
            mapButtonLabel.classList.remove("active");
        }
        if(profileContainer.classList.contains("profile-container-inv") && mapContainer.classList.contains("map-vis")){
            profileContainer.classList.remove("profile-container-inv");
            profileContainer.classList.add("profile-container-vis");
            mapContainer.classList.remove("map-vis");
            mapContainer.classList.add("map-inv");
            username = await fetchUsername(userId);
            userScore = await fetchUserScore(userId);
            userTokens = await fetchUserTokens(userId);
            likeDislikeHistory = await fetchUserLikeHistory(userId);
            offersSubmitted = await fetchUserOffers(userId);
            generateProfileContent(); 
        } 
    });
}

function changeValidPassword(newPassword){
    if(checkRequirementsVisibility()){
        changePassword(newPassword);
    }
}

function checkRequirementsVisibility(){
    if (
        char.classList.contains("valid") &&
        uppercase.classList.contains("valid") &&
        symbol.classList.contains("valid") &&
        number.classList.contains("valid") ) {
        requirements.id = "password-requirements-inv";
        return true;
    } else {
        requirements.id = "password-requirements-vis";
        return false;
    }
}
