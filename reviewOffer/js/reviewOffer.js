let offerId;
let listContent;
let offersList = [];


async function initializePage(){
    offersList = await JSON.parse(sessionStorage.getItem("offers"));
    console.log(offersList);
    updateListContent();
}

function updateListContent(){
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
        (offer.offer_id === offerId ? getOfferImage(offer): "")
        +'</li>' + '</div>';
    });
    listContent += '</ul>' + "</b>";
    document.getElementById("list-container").innerHTML = listContent;  //change the content of the list container div element
}

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
// rewritten
// Adding a click event listener to the list container
document.getElementById("list-container").addEventListener('click', function(event) {
    if (event.target.matches('.list-item-container li')) {
        offerId = parseInt(event.target.getAttribute('offer-id'));
        event.target.scrollIntoView({
            behavior: 'smooth', 
            block: 'center'
        });
        updateListContent();
    } 
    else if(event.target.matches('#like') || event.target.matches('#dislike')){
        updateListContent();
    } else {
        offerId = null;
        updateListContent();
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
        updateListContent();
    });
}
//#endregion