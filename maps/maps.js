//#region initilization
let testLat = 38.25673456255137;
let testLon = 21.740706238205785;
// 38.25673456255137, 21.740706238205785  test
let index = 1;
let userpos;
let popupContent = "";
let mymap = L.map('mapid');

let storesList = [];
let productsList = [];
let categoriesList = [];
let subCategoriesList = [];
let offersList = []; 

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

//#endregion

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

var markersLayer = new L.LayerGroup();  
let tiles = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

//#region Functions

function popupContentStores(feature,isClose, offersList) {  
    popupContent = '<div class = "popup-container">';
        popupContent += "<b>";       //reset the content because its a global variable
        // console.log(feature.properties.store_name);
        //show name
        // console.log(feature.properties.store_name);
        if (feature.properties.store_name) {
            // console.log(store_name);
            popupContent += feature.properties.store_name + "<br>";
        } 
        popupContent += "Current offers: " + "<br>";
        popupContent += '<ul class = "offers-container" >';
        offersList.forEach((offer) => {
            popupContent += '<div class = "offer-container">'+ "<li>" + 
                            offer.name + " " +
                            "Price: " + offer.offer_price + "&euro;" + "<br>" +
                            '<div class = date-likes-dislikes>' +
                            "Created: " + offer.creation_date.split(' ')[0] + " " + //splits the date and time and takes only the date
                            (offer.number_of_likes > 0 ? ('<i class="fa-solid fa-thumbs-up">' + '</i>' + " " + offer.number_of_likes): + " " + '<i class="fa-solid fa-thumbs-up greyed-out">' + '</i>' + "  " ) + " " + 
                            (offer.number_of_dislikes > 0 ? ('<i class="fa-solid fa-thumbs-down">' + '</i>' + " " + offer.number_of_likes): + " " + '<i class="fa-solid fa-thumbs-down greyed-out">' + '</i>' + "  " ) +
                            '</div>' +
                            "<br>" + "In stock: " + offer.in_stock + "<br>" +
                            (
                                (offer.price_decrease_last_day_avg > 0 || offer.price_decrease_last_week_avg > 0)? '<i class="fa-solid fa-check">' + "</i>": '<i class="fa-solid fa-xmark">' + "</i>"
                            ) +
                            "</li>" + '</div>'; 

        });
        popupContent += "</ul>"; 
        popupContent += "<br>" 
        if(isClose === true){
            popupContent += '<div class = "button-container">';
            popupContent += '<button type = "submit" class = "submit-offer" > Add Offer </button>';
            popupContent += '<button type = "submit" class = "submit-offer" > Review </button>'
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

async function fetchProducts() {    //fetch api to pull data from JSON file
    try {
        const response = await fetch("products_and_categories.json");
        const data = await response.json();
        data.products.forEach((product) => {
            //creates a variable that consists of four attributes that describe a product 
            const { productId, productName, productCategory, productSubcategory } = product;  
            //adds each product to the list
            productsList.push(product);
        });
        //onEach and onEachFeature are specific to leaflet
        data.categories.forEach((category) => {
            const {categoryId, categoryName, subcategories} = category;  
            category.subcategories.forEach((subCategory) => {
                const {subCatName, subCatUuid} = subCategory;
                subCategoriesList.push(subCategory);
            })
            categoriesList.push(category);
        });
    } catch (error) {
        console.error("Error loading the JSON data:", error);
    }
}
// async function fetchOffers(storeId) {
// return new Promise((resolve, reject) => {
//     $.ajax({
//         type: "POST",
//         url: 'php/fetch_offers.php',
//         data: {
//             storeId: storeId
//         },
//         success: function (store_offers) {
//             // console.log(store_offers);   
//             resolve(store_offers);
//         },
//         error: function (error) {
//             reject(error);
//         }
//     });
// });
// }

async function fetchOffers(storeName){
    try {
        const response = await fetch("json/offers.json");
        const data = await response.json();
        offersList = [];//empty the list for the offers of the next store
        data.forEach((offer) => {
            if(offer.store_name === storeName){
                const { 
                    offer_id, 
                    store_name,
                    creation_date, 
                    expiration_date, 
                    number_of_likes, 
                    number_of_dislikes, 
                    offer_price,
                    in_stock,
                    name } = offer;

                offersList.push(offer);
            }
        });
        console.log(offersList);
        return offersList;
    } catch (error) {
        console.error("Error loading the json data");
    }
}

function containsWord(inputString, targetWord) {
    const lowercaseInput = inputString.toLowerCase(); // Convert input string to lowercase
    const lowercaseTarget = targetWord.toLowerCase(); // Convert target word to lowercase

    const words = lowercaseInput.split(/\s+/); // Split the lowercase input string into an array of words
    return words.includes(lowercaseTarget); // Check if the array of words includes the lowercase target word
}

async function initializeMap() {
    mymap.setView([testLat,testLon], 17);
    userpos = new L.marker([testLat,testLon]).addTo(mymap); 
    userpos.bindPopup("You're here!").openPopup();
    let isClose = false;    
    L.geoJson(stores_json, {    //pulls data from GeoJSON file
        onEachFeature: function(feature, layer) {
            const storeName = layer.feature.properties.store_name;
            const storeId = layer.feature.properties.store_id;
            const storeLat = layer.feature.properties.latitude;
            const storeLon = layer.feature.properties.longitude;
            const address = layer.feature.properties.address;
            var isClose = layer.feature.properties.isClose;

            var currStoreDist = userStoreDistance(testLat, testLon, storeLat, storeLon);

            if (storeIcons.hasOwnProperty(storeName)) {// checks if the store name is in the storeIcons object
                layer.setIcon(storeIcons[storeName]);   //assigns the appropriate icon to the marker
            } 
                
            if(address != "Unknown"){
            //combines two features into one for use in search if the second attribute exists
                layer.feature.properties.searchProp = storeName + ', ' + address;
            //layer here refers to the layer that contains the JSON items and feature refers to the JSON object being used
            } else {
                layer.feature.properties.searchProp = storeName + ', ' + currStoreDist[0] + ' Km';
            }
            if (currStoreDist[1] <= 70) {
                    isClose = true;
                    layer.on('click', async function () {
                    // const offers = await fetchOffers(storeName);
                    layer.bindPopup(popupContentStores(feature, true, await fetchOffers(storeName)));
                });
            } else {
                isClose = false;
                layer.on('click', async function () {
                    // const offers = await fetchOffers(storeName);
                    layer.bindPopup(popupContentStores(feature, false, await fetchOffers(storeName)));
        });
    }
        }
    }).addTo(markersLayer);     //adds the stores in the markersLayer  
            
    var searchBar = new L.Control.Search({
        position: 'topleft',
        layer: markersLayer,
        propertyName: 'searchProp', 
        zoom: 16,
        initial: false,  //initially hides the search bar,
        exactMatch: false,
        tipAutoSubmit: true,
        buildTip: function(text, val) {
            //return the names of the stores and their type
            return '<a href="#" class="tip-results">'+text + '</a>' + '&nbsp' +  '<br>';
        }
    }).addTo(mymap);
}


//#endregion

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
mymap.setView([38.2462420, 21.7350847], 16);
initializeMap();
    // if (results.)
    //     results = empty;
