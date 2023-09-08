//#region initilization

let results = [];
let testLat = 38.25673456255137;
let testLon = 21.740706238205785;
// 38.25673456255137, 21.740706238205785  test
let userpos;
let popupContent = "";
var profileContent = "";

var popupOpen = false;
var popupContainer;

let mymap = L.map('mapid');
var markersLayer = new L.LayerGroup().addTo(mymap); 
var hiddenLayer = new L.LayerGroup(); 

//Store lists
let storesList = [];
let productsList = [];
var offersList = []; 

//User lists
// let userId = parseInt(sessionStorage.getItem("userId"));
var newUsername;
let likeDislikeHistory;
let userScore;
let userTokens;
let offersSubmitted = [];
//============== Testing ==============
let userId = 203; //comment this out when testing is done, uncomment line 24
//#endregion

//#region Icons

var redIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]}); 

var greenIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]});

var blueIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]});

var orangeIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]});

var yellowIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]});

var violetIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]});

var greyIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]});

var blackIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-black.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]});

var goldIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]});

const storeIcons = {
    "Σκλαβενίτης": redIcon,
    "Ανδρικόπουλος": greenIcon,
    "ΑΝΔΡΙΚΟΠΟΥΛΟΣ": greenIcon,
    "Lidl": violetIcon,
    "Μασούτης": orangeIcon,
    "AB ": yellowIcon,
    "Βασιλόπουλος": yellowIcon,
    "ΒΑΣΙΛΟΠΟΥΛΟΣ": yellowIcon,
    "Kiosk": blackIcon,
    "Mini Market": goldIcon,
    "ΚΡΟΝΟΣ": greyIcon,
};
//#endregion
 
let tiles = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

//#region Functions

function popupContentStores(feature,isClose, storeId) {
    popupContent = '<div class = "popup-container">';
        popupContent += "<b>";       //reset the content because its a global variable
        popupContent += '<div class = "description">';
        if (feature.properties.store_name) {
            popupContent += feature.properties.store_name + '<br>';
        } 
        popupContent += "Current offers" + '</div>';
        popupContent += '<ul class = "offers-container" >';
        offersList.forEach((offer) => {
            popupContent += '<div class = "offer-container">'+ "<li>" + 
                            offer.name + " " + '<br>'+
                            "Price: " + offer.offer_price + "&euro;" + '<br>' +
                            '<div class = date-likes-dislikes>' +
                            "Created: " + offer.creation_date.split(' ')[0] + " " + //splits the date and time and takes only the date
                            '<i class="fa-solid fa-thumbs-up ' +
                            (offer.in_stock > 0 ? 'color-green' : 'greyed-out') + '"></i> ' + offer.number_of_likes + " " + 
                            '<i class="fa-solid fa-thumbs-down ' +
                            (offer.in_stock > 0 ? 'color-red' : 'greyed-out') + '"></i> ' + offer.number_of_dislikes + " " +
                            '</div>' +
                            '<br>' + "In stock: " + offer.in_stock + '<br>' +
                            (
                                (offer.price_decrease_last_day_avg > 0 || offer.price_decrease_last_week_avg > 0)? '<i class="fa-solid fa-check">' + "</i>": '<i class="fa-solid fa-xmark">' + "</i>"
                            ) +
                            "</li>" + '</div>'; 

        });
        popupContent += "</ul>"; 
        if(isClose === true){
            popupContent += '<div class = "button-container">';
            popupContent += '<button type = "button" class = "add-offer" id = "add-offer-button" onclick = "addOffer('+storeId+')"> Add Offer </button>';
            popupContent += '<button type = "submit" class = "review-offer" onclick = "exportOffers()" > Review </button>';
            popupContent += '</div>';
        }   
        popupContent += "</b>";
        popupContent += '</div>'
        return popupContent;
}



