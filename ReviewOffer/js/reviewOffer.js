import { exportList } from "/maps/js/exportOffers.js";

var offersList = [];
let listContent;
// offersList = exportedList;



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
}

function updateListContent(offerId){
    listContent =  "<b>" + '<ul>'
    offersList.forEach(function(offer){
        // console.log(offer.name.replace(/\//g, "_"));
        listContent += '<div class = "list-item-container">' + 
        '<li offer-id = "'+ offer.offer_id +'">' + offer.name + '<br>' + 
        "price: " + offer.offer_price + "&euro;" + '<br>' +
        '<div class = date-likes-dislikes>' +
        "Created: " + offer.creation_date.split(' ')[0] + " " + //splits the date and time and takes only the date
        '<i id = "like" offer-id ="' + offer.offer_id + '" class="fa-solid fa-thumbs-up ' +
            //checks whether stock is greater than 0 and adjusts the color of the icon accordingly
            (offer.in_stock > 0 ?                                                               
            'color-green' : 'greyed-out') + '"></i> ' + offer.number_of_likes + " " + 
        //specific attribute for icons for each offer to add event listeners
        '<i id = "dislike" offer-id = "' + offer.offer_id + '" class="fa-solid fa-thumbs-down ' +        
            (offer.in_stock > 0 ?
            'color-red' : 'greyed-out') + '"></i> ' + offer.number_of_dislikes + " " +
        '</div>' + 
        "<br>" + "In stock: " + offer.in_stock + "<br>" +
        (
            //checks whether the price has decreased in the last day or week and adjusts the icon accordingly
            (offer.price_decrease_last_day_avg > 0 || offer.price_decrease_last_week_avg > 0)? '<i class="fa-solid fa-check">' + "</i>": '<i class="fa-solid fa-xmark">' + "</i>"
        ) + 
        (offer.offer_id === offerId ? '<div class = "extended-content" >' + '<br>' +
            '<img id = "offer-image" src = "img/' + offer.name.replace(/\//g, "_") +'.jpg" , alt = "Its taking a while">' + '<br>' +
            "Submitted by: " + offer.username + '<br>' +
            "Overall score: " + offer.overall_score + '<br>' +
            '</div>' : "")
        '</li>' + '</div>';
    });
    listContent += '</ul>' + "</b>";
    document.getElementById("list-container").innerHTML = listContent;  //change the content of the list container div element
}

initializePage();

let extendedContent = false;

//#region  event listeners
document.getElementById("list-container").addEventListener('click', function(event) {   //event listener for the list container
    let offerId;

    if (event.target.matches('.list-item-container li') && extendedContent == false){   //if a list item is clicked
        offerId = event.target.getAttribute('offer-id');  //gets the offer id of the clicked offer
        updateListContent(offerId); //updates the list content with the extended content of the clicked offer
        extendedContent = true;
    } else if(extendedContent == true){
        if(event.target.matches('#like') || event.target.matches('#dislike')){
            updateListContent(offerId);    //resets the list content if the user clicks anywhere in the div element
        } else {
            extendedContent = false;
            updateListContent();
        }
    }
});

document.addEventListener('click', function(event){
    if (event.target.matches('.fa-thumbs-up')) {    //element whose class name matches the string
        findOfferByIdAndUpdate(event.target.getAttribute('offer-id'), "up");    //gets the value of the attribute offer-id
        // console.log(event.target.id);
    } else if (event.target.matches('.fa-thumbs-down')) {
        findOfferByIdAndUpdate(event.target.getAttribute('offer-id'), "down");
        // Handle thumbs down click for the offer with offerId
        // console.log(event.target.id);
    }
});


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
        if(extendedContent == true)
            updateListContent(offerId);
        else
            updateListContent();
    });
}
//#endregion