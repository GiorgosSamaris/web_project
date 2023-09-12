//#region initilization

let testLat = 38.25673456255137;
let testLon = 21.740706238205785;
// 38.25673456255137, 21.740706238205785  test
let userpos;
let popupContent = '<div class="popup-container">';

let mymap = L.map('mapid');
var markersLayer = new L.LayerGroup().addTo(mymap); 
var hiddenLayer = new L.LayerGroup(); 
var offersList = []; 
var profileContainer;
// let userId = parseInt(sessionStorage.getItem("userId"));
var userId = -1; //comment this out when testing is done, uncomment line 14
//#endregion

//#region Icons

var cashAndCarryIcon = L.icon({
    iconUrl:'images/1cAc.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]});

var arapis3A = L.icon({
    iconUrl:'images/3a.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]}
);

var ABbasilopoulos = L.icon({
    iconUrl:'images/ab.png',
    iconSize: [50, 82],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]}
);

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
    "3A": redIcon,
    "3A ARAPIS": redIcon,
    "3Α Αράπης": redIcon,
    "Carna": redIcon,
    "Ena Cash And Carry": redIcon,
    "Kiosk": greenIcon,
    "Kronos": yellowIcon,
    "Lidl": yellowIcon,
    "Markoulas": goldIcon,
    "Mini Market": goldIcon,
    "My market": blueIcon,
    "MyMarket": blueIcon,
    "No supermarket": goldIcon,
    "Papakos": goldIcon,
    "Spar": greenIcon,
    "Super Market Θεοδωρόπουλος": goldIcon,
    "Super Market ΚΡΟΝΟΣ": yellowIcon,
    "The Mart": goldIcon,
    "Unknown": greyIcon,
    "ΑΒ Shop & Go": blueIcon,
    "ΑΒ Βασιλόπουλος": blueIcon,
    "Ανδρικόπουλος": blueIcon,
    "Ανδρικόπουλος - Supermarket": blueIcon,
    "Ανδρικόπουλος Super Market": blueIcon,
    "Γαλαξίας": blueIcon,
    "ΚΡΟΝΟΣ - (Σκαγιοπουλείου)": yellowIcon,
    "Κρόνος": yellowIcon,
    "Μασούτης": redIcon,
    "Περίπτερο": greenIcon,
    "Ρουμελιώτης SUPER Market": greenIcon,
    "Σκλαβενίτης": orangeIcon,
    "Σουπερμάρκετ Ανδρικόπουλος": blueIcon,
    "Φίλιππας": goldIcon,

};
//#endregion
 
let tiles = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

//#region Functions

function popupContentStores(feature, isClose, storeId, layer) {
    let popupContent = '<div class="popup-container">';
    popupContent += "<b>"; // reset the content because it's a global variable
    popupContent += '<div class="description">';
    
    if (feature.properties.store_name) {
        popupContent += feature.properties.store_name + '<br>';
    }
    
    popupContent += "Current offers" + '</div>';
    popupContent += '<ul class="offers-container">';
    
    offersList.forEach((offer) => {
        popupContent += '<div class="offer-container"><li id = "'+offer.offer_id+'">' +
            offer.name + '<br>' +
            "Price: " + offer.offer_price + "&euro;<br>" +
            '<div class="date-likes-dislikes">' +
            "Created: " + offer.creation_date.split(' ')[0] + ' ' +
            '<i class="fa-solid fa-thumbs-up ' +
            (offer.in_stock > 0 ? 'color-green' : 'greyed-out') + '"></i> ' + offer.number_of_likes + ' ' +
            '<i class="fa-solid fa-thumbs-down ' +
            (offer.in_stock > 0 ? 'color-red' : 'greyed-out') + '"></i> ' + offer.number_of_dislikes + ' ' +
            '</div><br>' +
            "In stock: " + offer.in_stock + '<br>' +
            ((offer.price_decrease_last_day_avg > 0 || offer.price_decrease_last_week_avg > 0) ? 
             '<i class="fa-solid fa-check"></i>' : '<i class="fa-solid fa-xmark"></i>') +
            (userId < 0 ? 
             '<div id="garbage-container"><button id="garbage-btn" onclick="adminDelete(' + offer.offer_id + ')">' +
             '<i class="fa-solid fa-trash fa-xl" id="garbage" style="color: #ad0000;"></i></button></div>' : '') +
            '</li></div>';
    });
    
    popupContent += "</ul>";
    
    if (isClose === true) {
        popupContent += '<div class="button-container">';
        popupContent += '<button type="button" class="add-offer" id="add-offer-button" onclick="addOffer(' + storeId + ')"> Add Offer </button>';
        popupContent += '<button type="submit" class="review-offer" onclick="exportOffers()"> Review </button>';
        popupContent += '</div>';
    }
    
    popupContent += "</b>";
    popupContent += '</div>';
    
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

//#region fetch functions
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

// get all names of categories for filtered search
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

// get distinct names of stores in database for filtered search
async function getDistinctStores() {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: 'php/get_store_names.php',
            success: function (stores) {
                resolve(stores);
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

function fetchStores(resolve, reject) {
    return new Promise((resolve, reject) => {
        $.ajax({
        type: "POST",
        url: 'php/fetch_stores.php',
        success: function (stores) {
            resolve(stores);
        },
        error: function (error) {
            reject(error);
        }
    });
});
}

//#endregion

// navigate to add offer
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
    if(selectedCategory === ""){
        // add all hidden layers
        hiddenLayer.eachLayer(function(layer) {
            hiddenLayer.removeLayer(layer);
            markersLayer.eachLayer(function(markerLayer) {
                markerLayer.addLayer(layer);
            });
        });
    }
    else{ 
        // remove all layers that do not have the selected category
        markersLayer.eachLayer(function(layer) {
            layer.eachLayer(function(innerLayer) {
                if(!innerLayer.feature.properties.distinct_categories.includes(selectedCategory)){
                    layer.removeLayer(innerLayer);
                    hiddenLayer.addLayer(innerLayer);
                }
            });
        });
        // add all layers that have the selected category
        hiddenLayer.eachLayer(function(layer) {
            if(layer.feature.properties.distinct_categories.includes(selectedCategory)){
                hiddenLayer.removeLayer(layer);
                markersLayer.eachLayer(function(markerLayer) {
                    markerLayer.addLayer(layer);
                });
            }
        });
    }
}

// filter stores
function filterCategories(selectedStore){
    if(selectedStore === ""){
        // add all hidden layers
        hiddenLayer.eachLayer(function(layer) {
            hiddenLayer.removeLayer(layer);
            markersLayer.eachLayer(function(markerLayer) {
                markerLayer.addLayer(layer);
            });
        });
    }
    else{ 
        // remove all layers that do not have the selected store name
        markersLayer.eachLayer(function(layer) {
            layer.eachLayer(function(innerLayer) {
                if(!(innerLayer.feature.properties.store_name === selectedStore)){
                    layer.removeLayer(innerLayer);
                    hiddenLayer.addLayer(innerLayer);
                }
            });
        });
        // add all layers that have the selected store name
        hiddenLayer.eachLayer(function(layer) {
            if(layer.feature.properties.store_name === selectedStore){
                hiddenLayer.removeLayer(layer);
                markersLayer.eachLayer(function(markerLayer) {
                    markerLayer.addLayer(layer);
                });
            }
        });
    }
}

// build map
async function initializeMap() {
    mymap.setView([testLat,testLon], 17);
    userpos = new L.marker([testLat,testLon]).addTo(mymap); 
    userpos.bindPopup("You're here!").openPopup();
    markersLayer.clearLayers();
    await fetchStores();
    const storesPath = 'json/stores.geojson';
    await fetch(storesPath).then(response => response.json()).then(data => {
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
                

                // set pin icon
                if (storeIcons.hasOwnProperty(storeName) && layer.feature.properties.has_active_offers) {
                    layer.setIcon(storeIcons[storeName]);
                }
                if(!layer.feature.properties.has_active_offers ){   
                    layer.setIcon(blackIcon);  
                }
                
                // text to search for
                if(address != "Unknown"){
                    layer.feature.properties.searchProp = storeName + ', ' + address;
                } else {
                    layer.feature.properties.searchProp = storeName + ', ' + currStoreDist[0] + ' Km';
                }
                
                if (currStoreDist[1] <= 70) {
                    // build popup for close stores
                    layer.on('click', async function () {
                        offersList = await fetchOffers(storeId);
                        layer.bindPopup(popupContentStores(feature, true, storeId, layer));
                        sessionStorage.setItem("storeId", JSON.stringify(storeId));
                        layer.openPopup();
                    });
                } else {
                    // build popup for far stores
                    layer.on('click', async function () {
                        offersList = await fetchOffers(storeId);
                        layer.bindPopup(popupContentStores(feature, false, storeId, layer));
                        layer.openPopup();
                    });
                }
            }
        }).addTo(markersLayer);});
    
        // search bar for names / distance
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
    
    // category filter
    var categoryFilterBar = new L.Control.Search({
        position: 'topleft'
    }); 
    
    
    categoryFilterBar.onAdd = function() {
        let div = L.DomUtil.create('div', 'filter-container');
        div.innerHTML = '<select name="categories" id="category-search">' +
                        '<option value="All categories">All categories</option>' +
                        '</select>';
                        return div
                    }
                    categoryFilterBar.addTo(mymap);
                    // populate category filter
                    $('#category-search').empty();
                    $('#category-search').append('<option value="">All Categories</option>');
                    const categories = await getCategories();
                    categories.forEach((category) => {
                        $('#category-search').append('<option value="' + category.name + '">' + category.name + '</option>');
                    });
                    // category filter event listener
                    selectCategory = document.querySelector('#category-search');
                    selectCategory.addEventListener('change', function(event) {
        filterCategories(event.target.value);
    });
    
    
    
    // store filter
    var storeFilterBar = new L.Control.Search({
        position: 'topleft'
    }); 
    storeFilterBar.onAdd = function() {
        let div = L.DomUtil.create('div', 'filter-container');
        div.innerHTML = '<select name="stores" id="store-search">' +
        '<option value="All categories">All categories</option>' +
                        '</select>';
                        return div
        }
    // populate store filter
    storeFilterBar.addTo(mymap);
    $('#store-search').empty();
    $('#store-search').append('<option value="">All Stores</option>');
    const stores = await getDistinctStores();
    stores.forEach((store) => {
        $('#store-search').append('<option value="' + store.store_name + '">' + store.store_name + '</option>');
    });
    // store filter event listener
    selectStore = document.querySelector('#store-search');
    selectStore.addEventListener('change', function(event) {
        filterCategories(event.target.value);
    });
}

//#endregion

async function adminDelete(offer_id){
    await deleteOffer(offer_id);
    document.getElementById(offer_id).remove();
}
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
    const mapButton = document.getElementById("tab1");
    const mapButtonLabel = document.getElementById("map-button-label");
    const mapContainer = document.getElementById("mapid");
                
    mapButton.addEventListener("click", function(){
    if(mapContainer.classList.contains("map-inv") && profileContainer.classList.contains("profile-container-vis")){
        mapContainer.classList.remove("map-inv");
        mapContainer.classList.add("map-vis");
        profileContainer.classList.remove("profile-container-vis");
        profileContainer.classList.add("profile-container-inv");
    }
    });

//#endregion