function userStoreDistance(lat1, lon1 , lat2, lon2) {
    //using the haversine Formula
    const R = 6371.0; //Earth's radius in km
    
    //convert lat and lon to radians
    const lat1Rad = (Math.PI / 180) * lat1;
    const lon1Rad = (Math.PI / 180) * lon1; 
    const lat2Rad = (Math.PI / 180) * lat2;
    const lon2Rad = (Math.PI / 180) * lon2; 
    
    //calculate difference
    const latDifference = lat2Rad - lat1Rad;
    const lonDifference = lon2Rad - lon1Rad;
    
    //formula
    const a = Math.sin(latDifference / 2) * Math.sin(latDifference / 2) +
    Math.cos(lat1Rad) * Math.cos(lat2Rad) * 
              Math.sin(lonDifference / 2) * Math.sin(lonDifference / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    const distanceInMeters = distance * 1000;
    const roundedDistance = distance.toFixed(2);
    
    return [roundedDistance, distanceInMeters];
}

function generateProfileContent(userId) {
    const profileContainer = document.getElementById("profile-container");
    
    //user credentials  
    var profileContent = '<div class="credentials-container">' +
    '<label for="username" class="user-credentials">Type new username</label>' +
    '<input type="text" class="user-credentials" id="username" value="' + username[0].username + '">' +
    '<button type="button" onclick="checkAndUpdateUsername(userId, $(\'#username\').val())">Change username</button>' + // Use escaped single quotes
    '<label for="password" class="user-credentials">Type new password</label>' +
    '<input type="password" class="user-credentials" id="password">' +
    '<button type="submit">Change password</button>' +
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
}

// fetch products/inventory on store click
async function fetchInventory(storeId) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: 'php/fetch_inventory.php',
            data: {
                storeId: storeId
            },
            success: function (store_inventory) {
                resolve(store_inventory);
            },
            error: function (error) {
                reject(error);
            }
        });
    });
}

// get all names of categories for filter search
async function getCategories() {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: 'php/get_category_names.php',
            success: function (categories) {
                resolve(categories);
            },
            error: function (error) {
                reject(error);
            }
        });
    });
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

// fetch store offers on store click
async function fetchOffers(storeId) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: 'php/fetch_offers.php',
            data: {
                storeId: storeId
            },
            success: function (store_offers) {
                resolve(store_offers);
            },
            error: function (error) {
                reject(error);
            }
        });
});
}

