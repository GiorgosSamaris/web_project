var offersList = [];
let listContent;

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
        console.log(offersList);
    } catch (error) {
        console.error("Error loading the json data");
    }
}

async function initializePage(){
    await fetchOffers();

    listContent =  "<b>" + '<ul>'
    offersList.forEach(function(offer){
                        listContent += '<div class = "list-item-container">' + '<li>' + offer.name + '<br>' + 
                        "price: " + offer.offer_price + "&euro;" + '<br>' +
                        '<div class = date-likes-dislikes>' +
                        "Created: " + offer.creation_date.split(' ')[0] + " " + //splits the date and time and takes only the date
                        '<i class="fa-solid fa-thumbs-up ' +
                            (offer.price_decrease_last_day_avg > 0 || offer.price_decrease_last_week_avg > 0 ?
                            'color-green' : 'greyed-out') + '"></i> ' + offer.number_of_likes + " " + 
                        '<i class="fa-solid fa-thumbs-down ' +
                            (offer.price_decrease_last_day_avg > 0 || offer.price_decrease_last_week_avg > 0 ?
                            'color-red' : 'greyed-out') + '"></i> ' + offer.number_of_dislikes + " " +
                        '</div>' + 
                        "<br>" + "In stock: " + offer.in_stock + "<br>" +
                        (
                            (offer.price_decrease_last_day_avg > 0 || offer.price_decrease_last_week_avg > 0)? '<i class="fa-solid fa-check">' + "</i>": '<i class="fa-solid fa-xmark">' + "</i>"
                        ) + 
                        '</li>' + '</div>';
    });
    listContent += '</ul>' + "</b>";
    document.getElementById("list-container").innerHTML = listContent;
}


initializePage();