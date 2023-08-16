var offersList = [];
let listContent;
// import { exportList } from "C:/web_project/maps/maps.js";
// offersList = exportList;
async function fetchOffers(){
    try {
        const response = await fetch("json/offers.json");
        const data = await response.json();
        data.forEach((offer) => {
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
        });
        // console.log(offersList);
    } catch (error) {
        console.error("Error loading the json data");
    }
}


async function initializePage(){
    await fetchOffers();

    updateListContent();
    
    document.addEventListener('click', function(event){
        if (event.target.matches('.fa-thumbs-up')) {
            findOfferByIdAndUpdate(event.target.getAttribute('offer-id'), "up");
            console.log("thumbs up clicked");
        } else if (event.target.matches('.fa-thumbs-down')) {
            findOfferByIdAndUpdate(event.target.getAttribute('offer-id'), "down");
            // Handle thumbs down click for the offer with offerId
            console.log("thumbs down clicked");
        }
    });
}

function updateListContent(){
    listContent =  "<b>" + '<ul>'
    offersList.forEach(function(offer){
        listContent += '<div class = "list-item-container">' + '<li>' + offer.name + '<br>' + 
        "price: " + offer.offer_price + "&euro;" + '<br>' +
        '<div class = date-likes-dislikes>' +
        "Created: " + offer.creation_date.split(' ')[0] + " " + //splits the date and time and takes only the date
        '<i offer-id ="' + offer.offer_id + '" class="fa-solid fa-thumbs-up ' +
            //checks whether stock is greater than 0 and adjusts the color of the icon accordingly
            (offer.in_stock > 0 ?                                                               
            'color-green' : 'greyed-out') + '"></i> ' + offer.number_of_likes + " " + 
        //specific id for icons for each offer to add event listeners
        '<i offer-id = "' + offer.offer_id + '" class="fa-solid fa-thumbs-down ' +        
            (offer.in_stock > 0 ?
            'color-red' : 'greyed-out') + '"></i> ' + offer.number_of_dislikes + " " +
        '</div>' + 
        "<br>" + "In stock: " + offer.in_stock + "<br>" +
        (
            //checks whether the price has decreased in the last day or week and adjusts the icon accordingly
            (offer.price_decrease_last_day_avg > 0 || offer.price_decrease_last_week_avg > 0)? '<i class="fa-solid fa-check">' + "</i>": '<i class="fa-solid fa-xmark">' + "</i>"
        ) + 
        '</li>' + '</div>';
    });
    listContent += '</ul>' + "</b>";
    document.getElementById("list-container").innerHTML = listContent;
}

function findOfferByIdAndUpdate(offerId, update){
    offersList.forEach(function(offer){
        if(offer.offer_id == offerId && offer.in_stock > 0){
            if(update == "up"){
                offer.number_of_likes++;
                console.log(offer.number_of_likes);
            }                
            else if(update == "down"){
                offer.number_of_dislikes++;
                console.log(offer.number_of_dislikes);
            }
                
        }
        updateListContent();
    });
}

initializePage();