// 
async function changeUsername(userId, newUsername) {
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

async function checkAndUpdateUsername(userId, newUsername)
{
    not_exists = await changeUsername(userId, newUsername);
    console.log(not_exists);
    if (not_exists==1)
    {
        console.log("username changed!");
    }
    else
    {
        console.log("username already exists");
    }
    
}

async function addOffer(storeId){
    sessionStorage.setItem("storeId", JSON.stringify(storeId));
    sessionStorage.setItem("userId", JSON.stringify(userId));
    sessionStorage.setItem("inventory", JSON.stringify(await fetchInventory(storeId)));
    window.location.href= "../addOffer/addOffer.html";
}

// navigate to review offer
function exportOffers(){
    sessionStorage.setItem("offers", JSON.stringify(offersList));
    sessionStorage.setItem("userId", JSON.stringify(userId));
    window.location.href= "../reviewOffer/review_offer.html";
}

function filterCategories(selectedCategory){
    markersLayer.eachLayer(function(layer) {
        layer.eachLayer(function(innerLayer) {
            if(!innerLayer.feature.properties.distinct_categories.includes(selectedCategory)){
                layer.removeLayer(innerLayer);
                hiddenLayer.addLayer(innerLayer);
                // console.log("removed: " + innerLayer.feature.properties.distinct_categories);
            }
            else{
                // console.log("not removed: " + innerLayer.feature.properties.distinct_categories);
            }
        });
    });

    hiddenLayer.eachLayer(function(layer) {
        if(layer.feature.properties.distinct_categories.includes(selectedCategory)){
            hiddenLayer.removeLayer(layer);
            markersLayer.eachLayer(function(markerLayer) {
                markerLayer.addLayer(layer);
            });
            // console.log("added: " + layer.feature.properties.distinct_categories);
        }
    });
    console.log("done");
}

// build map
async function initializeMap() {
    mymap.setView([testLat,testLon], 17);
    userpos = new L.marker([testLat,testLon]).addTo(mymap); 
    userpos.bindPopup("You're here!").openPopup();
    markersLayer.clearLayers();
    const storesPath = 'json/stores.geojson';
    await fetch(storesPath)
    .then(response => response.json())
    .then(data => {
    L.geoJson(data, {    //pulls data from GeoJSON file
        onEachFeature: function(feature, layer) {
            const storeName = layer.feature.properties.store_name;
            const storeId = parseInt(layer.feature.properties.store_id);
            const storeLat = parseFloat(layer.feature.geometry.coordinates[1]);
            const storeLon = parseFloat(layer.feature.geometry.coordinates[0]);
            const address = layer.feature.properties.address;
            // new
            const categories = layer.feature.properties.distinct_categories;
            const hasActiveOffers = layer.feature.properties.has_active_offers;
            var currStoreDist = userStoreDistance(testLat, testLon, storeLat, storeLon);
    
            if (storeIcons.hasOwnProperty(storeName)) {
                layer.setIcon(storeIcons[storeName]);
            } 
    
            if(address != "Unknown"){
                layer.feature.properties.searchProp = storeName + ', ' + address;
            } else {
                layer.feature.properties.searchProp = storeName + ', ' + currStoreDist[0] + ' Km';
            }
    
            if (currStoreDist[1] <= 70) {
                layer.on('click', async function () {
                    offersList = await fetchOffers(storeId);
                    layer.bindPopup(popupContentStores(feature, true, storeId));
                    sessionStorage.setItem("storeId", JSON.stringify(storeId));
                });
            } else {
                layer.on('click', async function () {
                    offersList = await fetchOffers(storeId);
                    layer.bindPopup(popupContentStores(feature, false, storeId));
                });
            }
        }
    }).addTo(markersLayer);});
    var searchBar = new L.Control.Search({
        position: 'topleft',
        layer: markersLayer,
        propertyName: 'searchProp', 
        zoom: 16,
        initial: false,  //initially hides the search bar,
        exactMatch: false,
        tipAutoSubmit: true,
        buildTip: function (text) {
            return '<a href="#" class="tip-results">' + text + '</a>' + '&nbsp' + '<br>';
        }
    }).addTo(mymap);
    // await new Promise(r => setTimeout(r, 4000));
    // filterCategories("Για κατοικίδια");
    // await new Promise(r => setTimeout(r, 2000));
    // filterCategories("Βρεφικά Είδη");

}

//#endregion


//#region user's location
//get users location
// if("geolocation" in navigator) {
//     //add prompt for user's location
//     navigator.geolocation.getCurrentPosition(  //get current position of user
//         (position) => {
//             lat = position.coords.latitude;
//             lng = position.coords.longitude;
//             initializeMap();
//         },
//         (error) => {
//             console.error("Error getting user location: ", error);
//         }
//         );
//     } else {
//         console.error("Geolocation is not supported by this browser");
//         initializeMap();
//     }
// let empty = [];
//#endregion


mymap.setView([38.2462420, 21.7350847], 16);
initializeMap();

//#region Switch tabs
// build profile
const mapButton = document.getElementById("tab1");
const mapButtonLabel = document.getElementById("map-button-label");
const profileButton = document.getElementById("tab2");
const mapContainer = document.getElementById("mapid");
const profileContainer = document.getElementById("profile-container");

// 
mapButton.addEventListener("click", function(){
    if(mapContainer.classList.contains("map-inv") && profileContainer.classList.contains("profile-container-vis")){
        mapContainer.classList.remove("map-inv");
        mapContainer.classList.add("map-vis");
        profileContainer.classList.remove("profile-container-vis");
        profileContainer.classList.add("profile-container-inv");
    }
});

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

//#endregion

