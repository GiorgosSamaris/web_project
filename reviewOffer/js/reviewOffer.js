let offerId;
let listContent;
let offersList = [];
let userId = parseInt(JSON.parse(sessionStorage.getItem("userId")));
let storeId = parseInt(JSON.parse(sessionStorage.getItem("storeId")));
//let already_rated = false;


async function initializePage(){
    offersList = await JSON.parse(sessionStorage.getItem("offers"));
    updateListContent();
}

// make a list for each offer in the store, updates each time you click it
function updateListContent(){
    listContent =  "<b>" + '<ul>'
    offersList.forEach(function(offer){
        listContent += '<div class = "list-item-container">' + 
        '<li offer-id = "'+ offer.offer_id +'">' + offer.name + '<br>' + 
        "price: " + offer.offer_price + "&euro;" + '<br>' +
        '<div class = date-likes-dislikes>' +
        "Created: " + offer.creation_date.split(' ')[0] + " " + //splits the date and time and takes only the date
        '<i id = "like" offer-id ="' + offer.offer_id + '" class="fa-solid fa-thumbs-up ' +
        //checks whether stock is greater than 0 and adjusts the color of the icon accordingly
        (offer.in_stock > 0 ? 'color-green' : 'greyed-out') + '"></i> ' + offer.number_of_likes + " " + 
        //specific attribute for icons for each offer to add event listeners
        '<i id = "dislike" offer-id = "' + offer.offer_id + '" class="fa-solid fa-thumbs-down ' +        
        (offer.in_stock > 0 ? 'color-red' : 'greyed-out') + '"></i> ' + offer.number_of_dislikes + " " +
        '</div>' + 
        '<div class = "stock-icon-container">' + "In stock: " + offer.in_stock + "&nbsp" + 
        '<i class="fa-solid fa-exclamation fa-lg" style="color: #fa0000;" title = "'+ 
        (offer.in_stock > 0 ? "Out of stock? Click here to report it!" : "In stock? Click here to report it") + '"></i>' + '</div>' +
        (
            //checks whether the price has decreased in the last day or week and adjusts the icon accordingly
            (offer.price_decrease_last_day_avg > 0 || offer.price_decrease_last_week_avg > 0)? 
            '<i class="fa-solid fa-check fa-lg color-green" title = "This offer meets the criteria for points reward">' + "</i>" : 
            '<i class="fa-solid fa-xmark fa-lg color-red" title = "This offer doesn\'t meet the criteria for points reward">' + "</i>"
        ) + 
        (offer.offer_id === offerId ? getOfferImage(offer): "")
        +'</li>' + '</div>';
    });
    listContent += '</ul>' + "</b>";
    document.getElementById("list-container").innerHTML = listContent;  //change the content of the list container div element
}

// called when you click on an offer, shows the image of the offer
function getOfferImage(offer) {
    return '<div class="extended-content">' +
    '<br>' +
    '<img id="offer-image" src="img/' + offer.name.replace(/\//g, "_") + '.jpg" onerror="this.src=\'img/Default.png\';" alt="Product image missing">' +
    '<br>' +
    '<div class="user-info">' +
    'Submitted by: ' + offer.username + '<br>' +
    'Overall score: ' + offer.overall_score + '<br>' +
    '</div>' +
    '</div>';
}
initializePage();


//#region  event listeners

// Adding a click event listener to the list container
document.getElementById("list-container").addEventListener('click', async function(event) {
    // scroll into view when you click on an offer and show the image
    if (event.target.matches('.list-item-container li')) {
        offerId = parseInt(event.target.getAttribute('offer-id'));
        event.target.scrollIntoView({
            behavior: 'smooth', 
            block: 'center'
        });
    } 
    // if you click on the like or dislike icon, update the database and the list
    else if (event.target.matches('.fa-thumbs-up') && !event.target.matches('.greyed-out')) {    //element whose class name matches the string
        await likeUpdate(parseInt(event.target.getAttribute('offer-id'))).catch((error) => {console.log(error);});
        offersList = await fetchOffers(storeId);
    } 
    else if (event.target.matches('.fa-thumbs-down') && !event.target.matches('.greyed-out')) {
        await dislikeUpdate(parseInt(event.target.getAttribute('offer-id'))).catch((error) => {console.log(error);});
        offersList = await fetchOffers(storeId);
    } else if (event.target.matches('.fa-exclamation')) {
        // console.log("offer_id: " + parseInt(event.target.parentElement.parentElement.getAttribute('offer-id')));
        await reportStock(parseInt(event.target.getAttribute('offer-id'))).catch((error) => {console.log(error);});
        offersList = await fetchOffers(storeId);
    }
    // you clicked somewhere else, so hide the image
    else {
        offerId = null;
    }
    updateListContent();
});

//fetchOffers should be called when the user has voted so as to update the rating that the user sees
async function fetchOffers(storeId) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: '../maps/php/fetch_offers.php',
            data: {
                storeId: storeId
            },
            success: function (offers) {
                resolve(offers);
            },
            error: function (error) {
                reject(error);
            }
        });
    });
}

//Update likes/dislikes of the database
async function likeUpdate(offId) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: 'php/update_like.php',
            data: {
                user_id: userId,
                offer_id: offId
            },
            success: function (success) {
                resolve(success);
            },
            error: function (error) {
                reject(error);
            }
        });
    });
}

async function dislikeUpdate(offId) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: 'php/update_dislike.php',
            data: {
                user_id: userId,
                offer_id: offId
            },
            success: function (success) {
                resolve(success);
            },
            error: function (error) {
                reject(error);
            }
        });
    });
}

async function reportStock(offId) {

}

//#endregion